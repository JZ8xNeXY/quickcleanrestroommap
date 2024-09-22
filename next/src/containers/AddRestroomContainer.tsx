import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { mutate } from 'swr'
import { supabase } from '../utils/supabase'
import {
  AddRestroomFormData,
  AddRestroomProps,
} from '@/interface/addRestroomFormDataInterface'
import AddRestroom from '@/presentationals/AddRestroom'
import { chatgpt } from '@/utils/chatgptAPI'

interface AddRestroomPropsExtended extends AddRestroomProps {
  coords: { lat: number; lng: number } | null
}

const AddRestroomContainer: React.FC<AddRestroomPropsExtended> = ({
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
  const [imageS3Url, setImageS3Url] = useState<string | null>(null)

  useEffect(() => {
    setValue('evaluation', imageToiletCleanness)
  }, [imageToiletCleanness, setValue])

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

  const evaluateToiletCleanness = async (imageDataToBase64: string) => {
    setIsLoading(true)
    const result = await chatgpt(imageDataToBase64)
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
      return true
    }
    setImageToiletCleanness(result)
    return false
  }

  const onChangeEvaluateToiletCleanness = async (imageDataToBase64: string) => {
    return await evaluateToiletCleanness(imageDataToBase64)
  }

  //サーバーサイドで環境変数を読み込む
  const uploadFileToS3 = async (file: File) => {
    const fileName = file.name
    const fileType = file.type

    const res = await fetch(
      `/api/uploadToS3?fileName=${encodeURIComponent(fileName)}&fileType=${encodeURIComponent(fileType)}`,
    )

    if (!res.ok) {
      console.error('Failed to get upload URL')
      return
    }
    const { uploadURL } = await res.json()

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
  }

  const onChangeUploadFileToS3 = async (files: FileList) => {
    const file = files[0]
    await uploadFileToS3(file)
  }

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length <= 0) return

    const file = files[0]

    showImageFileName(files)

    const imageBase64 = await convertFileToBase64(file)
    const isOk = await onChangeEvaluateToiletCleanness(imageBase64)
    if (isOk) {
      await onChangeUploadFileToS3(files)
    }
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
        image: imageS3Url,
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

        mutate('fetchPosts') //アップロード後に画面を更新
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
      register={register}
      fileInput={fileInput}
      onChange={onChange} //ファイル分割用に追加
      warningImageMessage={warningImageMessage}
      confirmImageMessage={confirmImageMessage}
      isLoading={isLoading}
    />
  )
}

export default AddRestroomContainer
