import Navbar from '@/components/Navbar'
import './global.css'
import Footer from '@/components/Footer'
import { Providers } from '@/providers/provider'
import Script from 'next/script'

export const metadata = {
  title: 'Edustarr',
  description: 'GG',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}