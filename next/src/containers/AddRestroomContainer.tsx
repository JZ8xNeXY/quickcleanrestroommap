import axios, { AxiosResponse, AxiosError } from 'axios'
import { useState, useRef, MutableRefObject } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { mutate } from 'swr'
import AddRestroom from '@/presentationals/AddRestroom'

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
  const { register, handleSubmit, control, reset } =
    useForm<AddRestroomFormData>({
      defaultValues: { name: '', address: '', content: '' },
    })

  const fileInput = useRef<HTMLInputElement>(
    null,
  ) as MutableRefObject<HTMLInputElement> //更新可能
  const [fileName, setFileName] = useState('')
  const [imageData, setImageData] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length <= 0) return
    showImageFileName(files)
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

  const onSubmit: SubmitHandler<AddRestroomFormData> = (data) => {
    if (coords) {
      const formData = new FormData()
      formData.append('post[name]', data.name)
      formData.append('post[address]', data.address)
      formData.append('post[content]', data.content)
      formData.append('post[latitude]', coords.lat.toString())
      formData.append('post[longitude]', coords.lng.toString())
      formData.append(
        'post[nursing_room]',
        (data.nursing_room ?? false).toString(),
      )
      formData.append(
        'post[anyone_toilet]',
        (data.anyone_toilet ?? false).toString(),
      )
      formData.append(
        'post[diaper_changing_station]',
        (data.diaper_changing_station ?? false).toString(),
      )
      formData.append(
        'post[powder_corner]',
        (data.powder_corner ?? false).toString(),
      )
      formData.append(
        'post[stroller_accessible]',
        (data.stroller_accessible ?? false).toString(),
      )
      if (fileInput.current?.files && fileInput.current.files[0]) {
        formData.append('post[image]', fileInput.current.files[0])
      }

      const getUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/posts'
      const headers = { 'Content-Type': 'multipart/form-data' }

      axios
        .post(getUrl, formData, { headers })
        .then((res: AxiosResponse) => {
          console.log('Data submitted successfully', res.data)
          mutate(getUrl)
          resetModal()
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.error(`Request failed with status code ${e.response?.status}`)
          console.error(e.message)
        })
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
    />
  )
}

export default AddRestroomContainer
