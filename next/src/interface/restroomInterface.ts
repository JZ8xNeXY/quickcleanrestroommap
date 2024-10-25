//個別の施設情報
export interface Restroom {
  name: string
  address: string
  content: string
  latitude: number
  longitude: number
  nursingRoom: boolean
  anyoneToilet: boolean
  diaperChangingStation: boolean
  powderCorner: boolean
  strollerAccessible: boolean
  evaluation: number
  image: string
  userId: string
}

//施設情報全体
export interface Restrooms extends Restroom {
  id: number
  createdAt: string
}
