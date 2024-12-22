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
import { useState, useEffect } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useSessionContext } from '@/context/SessionContext'
import { supabase } from '@/utils/supabase'
import { useUserState } from '@/utils/useGlobalState'

type SignInFormData = {
  email: string
  password: string
}

const SignIn: NextPage = () => {
  const router = useRouter()
  const [user, setUser] = useUserState()
  const [isLoading, setIsLoading] = useState(false)
  const { setCurrentUser } = useSessionContext()

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    console.log('Updated user:', user)
  }, [user])

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }

  const { handleSubmit, control } = useForm<SignInFormData>({
    defaultValues: { email: '', password: '' },
  })

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

  const signIn = async (email: string, password: string) => {
    const response = await fetch('/api/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'サインインに失敗しました')
    }

    // ローカルストレージにトークンを保存
    const { session, user } = result
    localStorage.setItem('accessToken', session.access_token)
    localStorage.setItem('refreshToken', session.refresh_token)
    localStorage.setItem('expiresAt', session.expires_at)

    // Supabaseセッションを設定
    await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    })

    setUser({
      ...user,
      userUid: String(result.user?.id) || '',
      email: result.user?.email || '',
      isSignedIn: true,
      isFetched: true,
    })

    return result.user
  }

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    setIsLoading(true)
    try {
      const user = await signIn(data.email, data.password)
      setCurrentUser({
        ...user,
        userUid: '',
        isFetched: true,
        isSignedIn: !!user,
      })
      router.push('/')
    } catch (e: unknown) {
      setIsLoading(false)
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
          <LoadingButton
            variant="contained"
            type="submit"
            loading={isLoading}
            sx={{ fontWeight: 'bold', color: 'white' }}
          >
            送信する
          </LoadingButton>
        </Stack>
      </Container>
    </Box>
  )
}

export default SignIn
