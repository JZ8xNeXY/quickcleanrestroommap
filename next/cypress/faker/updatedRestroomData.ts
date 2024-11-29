import { RestroomDataInterface, restroomData } from './restroomData'

interface updatedRestroomDataInterface extends RestroomDataInterface {
  updatedName: string
  updatedAddress: string
  updatedContent: string
}

export const updatedData: updatedRestroomDataInterface = {
  ...restroomData,
  updatedName: 'updated name',
  updatedAddress: 'updated address',
  updatedContent: 'updated content',
}
