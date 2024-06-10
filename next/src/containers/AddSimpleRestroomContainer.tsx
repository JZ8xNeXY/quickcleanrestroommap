import axios, { AxiosResponse, AxiosError } from 'axios'
import loadImage from 'blueimp-load-image'
import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { mutate } from 'swr'
import AddSimpleRestroom from '@/presentationals/AddSimpleRestroom'
import { chatgpt, encodeImageToBase64 } from '@/utils/chatgptAPI'

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
  evaluation: number
  image?: FileList
}

interface AddSimpleRestroomProps {
  open: boolean
  onClose: () => void
}

interface ExifTagValue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  '1'?: string
  '2'?: [number, number, number]
  '3'?: string
  '4'?: [number, number, number]
}

const AddSimpleRestroomContainer: React.FC<AddSimpleRestroomProps> = ({
  open,
  onClose,
}) => {
  const { register, handleSubmit, control, reset, setValue } =
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
        evaluation: 0,
        latitude: 35.681236,
        longitude: 139.767125,
      },
    })

  const fileInput = useRef<HTMLInputElement>(
    null,
  ) as MutableRefObject<HTMLInputElement> //更新可能
  const [fileName, setFileName] = useState('')
  const [imageData, setImageData] = useState('')
  const [imageToiletCleanness, setImageToiletCleanness] = useState<number>(0)
  const [imageLatitude, setImageLatitude] = useState('')
  const [imageLongitude, setImageLongitude] = useState('')
  const [warningImageMessage, setWarningImageMessage] = useState('')
  const [warningCoordMessage, setWarningCoordMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setValue('evaluation', imageToiletCleanness)
  }, [imageToiletCleanness, setValue])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length <= 0) return
    showImageFileName(files)
    onChangeShowExifData(e)
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

  const getExifData = (file: File) => {
    loadImage.parseMetaData(file, (data) => {
      if (data.exif) {
        const allExifData = data.exif as ExifTagValue

        const gpsData = allExifData['34853']
        if (gpsData) {
          // 正しい型の引数を渡す
          const latitude = convertDMSToDD(gpsData[2], gpsData[1])
          setImageLatitude(latitude.toString())
          // 正しい型の引数を渡す
          const longitude = convertDMSToDD(gpsData[4], gpsData[3])
          setImageLongitude(longitude.toString())
          setWarningCoordMessage('')
        } else {
          console.log('No GPS data found')
          setWarningCoordMessage('緯度経度を読み込めません')
        }
      } else {
        console.log('No EXIF data found')
        setWarningCoordMessage('緯度経度を読み込めません')
      }
    })
  }

  const convertDMSToDD = (dmsArray: number[], direction: string) => {
    const [degrees, minutes, seconds] = dmsArray
    let dd = degrees + minutes / 60 + seconds / 3600 //度分秒を十進法に変換 どうして誤差が出る

    // 小数点以下の精度を増やして誤差を減らす
    dd = parseFloat(dd.toFixed(10))

    if (direction === 'S' || direction === 'W') {
      dd *= -1
    }
    return dd
  }

  const onChangeShowExifData = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    getExifData(file)
  }

  const evaluateToiletCleanness = async (file: File) => {
    setIsLoading(true)
    const imageBase64 = await encodeImageToBase64(file)
    const result = await chatgpt(imageBase64)
    console.log(result)
    setIsLoading(false)
    if (result == 0) {
      setWarningImageMessage('トイレの画像をアップロードしてください')
    } else {
      setWarningImageMessage('')
    }
    setImageToiletCleanness(result)
  }

  const onChangeEvaluateToiletCleanness = (files: FileList) => {
    const file = files[0]
    evaluateToiletCleanness(file)
  }

  const onSubmit: SubmitHandler<AddSimpleRestroomFormData> = (data) => {
    const formData = new FormData()
    formData.append('post[name]', data.name)
    formData.append('post[address]', data.address)
    formData.append('post[content]', data.content)
    formData.append('post[latitude]', imageLatitude ? imageLatitude : '0')
    formData.append('post[longitude]', imageLongitude ? imageLongitude : '0')
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
      warningCoordMessage={warningCoordMessage}
      isLoading={isLoading}
    />
  )
}

export default AddSimpleRestroomContainer
