//個別の施設情報
export interface Restroom {
  name: string | null
  address: string | null
  content: string | null
  latitude: number | null
  longitude: number | null
  nursingRoom: boolean | null
  anyoneToilet: boolean | null
  diaperChangingStation: boolean | null
  powderCorner: boolean | null
  strollerAccessible: boolean | null
  evaluation: number | null
  image: string | null
}

//施設情報全体
export interface Restrooms extends Restroom {
  id: number
  createdAt: string | null
}
