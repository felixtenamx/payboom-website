import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout'
import LegalLayout from '@/layouts/LegalLayout'
import Home from '@/pages/Home'
import Tarjetas from '@/pages/Tarjetas'
import PagosInternacionales from '@/pages/PagosInternacionales'
import Antifraude from '@/pages/Antifraude'
import Privacidad from '@/pages/Privacidad'
import Terminos from '@/pages/Terminos'
import Cookies from '@/pages/Cookies'
import Licencias from '@/pages/Licencias'

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen text-brand-text-dim">
      Cargando...
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="tarjetas" element={<Tarjetas />} />
          <Route path="pagos-internacionales" element={<PagosInternacionales />} />
          <Route path="antifraude" element={<Antifraude />} />
          <Route element={<LegalLayout />}>
            <Route path="privacidad" element={<Privacidad />} />
            <Route path="terminos" element={<Terminos />} />
            <Route path="cookies" element={<Cookies />} />
            <Route path="licencias" element={<Licencias />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}