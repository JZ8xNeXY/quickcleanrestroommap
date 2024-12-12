import { Box, Container } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import AddMarkersContainer from '@/containers/AddMarkersContainer'
import AddRestroomContainer from '@/containers/AddRestroomContainer'
import { RestroomProvider, useRestroomContext } from '@/context/RestRoomContext'
import { SessionProvider, useSessionContext } from '@/context/SessionContext'
import { RightClickMapHandler } from '@/utils/RightClickMapHandler'
import { loadGoogleMapsAPI } from '@/utils/loadGoogleMapsAPI'
import { userGeoLocation } from '@/utils/userGeoLocation'

// SessionProviderの内部で使用するサブコンポーネント
const IndexContent: React.FC = () => {
  //const [map, setMap] = useState<google.maps.Map | null>(null)
  const [openAddRestroomModal, setOpenAddRestroomModal] = useState(false)
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  )
  const [currentUserPos, setCurrentUserPos] = useState<{
    lat: number
    lng: number
  }>({
    lat: 35.681236,
    lng: 139.767125, // 初期値を東京駅に設定
  })
  const { map, setMap } = useRestroomContext()
  const { currentUser } = useSessionContext()
  const router = useRouter()

  useEffect(() => {
    loadGoogleMapsAPI(setMap)
  }, [setMap])

  useEffect(() => {
    if (map) {
      RightClickMapHandler({
        map,
        setMap,
        setOpenAddRestroomModal,
        setCoords,
      })
      userGeoLocation({ map, setCurrentUserPos })
    }
  }, [map, setMap, router])

  useEffect(() => {
    if (!currentUser && openAddRestroomModal) {
      router.push('/sign_in')
    }
  }, [currentUser, openAddRestroomModal, router])

  return (
    <Container maxWidth="xl">
      <RestroomProvider>
        <AddMarkersContainer
          map={map}
          currentUserPos={currentUserPos}
          setCurrentUserPos={setCurrentUserPos}
        />
        {currentUser && (
          <AddRestroomContainer
            open={openAddRestroomModal}
            onClose={() => setOpenAddRestroomModal(false)}
            coords={coords}
          />
        )}
      </RestroomProvider>
      <Box
        id="map"
        data-testid="map"
        sx={{ height: '80vh', width: '100%' }}
      ></Box>
      <Box id="infoPanel"></Box>
    </Container>
  )
}

// SessionProviderを最上位に配置してIndexContentで囲う
const Index: NextPage = () => (
  <SessionProvider>
    <IndexContent />
  </SessionProvider>
)

export default Index
