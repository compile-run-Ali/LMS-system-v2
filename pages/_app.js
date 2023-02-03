import { SidebarProvider } from '@/context/SidebarContext/GlobalProvider'
import '@/styles/globals.css'
import { Poppins } from '@next/font/google'

const poppins = Poppins({
  variable: '--poppins-font',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export default function App({ Component, pageProps }) {
  return (
    <SidebarProvider>
      <style jsx global>
        {`
          :root {
            --poppins-font: ${poppins.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </SidebarProvider>
  )
}