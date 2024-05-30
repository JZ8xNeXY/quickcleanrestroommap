import { Box, Container } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
// import AddRestroom from '@/components/AddRestroom'
import AddMarkersContainer from '@/containers/AddMarkersContainer'
import AddRestroomContainer from '@/containers/AddRestroomContainer'
import { RestroomProvider } from '@/context/RestRoomContext'
import { RightClickMapHandler } from '@/utils/RightClickMapHandler'
import { loadGoogleMapsAPI } from '@/utils/loadGoogleMapsAPI'

const Index: NextPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const [openAddRestroomModal, setOpenAddRestroomModal] = useState(false)
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  )

  useEffect(() => {
    loadGoogleMapsAPI(setMap)
  }, [])

  useEffect(() => {
    if (map) {
      RightClickMapHandler({ map, setMap, setOpenAddRestroomModal, setCoords })
    }
  }, [map])

  return (
    <>
      <Container maxWidth="xl">
        <RestroomProvider>
          <AddMarkersContainer map={map} />
          {/* <AddRestroom */}
          <AddRestroomContainer
            open={openAddRestroomModal}
            onClose={() => setOpenAddRestroomModal(false)}
            coords={coords}
          />
        </RestroomProvider>
        <Box id="map" style={{ height: '80vh', width: '100%' }}></Box>
        <Box id="infoPanel"></Box>
      </Container>
    </>
  )
}

export default Index
