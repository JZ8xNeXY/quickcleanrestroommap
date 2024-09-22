import { TextField } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { AddRestroomFormData } from '@/interface/addRestroomFormDataInterface'

interface EditRestroomFormData extends AddRestroomFormData {
  id: number
}

export const AddFormTextField = ({
  name,
  control,
  label,
}: {
  name: keyof AddRestroomFormData
  control: Control<AddRestroomFormData>
  label: string
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="text"
        label={label}
        sx={{ backgroundColor: 'white' }}
      />
    )}
  />
)

export const EditFormTextField = ({
  name,
  control,
  defaultValue,
  label,
}: {
  name: keyof EditRestroomFormData
  control: Control<EditRestroomFormData>
  defaultValue: string
  label: string
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="text"
        defaultValue={defaultValue}
        label={label}
        sx={{ backgroundColor: 'white' }}
      />
    )}
  />
)
