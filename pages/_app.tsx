import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import RootLayout from '@/layout'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  // console.log('router ->', router)
  const metaTitle = router.pathname === '/'? "Home" : router.pathname.replace('/', '')

  return (
    <RootLayout metaTitle={metaTitle}>
      <Component {...pageProps}/>
    </RootLayout>
  )
}
