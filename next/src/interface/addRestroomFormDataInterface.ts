export interface AddRestroomFormData {
  name: string
  address: string
  content: string
  latitude: number
  longitude: number
  createdAt: string
  nursing_room: boolean
  anyone_toilet: boolean
  diaper_changing_station: boolean
  powder_corner: boolean
  stroller_accessible: boolean
  evaluation: number
  image?: FileList
  userId: string
}

export interface AddRestroomProps {
  open: boolean
  onClose: () => void
}
