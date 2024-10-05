import { Box, Container, Typography, Grid } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import AddMarkersContainer from '@/containers/AddMarkersContainer'
import { RestroomProvider } from '@/context/RestRoomContext'
import PointCard from '@/presentationals/PointCard'
import { loadGoogleMapsAPI } from '@/utils/loadGoogleMapsAPI'

const containerStyle = {
  textAlign: 'center',
  mt: 2,
}

const titleStyle = {
  fontWeight: 'bold',
  color: '#3f51b5',
  fontSize: { xs: '26px', md: '36px' },
  mb: { xs: 2, md: 3 },
}

const pointStyle = {
  textAlign: 'center',
  mt: 10,
}

const pointContents = [
  {
    imageSrc: '/point1.png',
    title: '\\ P O I N T 1 /',
    content:
      'あなたの現在位置から近い清潔なトイレをすぐに見つけることができます。駅、ショッピングセンター、オフィスビルなどのトイレを紹介しています。',
  },
  {
    imageSrc: '/point2.png',
    title: '\\ P O I N T 2 /',
    content:
      'ナビゲーション機能を使って、迷うことなく直接トイレまで案内します。歩行者向けや公共交通機関を使ったルートのオプションも提供します。',
  },
  {
    imageSrc: '/point3.png',
    title: '\\ P O I N T 3 /',
    content:
      '自分が訪れたきれいなトイレを新たに登録することができます。また、自動でトイレの清潔さを評価する機能を搭載しています。',
  },
]

const About: NextPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const [currentUserPos, setCurrentUserPos] = useState<{
    lat: number
    lng: number
  }>({ lat: 35.681236, lng: 139.767125 }) //初期値を東京駅に設定

  useEffect(() => {
    loadGoogleMapsAPI(setMap)
  }, [])

  return (
    <Container
      maxWidth="md"
      sx={{ px: { xs: 2, md: 4 }, mt: { xs: 2, md: 4 } }}
    >
      <Box sx={containerStyle}>
        <Typography variant="h3" component="h3" sx={titleStyle}>
          Quick Clean Restroom Map で
        </Typography>
        <Typography variant="h3" component="h3" sx={titleStyle}>
          きれいなトイレを見つけよう
        </Typography>
      </Box>

      <Box sx={pointStyle}>
        <Typography variant="h6" component="p">
          \ P O I N T /
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {pointContents.map((pointContent, index) => (
            <Grid item xs={12} md={4} key={index}>
              <PointCard
                imageSrc={pointContent.imageSrc}
                title={pointContent.title}
                content={pointContent.content}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={pointStyle}>
        <Typography variant="h6" component="p">
          \ S E A R C H /
        </Typography>
      </Box>

      <Box sx={containerStyle}>
        <RestroomProvider>
          <AddMarkersContainer
            map={map}
            currentUserPos={currentUserPos}
            setCurrentUserPos={setCurrentUserPos}
          />
        </RestroomProvider>
        <Box
          id="map"
          data-testid="map"
          sx={{ height: '80vh', width: '100%' }}
        ></Box>
      </Box>
    </Container>
  )
}

export default About
