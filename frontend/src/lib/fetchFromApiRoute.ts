import { headers } from 'next/headers'

async function getServerBaseUrl(): Promise<string> {
  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:3000'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  console.log('protocol', protocol)
  console.log('host', host)
  return `${protocol}://${host}`
}

export async function fetchFromApiRoute<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const baseUrl = await getServerBaseUrl()
    console.log('baseUrl', baseUrl)
    const url = `${baseUrl}${endpoint}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-Server-Component',
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`Failed to API Route: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    return result.data || result
  } catch (error) {
    console.error('Failed to API Route:', error)
    return null
  }
}
