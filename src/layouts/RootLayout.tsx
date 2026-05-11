import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'
import { GTM_ID } from '@/lib/constants'

export default function RootLayout() {
  useEffect(() => {
    if (!GTM_ID) return
    const script = document.createElement('script')
    script.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`
    document.head.appendChild(script)

    const noscript = document.createElement('noscript')
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
    document.body.insertBefore(noscript, document.body.firstChild)
  }, [])

  return (
    <>
      <div className="noise" />
      <div className="grid-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <Navbar />
      <main className="relative z-10">
          <Outlet />
        </main>
      <Footer />
      <CookieBanner />
    </>
  )
}