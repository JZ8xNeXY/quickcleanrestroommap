import AWS from 'aws-sdk'
import axios, { AxiosError } from 'axios'
import { useState, useRef, MutableRefObject } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import useSWR, { mutate } from 'swr'
import { supabase } from '../utils/supabase'
import { useRestroomContext } from '@/context/RestRoomContext'
import EditRestroom from '@/presentationals/EditRestroom'

interface EditRestroomFormData {
  id: number
  name: string
  address: string
  content: string
  latitude: number
  longitude: number
  createdAt: string
  nursing_room: boolean
  anyone_toilet: boolean
  diaper_changing_station: boolean
  powder_corner: boolean
  stroller_accessible: boolean
  image?: string
}

interface EditRestroomProps {
  open: boolean
  onClose: () => void
}

const EditRestroomContainer: React.FC<EditRestroomProps> = ({
  open,
  onClose,
}) => {
  const { selectedRestroom } = useRestroomContext()

  const { register, handleSubmit, control, reset } =
    useForm<EditRestroomFormData>()

  const fileInput = useRef<HTMLInputElement>(
    null,
  ) as MutableRefObject<HTMLInputElement> //更新可能

  const [fileName, setFileName] = useState('')
  const [imageData, setImageData] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null) //S3のURL

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length <= 0) return
    showImageFileName(files)
    await onChangeUploadFileToS3(files)
  }

  // ref関数 react-hook-formが管理できるようになる
  const { ref, ...rest } = register('image', { onChange })

  const selectImageFile = () => {
    if (!fileInput.current) return
    fileInput.current.removeAttribute('capture')
    fileInput.current.click()
  }

  const showImageFileName = (files: FileList) => {
    const file = files[0]
    const fileReader = new FileReader()
    setFileName(file.name)
    fileReader.onload = () => {
      setImageData(fileReader.result as string)
    }
    fileReader.readAsDataURL(file)
  }

  const resetImageFile = () => {
    setFileName('')
    setImageData('')
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const resetModal = () => {
    reset()
    resetImageFile()
    onClose()
  }

  const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION,
  })

  const uploadFileToS3 = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`
    const params = {
      Bucket: 'quickcleanrestroommap',
      Key: fileName,
      Body: file,
      ContentType: file.type,
    }

    try {
      const { Location } = await s3.upload(params).promise()
      setImageUrl(Location) // 画像URLをステートに保存
    } catch (error) {
      console.error('Error uploading file to S3:', error)
      throw new Error('Failed to upload file to S3')
    }
  }

  const onChangeUploadFileToS3 = async (files: FileList) => {
    const file = files[0]
    await uploadFileToS3(file)
  }

  const onSubmit: SubmitHandler<EditRestroomFormData> = async (data) => {
    console.log(selectedRestroom)
    if (selectedRestroom.latitude && selectedRestroom.longitude) {
      const postData = {
        ...selectedRestroom,
        name: data.name,
        address: data.address,
        content: data.content,
        latitude: selectedRestroom.latitude,
        longitude: selectedRestroom.longitude,
        nursing_room: data.nursing_room ?? false,
        anyone_toilet: data.anyone_toilet ?? false,
        diaper_changing_station: data.diaper_changing_station ?? false,
        powder_corner: data.powder_corner ?? false,
        stroller_accessible: data.stroller_accessible ?? false,
        image_url: imageUrl,
      }

      console.log(postData)

      try {
        const { error } = await supabase.from('posts').update([postData])

        if (error) {
          throw new Error(error.message)
        }

        const updatePosts = async () => {
          const { error } = await supabase
            .from('posts')
            .update(postData)
            .eq('id', data.id)

          if (error) {
            throw new Error(error.message)
          }
          return data
        }

        const posts = await updatePosts()
        mutate('updatePosts', posts, false)
        resetModal()
      } catch (error) {
        console.error('Request failed:', error.message)
      }
    }
  }

  //supabaseからの読込
  const fetchPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*')
    if (error) {
      throw new Error(error.message)
    }
    return data
  }

  const { data, error } = useSWR('fetchPosts', fetchPosts, {
    revalidateOnFocus: false,
  })

  const onDelete = async () => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', selectedRestroom.id)
    await mutate('fetchPosts')
    resetModal()
    if (error != null) throw new Error(error.message)
    return true
  }

  return (
    <EditRestroom
      open={open}
      onClose={resetModal}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      fileName={fileName}
      imageData={imageData}
      selectImageFile={selectImageFile}
      resetImageFile={resetImageFile}
      register={{ ...rest, ref }}
      fileInput={fileInput}
      selectedRestroom={selectedRestroom}
      onDelete={onDelete}
      onChange={onChange} //ファイル分割用に追加
    />
  )
}

export default EditRestroomContainer
