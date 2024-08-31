import { Typography, Card, CardMedia, CardContent } from '@mui/material'
import Image from 'next/image'

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

const cardTitleTypographyStyle = {
  textAlign: 'center',
  mb: 2,
  color: '#3f51b5',
}

const cardContentTypographyStyle = { textAlign: 'left', color: 'black' }

interface PointCardProps {
  imageSrc: string
  title: string
  content: string
}

const PointCard: React.FC<PointCardProps> = ({ imageSrc, title, content }) => {
  return (
    <Card sx={cardStyle}>
      <CardMedia>
        <Image src={imageSrc} alt={title} width={300} height={300} />
      </CardMedia>
      <CardContent>
        <Typography variant="h6" component="p" sx={cardTitleTypographyStyle}>
          {title}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          sx={cardContentTypographyStyle}
        >
          {content}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default PointCard
