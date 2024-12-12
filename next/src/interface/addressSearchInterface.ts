import { SubmitHandler, UseFormHandleSubmit, Control } from 'react-hook-form'
import { AddressSearchFormData } from './addressSearchFormDataInterface'
import { User } from './userInterface'

export interface AddressSearchProps {
  user: User | null
  open: boolean
  onClose: () => void
  handleSubmit: UseFormHandleSubmit<AddressSearchFormData, undefined>
  onSubmit: SubmitHandler<AddressSearchFormData>
  control: Control<AddressSearchFormData>
  warningAddressSearchMessage: string
}
