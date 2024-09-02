import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, Modal, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import ReactStarsRating from 'react-awesome-stars-rating'
import { Restroom } from '@/interface/restroomInterface'
import { User } from '@/interface/userInterface'
import buttonStyle from '@/styles/buttonStyle'
import changeFontSize from '@/styles/changeFontSize'
import {
  nursingRoomStyle,
  anyoneToiletStyle,
  diaperChangingStationStyle,
  powderCornerStyle,
  strollerAccessibleStyle,
} from '@/styles/facilityStyles'
import {
  modalStyle,
  closeButtonStyle,
  imageBoxStyle,
  facilityNameStyle,
  modalContentTitle,
} from '@/styles/modalStyles'

interface DisplayModalWindowProps extends Restroom {
  user: User
  openModalWindow: boolean
  closeModalWindow: () => void
  openEditRestroomModalWindow: () => void
}

const DisplayModalWindow: React.FC<DisplayModalWindowProps> = ({
  user,
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
  evaluation,
  image,
  openEditRestroomModalWindow,
}) => {
  return (
    <Modal
      open={openModalWindow}
      onClose={closeModalWindow}
      aria-labelledby="modal-title" //アクセシビリティ対応
      aria-describedby="modal-description" //アクセシビリティ対応
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Button sx={closeButtonStyle} onClick={closeModalWindow}>
            <CloseIcon />
          </Button>
        </Box>
        <Box sx={imageBoxStyle}>
          <Image src={image} alt="restroom" width={200} height={200} />
        </Box>
        <Box sx={facilityNameStyle}>
          <Typography sx={{ ...changeFontSize(name) }}>
            {name ? name : 'ー'}
          </Typography>
        </Box>
        {user && (
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
        )}
        <Box sx={{ mt: 1 }}>
          <Typography variant="h6" sx={modalContentTitle}>
            住所
          </Typography>
          <Typography sx={{ ml: 2 }}>{address ? address : 'ー'}</Typography>
          <Typography variant="h6" sx={modalContentTitle}>
            コメント
          </Typography>
          <Typography sx={{ ml: 2 }}>{content ? content : 'ー'}</Typography>
          <Typography variant="h6" sx={modalContentTitle}>
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
            {nursingRoom ? (
              <Typography sx={nursingRoomStyle}>授乳室</Typography>
            ) : null}
            {anyoneToilet ? (
              <Typography sx={anyoneToiletStyle}>誰でもトイレ</Typography>
            ) : null}
            {diaperChangingStation ? (
              <Typography sx={diaperChangingStationStyle}>
                オムツ交換台
              </Typography>
            ) : null}
            {powderCorner ? (
              <Typography sx={powderCornerStyle}>パウダーコーナー</Typography>
            ) : null}
            {strollerAccessible ? (
              <Typography sx={strollerAccessibleStyle}>ベビーカー可</Typography>
            ) : null}
            {!nursingRoom &&
              !anyoneToilet &&
              !diaperChangingStation &&
              !powderCorner &&
              !strollerAccessible && <Typography sx={{ ml: 2 }}>ー</Typography>}
          </Box>
          <Typography variant="h6" sx={modalContentTitle}>
            清潔度
          </Typography>
          <Box sx={{ ml: 2 }}>
            <ReactStarsRating isEdit={false} value={evaluation} />
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            href="https://docs.google.com/forms/d/e/1FAIpQLSekveKygTBRldu2AcRV97sUq5RXS7K4qq_k0DLKuT_Skcv48g/viewform"
            target="_blank"
            sx={{ color: 'white', textTransform: 'none' }}
          >
            お問い合わせはこちら ＞
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default DisplayModalWindow
