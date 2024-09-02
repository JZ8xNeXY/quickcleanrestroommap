import { Box } from '@mui/material'
import { PostgrestError } from '@supabase/supabase-js'
import CalculateAndDisplayRoute from './CalculateAndDisplayRoute'
import DisplayModalWindowContainer from '@/containers/DisplayModalWindowContainer'
import { Restrooms } from '@/interface/restroomInterface'

interface AddMarkersProps {
  // https://github.com/supabase/postgrest-js/blob/915df5d548d6bf53aa8e21b731600dccee700113/src/lib/types.ts#L8-L13
  error: PostgrestError | null
  data: Restrooms[] | undefined
  openModalWindow: boolean
  closeModalWindow: () => void
  selectedRestroom: Restrooms
  currentUserPos:
    | { lat: number; lng: number }
    | { lat: 35.681236; lng: 139.767125 } //初期値は東京駅
  map: google.maps.Map | null
}

const AddMarkers: React.FC<AddMarkersProps> = ({
  error,
  data,
  openModalWindow,
  closeModalWindow,
  selectedRestroom,
  currentUserPos,
  map,
}) => {
  if (error) return <Box>An error has occurred.</Box>
  if (!data) return <Box>Loading...</Box>

  const selectedRestroomDetails = {
    name: selectedRestroom.name,
    address: selectedRestroom.address,
    content: selectedRestroom.content,
    latitude: selectedRestroom.latitude,
    longitude: selectedRestroom.longitude,
    nursingRoom: selectedRestroom.nursingRoom,
    anyoneToilet: selectedRestroom.anyoneToilet,
    diaperChangingStation: selectedRestroom.diaperChangingStation,
    powderCorner: selectedRestroom.powderCorner,
    strollerAccessible: selectedRestroom.strollerAccessible,
    evaluation: selectedRestroom.evaluation,
    image: selectedRestroom.image,
  }

  return (
    <>
      <DisplayModalWindowContainer
        openModalWindow={openModalWindow}
        closeModalWindow={closeModalWindow}
        {...selectedRestroomDetails}
      />
      {currentUserPos &&
        selectedRestroom.latitude !== undefined &&
        selectedRestroom.longitude !== undefined && (
          <CalculateAndDisplayRoute
            userPos={currentUserPos}
            latitude={selectedRestroom.latitude}
            longitude={selectedRestroom.longitude}
            map={map}
          />
        )}
    </>
  )
}

export default AddMarkers
