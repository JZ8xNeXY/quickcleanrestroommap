/* eslint-disable @next/next/no-img-element */
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'

interface DisplayModalWindowProps {
  openModalWindow: boolean
  closeModalWindow: () => void
  name: string
  address: string
  content: string
  latitude: number
  longitude: number
  nursingRoom?: boolean
  anyoneToilet?: boolean
  diaperChangingStation?: boolean
  powderCorner?: boolean
  strollerAccessible?: boolean
  image: string
  openEditRestroomModalWindow: () => void
}

const modalStyle = {
  position: 'absolute' as const,
  top: '48.5%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90%',
    sm: '65%',
    md: '40%',
    lg: '30%',
    xl: '25%',
  },
  height: '80%',
  bgcolor: '#F9F9F9',
  boxShadow: 24,
  p: 3,
  overflow: 'auto',
  borderRadius: '10px',
}

const changeFontSize = (name: string) => {
  if (name.length >= 15) {
    return {
      fontSize: '18px',
      fontWeight: 'bold',
      margin: '0 auto',
      textAlign: 'center',
      verticalAlign: 'middle',
    }
  } else if (name.length >= 10) {
    return {
      fontSize: '20px',
      fontWeight: 'bold',
      margin: '0 auto',
      textAlign: 'center',
      verticalAlign: 'middle',
    }
  } else {
    return {
      fontSize: '22px',
      fontWeight: 'bold',
      margin: '0 auto',
      textAlign: 'center',
      verticalAlign: 'middle',
    }
  }
}

const facilityStyle = {
  maxWidth: '150px',
  pl: 1,
  pr: 1,
  ml: 2,
  mt: 1,
  mb: 1,
  border: '1px solid black',
  borderRadius: '5px',
  color: '#000000',
  opacity: 0.8,
}

const nursingRoomStyle = {
  ...facilityStyle,
  backgroundColor: 'rgba(255, 182, 193, 0.7)',
}

const anyoneToiletStyle = {
  ...facilityStyle,
  backgroundColor: 'rgba(173, 216, 230, 0.7)',
}

const diaperChangingStationStyle = {
  ...facilityStyle,
  backgroundColor: 'rgba(144, 238, 144, 0.7)',
}

const powderCornerStyle = {
  ...facilityStyle,
  backgroundColor: 'rgba(255, 215, 0, 0.7)',
}

const strollerAccessibleStyle = {
  ...facilityStyle,
  backgroundColor: 'rgba(255, 160, 122, 0.7)',
}

const buttonStyle = {
  height: '40px',
  color: '#FFFFFF',
  fontWeight: 'bold',
  bgcolor: '#4CAF50',
  borderRadius: '10px',
  pt: 2,
  pb: 2,
  mt: 2,
  ':hover': {
    backgroundColor: '#006400',
  },
}

const DisplayModalWindow: React.FC<DisplayModalWindowProps> = ({
  openModalWindow,
  closeModalWindow,
  name,
  address,
  content,
  nursingRoom,
  anyoneToilet,
  diaperChangingStation,
  powderCorner,
  strollerAccessible,
  image,
  openEditRestroomModalWindow,
}) => {
  return (
    <Modal
      open={openModalWindow}
      onClose={closeModalWindow}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Button sx={{ color: '#000000' }} onClick={closeModalWindow}>
            <CloseIcon />
          </Button>
        </Box>
        <Box
          sx={{
            width: '100%',
            height: 'auto',
            '& img': {
              width: '100%',
              height: 'auto',
            },
          }}
        >
          <img src={image} alt="restroom" width={200} height={200} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            bgcolor: '#F0F0F0',
            alignItems: 'center',
            borderRadius: '5px',
            p: 1,
            mt: 2,
          }}
        >
          <Typography sx={{ ...changeFontSize(name) }}>{name}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'right', mt: 0 }}>
          <Button
            sx={buttonStyle}
            onClick={() => {
              closeModalWindow()
              openEditRestroomModalWindow()
            }}
          >
            編集する
          </Button>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            住所
          </Typography>
          <Typography sx={{ ml: 2 }}>{address}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            コメント
          </Typography>
          <Typography sx={{ ml: 2 }}>{content}</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            設備情報
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {nursingRoom && (
              <Typography sx={nursingRoomStyle}>授乳室</Typography>
            )}
            {anyoneToilet && (
              <Typography sx={anyoneToiletStyle}>誰でもトイレ</Typography>
            )}
            {diaperChangingStation && (
              <Typography sx={diaperChangingStationStyle}>
                オムツ交換代
              </Typography>
            )}
            {powderCorner && (
              <Typography sx={powderCornerStyle}>パウダーコーナー</Typography>
            )}
            {strollerAccessible && (
              <Typography sx={strollerAccessibleStyle}>ベビーカー可</Typography>
            )}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
            レビュー
          </Typography>
          <Typography sx={{ ml: 2 }}>
            平均4.7 ⭐️⭐️⭐️⭐️⭐️ ( <u>3件の評価をみる</u> )
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button sx={buttonStyle} onClick={closeModalWindow}>
            評価する
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default DisplayModalWindow
