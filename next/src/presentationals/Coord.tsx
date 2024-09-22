import { TextField } from '@mui/material'
import { Controller, Control } from 'react-hook-form'
import { AddRestroomFormData } from '@/interface/addRestroomFormDataInterface'

interface EditRestroomFormData extends AddRestroomFormData {
  id: number
}

export const AddCoord = ({
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

export const EditCoord = ({
  name,
  control,
  label,
  coordValue, // 緯度または経度の値を直接渡す
}: {
  name: keyof EditRestroomFormData
  control: Control<EditRestroomFormData>
  label: string
  coordValue: string | number | null // 緯度か経度の値を直接受け取る
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
        value={coordValue !== null ? coordValue : ''}
        InputProps={{ readOnly: true }}
        style={{ display: 'none' }}
      />
    )}
  />
)
