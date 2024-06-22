import axios, { AxiosError } from 'axios'
import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { mutate } from 'swr'
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

  const onSubmit: SubmitHandler<AddRestroomFormData> = (data) => {
    if (coords) {
      if (!fileInput.current?.files || fileInput.current.files.length === 0) {
        setWarningImageMessage('トイレの画像をアップロードしてください')
        return
      }

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
      formData.append('post[evaluation]', data.evaluation.toString())
      if (fileInput.current?.files && fileInput.current.files[0]) {
        formData.append('post[image]', fileInput.current.files[0])
      }

      const getUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/posts'
      const headers = { 'Content-Type': 'multipart/form-data' }

      axios
        .post(getUrl, formData, { headers })
        .then(() => {
          mutate(getUrl)
          resetModal()
          setImageToiletCleanness(0)
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
      warningImageMessage={warningImageMessage}
      confirmImageMessage={confirmImageMessage}
      isLoading={isLoading}
    />
  )
}

export default AddRestroomContainer
