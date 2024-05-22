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

interface AddRestroomFormData {
  name: string
  address: string
  content: string
  latitude: number
  longitude: number
  createdAt: string
  nursingRoom: boolean
  anyoneToilet: boolean
  diaperChangingStation: boolean
  powderCorner: boolean
  strollerAccessible: boolean
  image: string
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

interface AddRestroomProps {
  open: boolean
  onClose: () => void
  coords: { lat: number; lng: number } | null
}

const AddRestroom: React.FC<AddRestroomProps> = ({ open, onClose, coords }) => {
  const { register, handleSubmit, control } = useForm<AddRestroomFormData>({
    defaultValues: { name: '', address: '', content: '' },
  })

  const fileInput = useRef<HTMLInputElement | null>(null)
  const [fileName, setFileName] = useState('')
  const [imageData, setImageData] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length <= 0) return
    deployment(files)
  }

  const { ref, ...rest } = register('image', {
    onChange,
    required: 'ファイルを選択してください',
  })

  const selectFile = () => {
    if (!fileInput.current) return
    fileInput.current.removeAttribute('capture')
    fileInput.current.click()
  }

  const deployment = (files: FileList) => {
    const file = files[0]
    const fileReader = new FileReader()
    setFileName(file.name)
    fileReader.onload = () => {
      setImageData(fileReader.result as string)
    }
    fileReader.readAsDataURL(file)
  }

  const reset = () => {
    setFileName('')
    setImageData('')
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const onSubmit: SubmitHandler<AddRestroomFormData> = (data) => {
    if (coords) {
      const payload = { ...data, latitude: coords.lat, longitude: coords.lng }
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/posts/new'
      const headers = { 'Content-Type': 'application/json' }

      axios({ method: 'POST', url: url, data: payload, headers: headers })
        .then((res: AxiosResponse) => {
          console.log('Data submitted successfully', res.data)
          onClose()
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.log(e.message)
        })
    }
  }

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
                    name="nursingRoom"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="授乳室"
                        control={<Checkbox {...field} checked={field.value} />}
                        sx={{ padding: '1px', marginBottom: '1px' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="anyoneToilet"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="誰でもトイレ"
                        control={<Checkbox {...field} checked={field.value} />}
                        sx={{ padding: '1px', marginBottom: '1px' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="diaperChangingStation"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="オムツ交換台"
                        control={<Checkbox {...field} checked={field.value} />}
                        sx={{ padding: '1px', marginBottom: '1px' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="powderCorner"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="パウダーコーナー"
                        control={<Checkbox {...field} checked={field.value} />}
                        sx={{ padding: '1px', marginBottom: '1px' }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="strollerAccessible"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        label="ベビーカー可"
                        control={<Checkbox {...field} checked={field.value} />}
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
              onClick={selectFile}
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
              {fileName && (
                <>
                  <button onClick={reset}>❌ CLOSE</button>
                  <img
                    src={imageData}
                    style={{ margin: 'auto', maxWidth: '100%' }}
                    alt="Selected"
                  />
                  <div>{fileName}</div>
                </>
              )}
            </div>
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

export default AddRestroom
