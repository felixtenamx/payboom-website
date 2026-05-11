export interface LeadPayload {
  Nombre: string
  Correo: string
  Telefono: string
  Mensaje: string
  'g-recaptcha-response': string
}

export interface LeadResponse {
  ok: boolean
  error?: string
  detail?: unknown
  forward?: { success?: string | boolean }
  score?: number
}

export interface NavLink {
  label: string
  href: string
  external?: boolean
}

export interface CardFeature {
  icon: string
  title: string
  description: string
  items: string[]
  href: string
  external?: boolean
}

export interface MetricData {
  value: number
  label: string
}

export interface City {
  name: string
  lat: number
  lon: number
}

export interface ConceptCard {
  num: number
  title: string
  description: string
}

export type CookieConsent = 'accepted' | 'rejected' | null