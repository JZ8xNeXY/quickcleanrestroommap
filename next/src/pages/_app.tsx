import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Script from 'next/script'
import { useEffect } from 'react'
import HeaderContainer from '@/containers/HeaderContainer'
import { RestroomProvider } from '@/context/RestRoomContext'
import { SessionProvider } from '@/context/SessionContext'
import Footer from '@/presentationals/Footer'
import createEmotionCache from '@/styles/createEmotionCache'
import theme from '@/styles/theme'
import '../styles/globals.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    console.log('Google Analytics ID:', GA_MEASUREMENT_ID)
  }, [GA_MEASUREMENT_ID])

  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <RestroomProvider>
              <CssBaseline />
              <HeaderContainer />
              <Component {...pageProps} />
              <Footer />
            </RestroomProvider>
          </SessionProvider>
        </ThemeProvider>
      </CacheProvider>
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}
    </>
  )
}
