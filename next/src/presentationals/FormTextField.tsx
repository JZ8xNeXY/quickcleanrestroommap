import { TextField } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { AddRestroomFormData } from '@/interface/addRestroomFormDataInterface'

const FormTextField = ({
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

export default FormTextField
