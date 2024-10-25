import { MutableRefObject } from 'react'
import {
  SubmitHandler,
  UseFormRegister,
  UseFormHandleSubmit,
  Control,
} from 'react-hook-form'
import { AddRestroomFormData } from './addRestroomFormDataInterface'
import { User } from './userInterface'

export interface AddRestroomProps {
  user: User | null
  open: boolean
  onClose: () => void
  handleSubmit: UseFormHandleSubmit<AddRestroomFormData, undefined>
  onSubmit: SubmitHandler<AddRestroomFormData>
  control: Control<AddRestroomFormData>
  fileName: string
  imageData: string
  selectImageFile: () => void
  resetImageFile: () => void
  register: UseFormRegister<AddRestroomFormData>
  fileInput: MutableRefObject<HTMLInputElement | null>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  warningImageMessage: string
  confirmImageMessage: string
  isLoading: boolean
}
