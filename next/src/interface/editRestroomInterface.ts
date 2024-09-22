import { MutableRefObject } from 'react'
import {
  SubmitHandler,
  UseFormRegister,
  UseFormHandleSubmit,
  Control,
} from 'react-hook-form'
import { AddRestroomFormData } from './addRestroomFormDataInterface'
import { Restrooms } from './restroomInterface'

interface EditRestroomFormData extends AddRestroomFormData {
  id: number
}

export interface EditRestroomProps {
  open: boolean
  onClose: () => void
  handleSubmit: UseFormHandleSubmit<EditRestroomFormData, undefined>
  onSubmit: SubmitHandler<EditRestroomFormData>
  control: Control<EditRestroomFormData>
  fileName: string
  imageData: string
  selectImageFile: () => void
  resetImageFile: () => void
  register: UseFormRegister<EditRestroomFormData>
  fileInput: MutableRefObject<HTMLInputElement | null> //更新可能
  selectedRestroom: Restrooms
  onDelete: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
}
