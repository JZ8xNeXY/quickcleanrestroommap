import axios, { AxiosResponse, AxiosError } from 'axios'
import { useState, useRef, MutableRefObject } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { mutate } from 'swr'
import AddSimpleRestroom from '@/presentationals/AddSimpleRestroom'

interface AddSimpleRestroomFormData {
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

interface AddSimpleRestroomProps {
  open: boolean
  onClose: () => void
}

const AddSimpleRestroomContainer: React.FC<AddSimpleRestroomProps> = ({
  open,
  onClose,
}) => {
  const { register, handleSubmit, control, reset } =
    useForm<AddSimpleRestroomFormData>({
      defaultValues: {
        name: '',
        address: '',
        content: '',
        nursing_room: false,
        anyone_toilet: false,
        diaper_changing_station: false,
        powder_corner: false,
        stroller_accessible: false,
        latitude: 35.681236,
        longitude: 139.767125,
      },
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

  const onSubmit: SubmitHandler<AddSimpleRestroomFormData> = (data) => {
    const formData = new FormData()
    formData.append('post[name]', data.name)
    formData.append('post[address]', data.address)
    formData.append('post[content]', data.content)
    formData.append('post[latitude]', data.latitude.toString())
    formData.append('post[longitude]', data.longitude.toString())
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

  return (
    <AddSimpleRestroom
      open={open}
      onClose={resetModal}
      // coords={coords}
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

export default AddSimpleRestroomContainer
