import { TextField } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { AddRestroomFormData } from '@/interface/addRestroomFormDataInterface'

const Coord = ({
  name,
  control,
  label,
  coords,
  coordType,
}: {
  name: keyof AddRestroomFormData
  control: Control<AddRestroomFormData>
  label: string
  coords: {
    lat: number
    lng: number
  } | null
  coordType: 'lat' | 'lng' // 緯度か経度かを判定するプロパティ
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        type="number"
        label={label}
        sx={{ backgroundColor: 'white' }}
        value={coords ? (coordType === 'lat' ? coords.lat : coords.lng) : ''}
        InputProps={{ readOnly: true }}
        style={{ display: 'none' }}
      />
    )}
  />
)

export default Coord
