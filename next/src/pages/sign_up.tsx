import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Container,
  TextField,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
} from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useSessionContext } from '@/context/SessionContext'
import { supabase } from '@/utils/supabase'
import { useUserState } from '@/utils/useGlobalState'

type SignUpFormData = {
  email: string
  password: string
  confirmPassword: string
  app_metadata: string
  user_metadata: string
  aud: string
  created_at: string
}

const SignUp: NextPage = () => {
  const router = useRouter()
  const [user, setUser] = useUserState()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { setCurrentUser } = useSessionContext()

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const { handleSubmit, control, watch } = useForm<SignUpFormData>({
    defaultValues: { email: '', password: '', confirmPassword: '' },
  })

  // パスワードと確認パスワードが一致しているかチェック
  const password = watch('password')
  const confirmPassword = watch('confirmPassword')

  const validationRules = {
    email: {
      required: 'メールアドレスを入力してください。',
      pattern: {
        value:
          /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
        message: '正しい形式のメールアドレスを入力してください。',
      },
    },
    password: {
      required: 'パスワードを入力してください。',
    },
  }

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error != null) {
      throw new Error(error.message)
    }
    setUser({
      ...user,
      userUid: data.user?.id || '',
      email: data.user?.email || '',
      isSignedIn: true,
      isFetched: true,
    })
    return data.user
  }

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    setIsLoading(true)
    try {
      const user = await signUp(data.email, data.password)
      if (user) {
        setCurrentUser({
          userUid: user.id || '', // `user` から `id` を取得
          id: user.id || 'default-id',
          isFetched: true,
          isSignedIn: true,
          app_metadata: user.app_metadata || 'default_app_metadata',
          user_metadata: user.user_metadata || 'default_user_metadata',
          aud: user.aud || 'default_aud',
          created_at: user.created_at || 'default_date',
        })
      }
      router.push('/')
    } catch (e: unknown) {
      setIsLoading(false)
      console.error(e) // エラーをログに出力
      setErrorMessage(e.message || 'エラーが発生しました')
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: '#EDF2F7',
        minHeight: 'calc(100vh - 57px)',
      }}
    >
      <Container maxWidth="sm">
        {errorMessage && (
          <Typography color="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <Box sx={{ mb: 4, pt: 4 }}>
          <Typography
            component="h2"
            sx={{ fontSize: 32, color: 'black', fontWeight: 'bold' }}
          >
            Sign Up
          </Typography>
        </Box>
        <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
          <Controller
            name="email"
            control={control}
            rules={validationRules.email}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                required
                type="text"
                label="メールアドレス"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ backgroundColor: 'white' }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={validationRules.password}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                required
                type={showPassword ? 'text' : 'password'}
                label="パスワード"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ backgroundColor: 'white' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="パスワードを表示"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            rules={validationRules.password}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                required
                type={showPassword ? 'text' : 'password'}
                label="確認用パスワード"
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
                sx={{ backgroundColor: 'white' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="パスワードを表示"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <LoadingButton
            variant="contained"
            type="submit"
            loading={isLoading}
            disabled={password !== confirmPassword}
            sx={{ fontWeight: 'bold', color: 'white' }}
          >
            登録する
          </LoadingButton>
        </Stack>
      </Container>
    </Box>
  )
}

export default SignUp
