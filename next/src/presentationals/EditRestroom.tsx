import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  Modal,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { EditFacilityCheckBox } from './FacilityCheckBox'
import { EditFormTextField } from './FormTextField'
import { EditRestroomProps } from '@/interface/editRestroomInterface'
import { modalStyle } from '@/styles/modalStyles'

const EditRestroom: React.FC<EditRestroomProps> = ({
  open,
  onClose,
  handleSubmit,
  onSubmit,
  control,
  fileName,
  imageData,
  selectImageFile,
  resetImageFile,
  register,
  fileInput,
  selectedRestroom,
  onDelete,
  onChange,
}) => {
  // ref関数 react-hook-formが管理できるようになる
  const { ref, ...rest } = register('image', { onChange })

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Container maxWidth="sm">
          <Box sx={{ mb: 2, pt: 4 }}>
            <Typography
              component="h2"
              sx={{ fontSize: 24, color: 'black', fontWeight: 'bold' }}
            >
              トイレ情報を編集する
            </Typography>
          </Box>
          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={1.5}
          >
            <EditFormTextField
              name="name"
              control={control}
              defaultValue={selectedRestroom.name}
              label="施設名称"
            />
            <EditFormTextField
              name="address"
              control={control}
              defaultValue={selectedRestroom.address}
              label="住所"
            />
            <EditFormTextField
              name="content"
              control={control}
              defaultValue={selectedRestroom.content}
              label="コメント"
            />

            <Typography
              component="p"
              sx={{
                fontSize: 16,
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              施設情報
            </Typography>
            <Box>
              <Grid container spacing={0.1}>
                <EditFacilityCheckBox
                  name="nursing_room"
                  control={control}
                  defaultChecked={selectedRestroom.nursingRoom}
                  label="授乳室"
                />
                <EditFacilityCheckBox
                  name="anyone_toilet"
                  control={control}
                  defaultChecked={selectedRestroom.anyoneToilet}
                  label="誰でもトイレ"
                />
                <EditFacilityCheckBox
                  name="diaper_changing_station"
                  control={control}
                  defaultChecked={selectedRestroom.diaperChangingStation}
                  label="オムツ交換台"
                />
                <EditFacilityCheckBox
                  name="powder_corner"
                  control={control}
                  defaultChecked={selectedRestroom.powderCorner}
                  label="パウダーコーナー"
                />
                <EditFacilityCheckBox
                  name="stroller_accessible"
                  control={control}
                  defaultChecked={selectedRestroom.strollerAccessible}
                  label="ベビーカー可"
                />
              </Grid>
            </Box>
            <input
              type="file"
              id="file"
              ref={(e) => {
                ref(e) // ref関数でフォームに入力した値を管理
                if (e) fileInput.current = e
              }}
              accept="image/*"
              style={{ display: 'none' }}
              {...rest}
              onChange={onChange}
            />
            <Button
              variant="contained"
              type="button"
              sx={{ fontWeight: 'bold', color: 'white' }}
              onClick={selectImageFile}
            >
              📁 画像を変更
            </Button>
            <div
              style={{
                padding: '1em',
                border: '1px dotted #ccc',
                minHeight: '200px',
                background: '#eee',
              }}
            >
              {(fileName || selectedRestroom.image) && (
                <>
                  {fileName && (
                    <Button
                      onClick={resetImageFile}
                      sx={{
                        alignSelf: 'flex-start',
                        mb: 1,
                        fontWeight: 'bold',
                        color: 'red',
                      }}
                    >
                      ❌ CLOSE
                    </Button>
                  )}
                  <Box
                    component="img"
                    src={imageData || selectedRestroom.image}
                    alt="Selected"
                    sx={{
                      display: 'block',
                      margin: 'auto',
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                  <Typography>{fileName}</Typography>
                </>
              )}
            </div>
            <Controller
              name="latitude"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="緯度"
                  sx={{ backgroundColor: 'white' }}
                  value={
                    selectedRestroom.latitude ? selectedRestroom.latitude : ''
                  }
                  InputProps={{ readOnly: true }}
                  style={{ display: 'none' }}
                />
              )}
            />
            <Controller
              name="longitude"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="経度"
                  sx={{ backgroundColor: 'white' }}
                  value={
                    selectedRestroom.longitude ? selectedRestroom.longitude : ''
                  }
                  InputProps={{ readOnly: true }}
                  style={{ display: 'none' }}
                />
              )}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ fontWeight: 'bold', color: 'white' }}
            >
              編集する
            </Button>
            <Button
              variant="contained"
              type="button"
              sx={{
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: 'red',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              }}
              onClick={onDelete}
            >
              削除する
            </Button>
          </Stack>
        </Container>
      </Box>
    </Modal>
  )
}

export default EditRestroom
