import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AddMarkersContainer from '@/containers/AddMarkersContainer'
import { RestroomProvider } from '@/context/RestRoomContext'
import { loadGoogleMapsAPI } from '@/utils/loadGoogleMapsAPI'

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}

const About: NextPage = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  useEffect(() => {
    loadGoogleMapsAPI(setMap)
  }, [])

  return (
    <Container maxWidth="xl" sx={{ px: 2, mt: 2 }}>
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{ fontWeight: 'bold', color: '#3f51b5', fontSize: '36px', mb: 3 }}
        >
          きれいなトイレを見つけよう
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ color: 'black', fontSize: '20px', lineHeight: 1.8, mb: 2 }}
        >
          Quick Clean Restroom Mapは、あなたの近くの清潔で
          <br />
          安全なトイレを簡単に見つけることができるアプリです。
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={{ color: 'black', fontSize: '20px', lineHeight: 1.8 }}
        >
          <br />
          外出先でのトイレ探しにもう悩む必要はありません。
          <br />
          このアプリがあれば、快適で綺麗なトイレをすぐに見つけることができます。
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" component="p">
          \ P O I N T /
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ ...cardStyle }}>
              <CardMedia>
                <Image
                  src="/point1.png"
                  alt="Point 1"
                  width={300}
                  height={300}
                />
              </CardMedia>
              <CardContent>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ textAlign: 'center', mb: 2, color: '#3f51b5' }}
                >
                  \ P O I N T 1 /
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ textAlign: 'center', color: 'black' }}
                >
                  あなたの現在位置から近い清潔なトイレをすぐに見つけることができます。
                  駅、ショッピングセンター、オフィスビルなどのトイレを紹介しています。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ ...cardStyle }}>
              <CardMedia>
                <Image
                  src="/point2.png"
                  alt="Point 2"
                  width={300}
                  height={300}
                />
              </CardMedia>
              <CardContent>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ textAlign: 'center', mb: 2, color: '#3f51b5' }}
                >
                  \ P O I N T 2 /
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ textAlign: 'center', color: 'black' }}
                >
                  ナビゲーション機能を使って、迷うことなく直接トイレまで案内します。
                  歩行者向けや公共交通機関を使ったルートのオプションも提供します。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ ...cardStyle }}>
              <CardMedia>
                <Image
                  src="/point3.png"
                  alt="Point 3"
                  width={300}
                  height={300}
                />
              </CardMedia>
              <CardContent>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ textAlign: 'center', mb: 2, color: '#3f51b5' }}
                >
                  \ P O I N T 3 /
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ textAlign: 'center', color: 'black' }}
                >
                  自分が訪れたきれいなトイレを新たに登録することができます。
                  また、自動でトイレの清潔さを評価する機能を搭載しています。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" component="p">
          \ S E A R C H /
        </Typography>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <RestroomProvider>
          <AddMarkersContainer map={map} />
        </RestroomProvider>
        <Box id="map" style={{ height: '80vh', width: '100%' }}></Box>
      </Box>
    </Container>
  )
}

export default About
