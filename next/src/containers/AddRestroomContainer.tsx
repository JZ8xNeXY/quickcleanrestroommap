import axios, { AxiosError } from 'axios'
import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { mutate } from 'swr'
import { supabase } from '../utils/supabase'
import AddRestroom from '@/presentationals/AddRestroom'
import { chatgpt, encodeImageToBase64 } from '@/utils/chatgptAPI'

interface AddRestroomFormData {
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
  evaluation: number
  image?: FileList
}

interface AddRestroomProps {
  open: boolean
  onClose: () => void
  coords: { lat: number; lng: number } | null
}

const AddRestroomContainer: React.FC<AddRestroomProps> = ({
  open,
  onClose,
  coords,
}) => {
  const { register, handleSubmit, control, reset, setValue } =
    useForm<AddRestroomFormData>({
      defaultValues: {
        name: '',
        address: '',
        content: '',
        nursing_room: false,
        anyone_toilet: false,
        diaper_changing_station: false,
        powder_corner: false,
        stroller_accessible: false,
        evaluation: 0,
      },
    })

  const fileInput = useRef<HTMLInputElement>(
    null,
  ) as MutableRefObject<HTMLInputElement> //更新可能
  const [fileName, setFileName] = useState('')
  const [imageData, setImageData] = useState('')
  const [imageToiletCleanness, setImageToiletCleanness] = useState<number>(0)
  const [warningImageMessage, setWarningImageMessage] = useState('')
  const [confirmImageMessage, setConfirmMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setValue('evaluation', imageToiletCleanness)
  }, [imageToiletCleanness, setValue])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length <= 0) return
    showImageFileName(files)
    onChangeEvaluateToiletCleanness(files)
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

  const evaluateToiletCleanness = async (file: File) => {
    setIsLoading(true)
    const imageBase64 = await encodeImageToBase64(file)
    const result = await chatgpt(imageBase64)
    setIsLoading(false)
    if (result == 0) {
      setWarningImageMessage('トイレの画像をアップロードしてください')
    } else {
      setWarningImageMessage('')
    }
    if (result >= 1) {
      setConfirmMessage('トイレの画像を確認しました')
      setTimeout(() => {
        setConfirmMessage('')
      }, 5000)
      setImageToiletCleanness(result)
    }
    setImageToiletCleanness(result)
  }

  const onChangeEvaluateToiletCleanness = (files: FileList) => {
    const file = files[0]
    evaluateToiletCleanness(file)
  }

  const onSubmit: SubmitHandler<AddRestroomFormData> = async (data) => {
    if (coords) {
      if (!fileInput.current?.files || fileInput.current.files.length === 0) {
        setWarningImageMessage('トイレの画像をアップロードしてください')
        return
      }

      const postData = {
        name: data.name,
        address: data.address,
        content: data.content,
        latitude: coords.lat,
        longitude: coords.lng,
        nursing_room: data.nursing_room ?? false,
        anyone_toilet: data.anyone_toilet ?? false,
        diaper_changing_station: data.diaper_changing_station ?? false,
        powder_corner: data.powder_corner ?? false,
        stroller_accessible: data.stroller_accessible ?? false,
        evaluation: data.evaluation,
        image_url:
          'https://quickcleanrestroommap.s3.ap-northeast-1.amazonaws.com/rv25o15gae86ctnd0vczyqgpbiay',
      }

      try {
        const { data, error } = await supabase.from('posts').insert([postData])

        if (error) {
          throw new Error(error.message)
        }

        //supabaseからの読込
        const fetchPosts = async () => {
          const { data, error } = await supabase.from('posts').select('*')
          if (error) {
            throw new Error(error.message)
          }
          return data
        }

        console.log('Data written to Supabase:')
        mutate('fetchPosts')
        resetModal()
        setImageToiletCleanness(0)
      } catch (error) {
        console.error('Request failed:', error.message)
      }
    }
  }

  return (
    <AddRestroom
      open={open}
      onClose={resetModal}
      coords={coords}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      fileName={fileName}
      imageData={imageData}
      selectImageFile={selectImageFile}
      resetImageFile={resetImageFile}
      register={{ ...rest, ref }}
      fileInput={fileInput}
      onChange={onChange} //ファイル分割用に追加
      warningImageMessage={warningImageMessage}
      confirmImageMessage={confirmImageMessage}
      isLoading={isLoading}
    />
  )
}

export default AddRestroomContainer
