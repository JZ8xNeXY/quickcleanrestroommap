import { Grid, FormControlLabel, Checkbox } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { AddRestroomFormData } from '@/interface/addRestroomFormDataInterface'

const FacilityCheckBox = ({
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

export default FacilityCheckBox
