import { Box, Button } from '@mui/material'
import CalculateAndDisplayRoute from '@/components/CalculateAndDisplayRoute'
import DisplayModalWindow from '@/components/DisplayModalWindow'

interface Restroom {
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
  image: string
}

interface AddMarkersProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  openModalWindow: boolean
  closeModalWindow: () => void
  selectedRestroom: Restroom
  currentUserPos: { lat: number; lng: number } | undefined
  FindCurrentLocation: () => void
  showGeolocationButton: React.RefObject<HTMLButtonElement>
  map: google.maps.Map | null
}

const AddMarkers: React.FC<AddMarkersProps> = ({
  error,
  data,
  openModalWindow,
  closeModalWindow,
  selectedRestroom,
  currentUserPos,
  FindCurrentLocation,
  showGeolocationButton,
  map,
}) => {
  if (error) return <Box>An error has occurred.</Box>
  if (!data) return <Box>Loading...</Box>

  return (
    <>
      <DisplayModalWindow
        openModalWindow={openModalWindow}
        closeModalWindow={closeModalWindow}
        name={selectedRestroom.name}
        address={selectedRestroom.address}
        content={selectedRestroom.content}
        latitude={selectedRestroom.latitude}
        longitude={selectedRestroom.longitude}
        nursingRoom={selectedRestroom.nursingRoom}
        anyoneToilet={selectedRestroom.anyoneToilet}
        diaperChangingStation={selectedRestroom.diaperChangingStation}
        powderCorner={selectedRestroom.powderCorner}
        strollerAccessible={selectedRestroom.strollerAccessible}
        image={selectedRestroom.image}
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
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          ref={showGeolocationButton}
          onClick={FindCurrentLocation}
          sx={{
            height: '60px',
            fontSize: '16px',
            color: '#FFFFFF',
            fontWeight: 'bold',
            bgcolor: '#4CAF50',
            pt: 2,
            pb: 2,
            pl: 4,
            pr: 4,
            mt: 2,
            ':hover': {
              backgroundColor: '#006400',
            },
          }}
        >
          現在地を表示する
        </Button>
      </Box>
    </>
  )
}

export default AddMarkers
