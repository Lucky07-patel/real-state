import ToastProvider from '@/components/ToastProvider'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return <> 
  <ToastProvider>
   <Component {...pageProps} />
   </ToastProvider>
  </>

}
