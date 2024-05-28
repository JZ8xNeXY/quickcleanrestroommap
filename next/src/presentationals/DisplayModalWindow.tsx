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
  top: '47%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '80%',
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
}

const changeFontSize = (name: string) => {
  if (name.length >= 15) {
    return {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '0 auto',
      textAlign: 'center',
      verticalAlign: 'middle',
    }
  } else if (name.length >= 10) {
    return {
      fontSize: '26px',
      fontWeight: 'bold',
      margin: '0 auto',
      textAlign: 'center',
      verticalAlign: 'middle',
    }
  } else {
    return {
      fontSize: '28px',
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
  border: '1px solid black',
  borderRadius: '5px',
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
          <Button
            sx={{
              color: '#000000',
            }}
            onClick={closeModalWindow}
          >
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
          }}
        >
          <Typography
            sx={{
              ...changeFontSize(name),
            }}
          >
            {name}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
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
        <Box sx={{ mt: 0 }}>
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
            {nursingRoom && <Typography sx={facilityStyle}>授乳室</Typography>}
            {anyoneToilet && (
              <Typography sx={facilityStyle}>誰でもトイレ</Typography>
            )}
            {diaperChangingStation && (
              <Typography sx={facilityStyle}>オムツ交換代</Typography>
            )}
            {powderCorner && (
              <Typography sx={facilityStyle}>パウダーコーナー</Typography>
            )}
            {strollerAccessible && (
              <Typography sx={facilityStyle}>ベビーカー可</Typography>
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
