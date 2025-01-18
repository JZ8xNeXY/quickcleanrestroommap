import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import HeaderContainer from '@/containers/HeaderContainer'
import { RestroomProvider } from '@/context/RestRoomContext'
import { SessionProvider } from '@/context/SessionContext'
import Footer from '@/presentationals/Footer'

import createEmotionCache from '@/styles/createEmotionCache'
import theme from '@/styles/theme'
import * as gtag from '@/utils/googleAnalytics'
import '../styles/globals.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  //Todo Google Analytics設定
  const router = useRouter()
  useEffect(() => {
    const handleRouterChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouterChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouterChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <meta
          property="og:title"
          content="Quick Clean Restroom Map -最寄りの綺麗なトイレを探そう-"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://quickcleanrestrooms.com/" />
        <meta
          property="og:image"
          content="https://quickcleanrestrooms.com/logo.png"
        />
        <meta
          property="og:description"
          content="GPS機能で最寄りの綺麗なトイレを探そう"
        />
        <meta property="og:site_name" content="Quick Clean Restroom Map" />
        {/* ファビコンの設定 */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
 
           gtag('config', '${gtag.GA_MEASUREMENT_ID}');
           `,
        }}
      />
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
    </>
  )
}
