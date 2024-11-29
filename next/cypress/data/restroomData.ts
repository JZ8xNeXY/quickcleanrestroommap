export interface RestroomDataInterface {
  fileName: string
  originalName: string
  address: string
  content: string
  facilities: string[]
}

export const restroomData: RestroomDataInterface = {
  fileName: 'test.jpeg',
  originalName: 'test name',
  address: 'test address',
  content: 'test address',
  facilities: [
    'nursing_room',
    'anyone_toilet',
    'diaper_changing_station',
    'powder_corner',
    'stroller_accessible',
  ],
}
