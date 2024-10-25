import loadImage from 'blueimp-load-image'
import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { mutate } from 'swr'
import { supabase } from '../utils/supabase'
import { useSessionContext } from '@/context/SessionContext'
import {
  AddRestroomFormData,
  AddRestroomProps,
} from '@/interface/addRestroomFormDataInterface'
import AddSimpleRestroom from '@/presentationals/AddSimpleRestroom'

interface ExifTagValue {
  '0'?: [number, number, number, number]
  '1'?: string
  '2'?: [number, number, number]
  '3'?: string
  '4'?: [number, number, number]
  '34853'?: {
    1: string //北緯
    2: [number, number, number] //緯度情報
    3: string //東経
    4: [number, number, number] //経度情報
  }
}

const AddSimpleRestroomContainer: React.FC<AddRestroomProps> = ({
  open,
  onClose,
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
        userId: '',
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
  const [confirmImageMessage, setConfirmMessage] = useState('')
  const [warningCoordMessage, setWarningCoordMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [imageS3Url, setImageS3Url] = useState<string | null>(null)

  const { currentUser } = useSessionContext()

  useEffect(() => {
    setValue('evaluation', imageToiletCleanness)
  }, [imageToiletCleanness, setValue])

  useEffect(() => {
    if (currentUser?.id) {
      setValue('userId', currentUser.id)
    }
  }, [currentUser?.id, setValue])

  const resetModal = () => {
    reset()
    resetImageFile()
    onClose()
  }

  const showImageFileName = (files: FileList) => {
    const file = files[0]
    setFileName(file.name)
  }

  const convertFileToBase64 = async (file: File): Promise<string> => {
    const fileReader = new FileReader()

    const imageDataToBase64: string = await new Promise((resolve, reject) => {
      fileReader.onload = () => {
        resolve(fileReader.result as string)
      }

      fileReader.onerror = (error) => reject(error)

      fileReader.readAsDataURL(file)
    })

    setImageData(imageDataToBase64)

    return imageDataToBase64.split(',')[1] // "data:image/jpeg;base64,"の部分を除去して返す
  }

  const getExifData = (file: File) => {
    loadImage.parseMetaData(file, (data) => {
      if (data.exif) {
        const allExifData = data.exif as ExifTagValue

        const gpsData = allExifData['34853']
        if (gpsData) {
          const latitude = convertDMSToDD(gpsData[2], gpsData[1])
          setImageLatitude(latitude.toString())
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

  const onChangeShowExifData = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    await getExifData(file)
  }

  //サーバーサイドで実行
  const evaluateToiletCleanness = async (imageDataToBase64: string) => {
    setIsLoading(true)

    try {
      const responseChatgptApi = await fetch('/api/chatgptApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageDataBase64: imageDataToBase64 }),
      })

      if (!responseChatgptApi.ok) {
        setIsLoading(false)
        return
      }

      const { result: cleannessRating } = await responseChatgptApi.json()

      setIsLoading(false)

      if (cleannessRating == 0) {
        setWarningImageMessage('トイレの画像をアップロードしてください')
      } else {
        setWarningImageMessage('')
      }

      if (cleannessRating >= 1) {
        setConfirmMessage('トイレの画像を確認しました')
        setTimeout(() => {
          setConfirmMessage('')
        }, 5000)

        setImageToiletCleanness(cleannessRating)
      }

      setImageToiletCleanness(cleannessRating)
      return true
    } catch (error) {
      console.error('Error:', error)
      setIsLoading(false)
      return false
    }
  }

  const onChangeEvaluateToiletCleanness = async (imageDataToBase64: string) => {
    return await evaluateToiletCleanness(imageDataToBase64)
  }

  //サーバーサイドで実行
  const uploadFileToS3 = async (file: File) => {
    const fileName = file.name
    const fileType = file.type

    try {
      const responseUploadFileToS3 = await fetch('/api/uploadToS3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName, fileType }),
      })

      if (!responseUploadFileToS3.ok) {
        console.error('Failed to get upload URL')
        return
      }

      const { uploadURL } = await responseUploadFileToS3.json()

      const upload = await fetch(uploadURL, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })

      if (upload.ok) {
        const fileUrl = uploadURL.split('?')[0]
        setImageS3Url(fileUrl)
      } else {
        console.error('File upload failed')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  const onChangeUploadFileToS3 = async (files: FileList) => {
    const file = files[0]
    await uploadFileToS3(file)
  }

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length <= 0) return

    const file = files[0]

    try {
      showImageFileName(files)

      await onChangeShowExifData(e)

      const imageBase64 = await convertFileToBase64(file)
      const isOk = await onChangeEvaluateToiletCleanness(imageBase64)

      if (isOk) {
        await onChangeUploadFileToS3(files)
      }
    } catch (error) {
      console.error('Error processing file:', error)
    }
  }

  const onSubmit: SubmitHandler<AddRestroomFormData> = async (data) => {
    if (!fileInput.current?.files || fileInput.current.files.length === 0) {
      setWarningImageMessage('トイレの画像をアップロードしてください')
      return
    }

    const postData = {
      name: data.name,
      address: data.address,
      content: data.content,
      latitude: imageLatitude,
      longitude: imageLongitude,
      nursing_room: data.nursing_room ?? false,
      anyone_toilet: data.anyone_toilet ?? false,
      diaper_changing_station: data.diaper_changing_station ?? false,
      powder_corner: data.powder_corner ?? false,
      stroller_accessible: data.stroller_accessible ?? false,
      evaluation: data.evaluation,
      image: imageS3Url,
      user_id: data.userId,
    }

    try {
      const { error } = await supabase.from('posts').insert([postData])

      if (error) {
        throw new Error(error.message)
      }

      const createPosts = async () => {
        const { data, error } = await supabase.from('posts').select('*')
        if (error) {
          throw new Error(error.message)
        }
        return data
      }

      await createPosts()
      mutate('fetchPosts')
      resetModal()
      setImageToiletCleanness(0)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Request failed:', error.message)
      } else {
        console.error('Request failed:', error)
      }
    }
  }

  const selectImageFile = () => {
    if (!fileInput.current) return
    fileInput.current.removeAttribute('capture')
    fileInput.current.click()
  }

  const resetImageFile = () => {
    setFileName('')
    setImageData('')
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  return (
    <AddSimpleRestroom
      user={currentUser}
      open={open}
      onClose={resetModal}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      fileName={fileName}
      imageData={imageData}
      selectImageFile={selectImageFile}
      resetImageFile={resetImageFile}
      register={register}
      fileInput={fileInput}
      onChange={onChange} //ファイル分割用に追加
      warningImageMessage={warningImageMessage}
      confirmImageMessage={confirmImageMessage}
      warningCoordMessage={warningCoordMessage}
      isLoading={isLoading}
    />
  )
}

export default AddSimpleRestroomContainer
