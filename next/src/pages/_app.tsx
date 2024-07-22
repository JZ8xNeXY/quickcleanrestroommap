import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { GoogleAnalytics } from '@next/third-parties/google'
import { AppProps } from 'next/app'
import HeaderContainer from '@/containers/HeaderContainer'
import { RestroomProvider } from '@/context/RestRoomContext'
import { SessionProvider } from '@/context/SessionContext'
import Footer from '@/presentationals/Footer'

import createEmotionCache from '@/styles/createEmotionCache'
import theme from '@/styles/theme'
import '../styles/globals.css'

// app/layout.tsx

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <SessionProvider>
            <RestroomProvider>
              <CssBaseline />
              <HeaderContainer />
              <Component {...pageProps} />
              <Footer />
            </RestroomProvider>
          </SessionProvider>
        </ThemeProvider>
      </CacheProvider>{' '}
      {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </>
  )
}
