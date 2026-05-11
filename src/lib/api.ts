import type { LeadPayload } from '@/types'

const API_URL = '/api/lead'

export async function submitLead(payload: LeadPayload): Promise<Response> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    return res
  } finally {
    clearTimeout(timeout)
  }
}