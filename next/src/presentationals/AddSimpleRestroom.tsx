import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  Modal,
  Grid,
  Alert,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { AddCoord } from './Coord'
import { AddFacilityCheckBox } from './FacilityCheckBox'
import { AddFormTextField } from './FormTextField'
import { AddRestroomProps } from '@/interface/addRestroomInterface'
import { modalStyle } from '@/styles/modalStyles'

interface AddRestroomPropsExtended extends AddRestroomProps {
  warningCoordMessage: string
}

const AddSimpleRestroom: React.FC<AddRestroomPropsExtended> = ({
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
  onChange,
  warningImageMessage,
  confirmImageMessage,
  warningCoordMessage,
  isLoading,
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
              トイレ情報を登録する
            </Typography>
          </Box>
          {warningImageMessage && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {warningImageMessage}
            </Alert>
          )}
          {confirmImageMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {confirmImageMessage}
            </Alert>
          )}
          {warningCoordMessage && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {warningCoordMessage}
            </Alert>
          )}
          <Stack
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            spacing={1.5}
          >
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
              disabled={isLoading}
              sx={{ fontWeight: 'bold', color: 'white' }}
              onClick={selectImageFile}
            >
              {isLoading
                ? 'トイレの状況を確認中...'
                : '📁 ファイルから画像を選択'}
              <span
                style={{ color: 'white', fontSize: '15px', marginLeft: '5px' }}
              >
                (必須)
              </span>
            </Button>
            <Box
              style={{
                padding: '1em',
                border: '1px dotted #ccc',
                minHeight: '200px',
                background: '#eee',
              }}
            >
              {fileName && (
                <>
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
                  <Box
                    component="img"
                    src={imageData}
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
            </Box>

            <AddFormTextField name="name" control={control} label="施設名称" />
            <AddFormTextField name="address" control={control} label="住所" />
            <AddFormTextField
              name="content"
              control={control}
              label="コメント"
            />

            <Typography
              component="p"
              sx={{
                fontSize: 16,
                color: 'black',
              }}
            >
              設備有無
            </Typography>
            <Box>
              <Grid container spacing={0.1}>
                <Grid container spacing={0.1}>
                  <AddFacilityCheckBox
                    name="nursing_room"
                    control={control}
                    label="授乳室"
                  />
                  <AddFacilityCheckBox
                    name="anyone_toilet"
                    control={control}
                    label="誰でもトイレ"
                  />
                  <AddFacilityCheckBox
                    name="diaper_changing_station"
                    control={control}
                    label="オムツ交換台"
                  />
                  <AddFacilityCheckBox
                    name="powder_corner"
                    control={control}
                    label="パウダーコーナー"
                  />
                  <AddFacilityCheckBox
                    name="stroller_accessible"
                    control={control}
                    label="ベビーカー可"
                  />
                </Grid>
              </Grid>
            </Box>
            <Controller
              name="evaluation"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  label="評価"
                  sx={{ backgroundColor: 'white' }}
                  // style={{ display: 'none' }}
                />
              )}
            />
            <AddCoord
              name="latitude"
              control={control}
              label="緯度"
              coords={null}
              coordType="lat"
            />
            <AddCoord
              name="longitude"
              control={control}
              label="経度"
              coords={null}
              coordType="lng"
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ fontWeight: 'bold', color: 'white' }}
            >
              送信する
            </Button>
          </Stack>
        </Container>
      </Box>
    </Modal>
  )
}

export default AddSimpleRestroom
