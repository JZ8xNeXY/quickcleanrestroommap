/* eslint-disable @next/next/no-img-element */
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
import axios, { AxiosResponse, AxiosError } from 'axios'
import { useState, useRef } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { mutate } from 'swr'
import { useRestroomContext } from '@/context/RestRoomContext'

interface EditRestroomFormData {
  name: string
  address: string
  content: string
  latitude: number
  longitude: number
  createdAt: string
  nursing_room: boolean
  anyone_toilet: boolean
  diaper_changing_station: boolean
  powder_corner: boolean
  stroller_accessible: boolean
  image?: FileList
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

interface EditRestroomProps {
  open: boolean
  onClose: () => void
  lat: number
  lng: number
}

const EditRestroom: React.FC<EditRestroomProps> = ({
  open,
  onClose,
  lat,
  lng,
}) => {
  const { selectedRestroom } = useRestroomContext() //useContextを利用
  console.log(selectedRestroom.image)

  const { register, handleSubmit, control, reset } =
    useForm<EditRestroomFormData>({
      defaultValues: { name: '', address: '', content: '' },
    })

  const fileInput = useRef<HTMLInputElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [imageData, setImageData] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length <= 0) return
    showImageFileName(files)
  }

  const { ref, ...rest } = register('image', { onChange })

  const selectImageFile = () => {
    if (!fileInput.current) return
    fileInput.current.removeAttribute('capture')
    fileInput.current.click()
  }

  const showImageFileName = (files: FileList) => {
    const file = files[0]
    const fileReader = new FileReader()
    setFileName(file.name)
    fileReader.onload = () => {
      setImageData(fileReader.result as string)
    }
    fileReader.readAsDataURL(file)
  }

  const resetImageFile = () => {
    setFileName('')
    setImageData('')
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const resetModal = () => {
    reset()
    resetImageFile()
    onClose()
  }

  const onSubmit: SubmitHandler<EditRestroomFormData> = (data) => {
    if (lat && lng) {
      //画像があるためformDataを使用
      const formData = new FormData()
      formData.append('post[name]', data.name)
      formData.append('post[address]', data.address)
      formData.append('post[content]', data.content)
      formData.append('post[latitude]', lat.toString())
      formData.append('post[longitude]', lng.toString())
      formData.append(
        'post[nursing_room]',
        (data.nursing_room ?? false).toString(),
      )
      formData.append(
        'post[anyone_toilet]',
        (data.anyone_toilet ?? false).toString(),
      )
      formData.append(
        'post[diaper_changing_station]',
        (data.diaper_changing_station ?? false).toString(),
      )
      formData.append(
        'post[powder_corner]',
        (data.powder_corner ?? false).toString(),
      )
      formData.append(
        'post[stroller_accessible]',
        (data.stroller_accessible ?? false).toString(),
      )
      if (fileInput.current?.files && fileInput.current.files[0]) {
        formData.append('post[image]', fileInput.current.files[0])
      }

      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/posts'
      const headers = { 'Content-Type': 'multipart/form-data' }

      axios
        .post(url, formData, { headers })
        .then((res: AxiosResponse) => {
          console.log('Data submitted successfully', res.data)
          mutate(url) // 投稿が成功した後にデータを再取得
          resetModal()
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.error(`Request failed with status code ${e.response?.status}`)
          console.error(e.message)
        })
    }
  }

  return (
    <Modal open={open} onClose={resetModal}>
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
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={selectedRestroom.name || null}
                  type="text"
                  label="施設名称"
                  sx={{ backgroundColor: 'white' }}
                />
              )}
            />
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={selectedRestroom.address || null}
                  type="text"
                  label="住所"
                  sx={{ backgroundColor: 'white' }}
                />
              )}
            />
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  value={selectedRestroom.content || null}
                  type="text"
                  label="コメント"
                  sx={{ backgroundColor: 'white' }}
                />
              )}
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
                <Grid item xs={6}>
                  <Controller
                    name="nursing_room"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="授乳室"
                        control={
                          <Checkbox
                            {...field}
                            checked={selectedRestroom.nursingRoom}
                          />
                        }
                        sx={{ padding: '1px', marginBottom: '1px' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="anyone_toilet"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="誰でもトイレ"
                        control={
                          <Checkbox
                            {...field}
                            checked={selectedRestroom.anyoneToilet}
                          />
                        }
                        sx={{ padding: '1px', marginBottom: '1px' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="diaper_changing_station"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="オムツ交換台"
                        control={
                          <Checkbox
                            {...field}
                            checked={selectedRestroom.diaperChangingStation}
                          />
                        }
                        sx={{ padding: '1px', marginBottom: '1px' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="powder_corner"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="パウダーコーナー"
                        control={
                          <Checkbox
                            {...field}
                            checked={selectedRestroom.powderCorner}
                          />
                        }
                        sx={{ padding: '1px', marginBottom: '1px' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="stroller_accessible"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="ベビーカー可"
                        control={
                          <Checkbox
                            {...field}
                            checked={selectedRestroom.strollerAccessible}
                          />
                        }
                        sx={{ padding: '1px', marginBottom: '1px' }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <input
              type="file"
              id="file"
              ref={(e) => {
                ref(e)
                fileInput.current = e
              }}
              accept="image/*"
              style={{ display: 'none' }}
              {...rest}
            />
            <Button
              variant="contained"
              type="button"
              sx={{ fontWeight: 'bold', color: 'white' }}
              onClick={selectImageFile}
            >
              📁 ファイルから選択
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
                  <Button onClick={resetImageFile}>❌ CLOSE</Button>
                  <img
                    src={imageData || selectedRestroom.image}
                    style={{ margin: 'auto', maxWidth: '100%' }}
                    alt="Selected"
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
          </Stack>
        </Container>
      </Box>
    </Modal>
  )
}

export default EditRestroom