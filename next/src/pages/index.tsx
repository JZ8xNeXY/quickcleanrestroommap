import { Box, Container } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import AddMarkers from '@/components/AddMarkers'
import { loadGoogleMapsAPI } from '@/utils/loadGoogleMapsAPI'

const Index: NextPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  useEffect(() => {
    loadGoogleMapsAPI(setMap)
  }, [])

  return (
    <>
      <Container maxWidth="xl">
        <AddMarkers map={map} />
        <Box id="map" style={{ height: '80vh', width: '100%' }}></Box>
        <Box id="infoPanel"></Box>
      </Container>
    </>
  )
}

export default Index
