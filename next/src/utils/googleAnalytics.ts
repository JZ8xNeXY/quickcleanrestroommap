declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag: (...args: any[]) => void
  }
}

// export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID
export const pageview = (url: string) => {
  window.gtag('config', 'G-47ZGSE8C4V', {
    page_path: url,
  })
}
