import axios, { AxiosResponse, AxiosError } from 'axios'
import { useState, useRef, MutableRefObject } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { mutate } from 'swr'
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

  const onSubmit: SubmitHandler<EditRestroomFormData> = (data) => {
    if (selectedRestroom.latitude && selectedRestroom.longitude) {
      const formData = new FormData()
      formData.append('post[name]', data.name || selectedRestroom.name)
      formData.append('post[address]', data.address || selectedRestroom.address)
      formData.append('post[content]', data.content || selectedRestroom.content)
      formData.append('post[latitude]', selectedRestroom.latitude.toString())
      formData.append('post[longitude]', selectedRestroom.longitude.toString())
      formData.append(
        'post[nursing_room]',
        (data.nursing_room || selectedRestroom.nursingRoom).toString(),
      )
      formData.append(
        'post[anyone_toilet]',
        (data.anyone_toilet || selectedRestroom.anyoneToilet).toString(),
      )
      formData.append(
        'post[diaper_changing_station]',
        (
          data.diaper_changing_station || selectedRestroom.diaperChangingStation
        ).toString(),
      )
      formData.append(
        'post[powder_corner]',
        (data.powder_corner || selectedRestroom.powderCorner).toString(),
      )
      formData.append(
        'post[stroller_accessible]',
        (
          data.stroller_accessible || selectedRestroom.strollerAccessible
        ).toString(),
      )
      if (fileInput.current?.files && fileInput.current.files[0]) {
        formData.append('post[image]', fileInput.current.files[0])
      }

      const editUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL + '/posts/' + selectedRestroom.id
      const headers = { 'Content-Type': 'multipart/form-data' }

      const getUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/posts'

      axios
        .put(editUrl, formData, { headers })
        .then((res: AxiosResponse) => {
          console.log('Data Edited successfully', res.data)
          mutate(getUrl)
          resetModal()
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.error(`Request failed with status code ${e.response?.status}`)
          console.error(e.message)
        })
    }
  }

  const onDelete = () => {
    const deleteUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL + '/posts/' + selectedRestroom.id
    const headers = { 'Content-Type': 'application/json' }

    const getUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/posts'

    axios
      .delete(deleteUrl, { headers })
      .then((res: AxiosResponse) => {
        console.log('Data deleted successfully', res.data)
        mutate(getUrl)
        resetModal()
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.error(`Request failed with status code ${e.response?.status}`)
        console.error(e.message)
      })
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
