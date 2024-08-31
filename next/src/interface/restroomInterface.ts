export interface Restroom {
  id: number
  name: string
  address: string
  content: string
  latitude: number
  longitude: number
  createdAt: string
  nursingRoom: boolean
  anyoneToilet: boolean
  diaperChangingStation: boolean
  powderCorner: boolean
  strollerAccessible: boolean
  evaluation: number
  image: string
}
