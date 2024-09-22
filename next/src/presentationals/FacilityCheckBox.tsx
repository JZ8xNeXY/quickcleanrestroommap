import { Grid, FormControlLabel, Checkbox } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { AddRestroomFormData } from '@/interface/addRestroomFormDataInterface'

interface EditRestroomFormData extends AddRestroomFormData {
  id: number
}

export const AddFacilityCheckBox = ({
  name,
  control,
  label,
}: {
  name: keyof AddRestroomFormData
  control: Control<AddRestroomFormData>
  label: string
}) => (
  <Grid item xs={10}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={<Checkbox {...field} checked={!!field.value} />}
          sx={{ padding: '1px', marginBottom: '1px' }}
        />
      )}
    />
  </Grid>
)

export const EditFacilityCheckBox = ({
  name,
  control,
  defaultChecked,
  label,
}: {
  name: keyof EditRestroomFormData
  control: Control<EditRestroomFormData>
  defaultChecked: boolean
  label: string
}) => (
  <Grid item xs={10}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label={label}
          control={<Checkbox {...field} defaultChecked={defaultChecked} />}
          sx={{ padding: '1px', marginBottom: '1px' }}
        />
      )}
    />
  </Grid>
)
