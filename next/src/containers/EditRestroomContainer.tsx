import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { mutate } from 'swr'
import { useRestroomContext } from '@/context/RestRoomContext'
import { useSessionContext } from '@/context/SessionContext'
import {
  AddRestroomFormData,
  AddRestroomProps,
} from '@/interface/addRestroomFormDataInterface'
import EditRestroom from '@/presentationals/EditRestroom'

interface EditRestroomFormData extends AddRestroomFormData {
  id: number
}

const EditRestroomContainer: React.FC<AddRestroomProps> = ({
  open,
  onClose,
}) => {
  const { selectedRestroom } = useRestroomContext()

  const { register, handleSubmit, control, reset, setValue } =
    useForm<EditRestroomFormData>()

  const fileInput = useRef<HTMLInputElement>(
    null,
  ) as MutableRefObject<HTMLInputElement> //更新可能

  const [fileName, setFileName] = useState('')
  const [imageData, setImageData] = useState('')
  const [imageS3Url, setImageS3Url] = useState<string | null>(null)

  const { currentUser } = useSessionContext()

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

    const fileReader = new FileReader()
    fileReader.onload = () => {
      setImageData(fileReader.result as string)
    }
    fileReader.readAsDataURL(file)
  }

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
    showImageFileName(files)
    await onChangeUploadFileToS3(files)
  }

  const onSubmit: SubmitHandler<EditRestroomFormData> = async (data) => {
    if (selectedRestroom.latitude && selectedRestroom.longitude) {
      const postData = {
        id: selectedRestroom.id,
        name: data.name || selectedRestroom.name,
        address: data.address || selectedRestroom.address,
        content: data.content || selectedRestroom.content,
        latitude: selectedRestroom.latitude,
        longitude: selectedRestroom.longitude,
        nursing_room: data.nursing_room ?? selectedRestroom.nursingRoom,
        anyone_toilet: data.anyone_toilet ?? selectedRestroom.anyoneToilet,
        diaper_changing_station:
          data.diaper_changing_station ??
          selectedRestroom.diaperChangingStation,
        powder_corner: data.powder_corner ?? selectedRestroom.powderCorner,
        stroller_accessible:
          data.stroller_accessible ?? selectedRestroom.strollerAccessible,
        image: imageS3Url || selectedRestroom.image,
        user_id: currentUser?.id,
      }

      try {
        await fetch('/api/editPost', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        })

        await mutate('fetchPosts')
        resetModal()
      } catch (error) {
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

  const onDelete = async () => {
    try {
      const response = await fetch('/api/deletePost', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedRestroom.id }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }

      await mutate('fetchPosts')
      resetModal()
      return true
    } catch (error) {
      console.error('Failed to delete post:', error)
      return false
    }
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
      register={register}
      fileInput={fileInput}
      selectedRestroom={selectedRestroom}
      onDelete={onDelete}
      onChange={onChange} //ファイル分割用に追加
    />
  )
}

export default EditRestroomContainer
