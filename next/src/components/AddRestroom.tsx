import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
  Modal,
} from '@mui/material'
import axios, { AxiosResponse, AxiosError } from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
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

const AddRestroom: NextPage = () => {
  const router = useRouter()

  const { handleSubmit, control } = useForm<AddRestroomFormData>({
    defaultValues: { name: '', address: '' },
  })

  // const onSubmit: SubmitHandler<SignInFormData> = (data) => {
  //   const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/sign_in'
  //   const headers = { 'Content-Type': 'application/json' }

  //   axios({ method: 'POST', url: url, data: data, headers: headers })
  //     .then((res: AxiosResponse) => {
  //       localStorage.setItem('access-token', res.headers['access-token'])
  //       localStorage.setItem('client', res.headers['client'])
  //       localStorage.setItem('uid', res.headers['uid'])
  //       router.push('/')
  //     })
  //     .catch((e: AxiosError<{ error: string }>) => {
  //       console.log(e.message)
  //     })
  // }

  return (
    <Modal>
      <Box sx={modalStyle}>
        <Container maxWidth="sm">
          <Box sx={{ mb: 4, pt: 4 }}>
            <Typography
              component="h2"
              sx={{ fontSize: 32, color: 'black', fontWeight: 'bold' }}
            >
              Sign in
            </Typography>
          </Box>
          <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
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
