
import BaseLayout from '@/components/BaseLayout/BaseLayout'
import Register from '@/components/Register/Register'
import { Poppins } from '@next/font/google'

const poppins = Poppins({
  variable: '--poppins-font',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export default function Home() {
  return (
    <BaseLayout title={"Register"}>
      <style jsx global>
        {`
          :root {
            --poppins-font: ${poppins.style.fontFamily};
          }
        `}
      </style>
      <Register/>
    </BaseLayout>
       
  )
}


