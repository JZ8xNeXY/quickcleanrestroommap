import { SubmitHandler, UseFormHandleSubmit, Control } from 'react-hook-form'
import { AddressSearchFormData } from './addressSearchFormDataInterface'

export interface AddressSearchProps {
  open: boolean
  onClose: () => void
  handleSubmit: UseFormHandleSubmit<AddressSearchFormData, undefined>
  onSubmit: SubmitHandler<AddressSearchFormData>
  control: Control<AddressSearchFormData>
  warningAddressSearchMessage: string
}
