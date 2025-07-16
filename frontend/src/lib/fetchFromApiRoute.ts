async function getServerBaseUrl(): Promise<string> {
  const isProduction = process.env.NODE_ENV === 'production'
  const host = isProduction ? process.env.NEXT_PUBLIC_CLIENT_URL : 'localhost:3000'
  const protocol = isProduction ? 'https' : 'http'
  return `${protocol}://${host}`
}

export async function fetchFromApiRoute<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const baseUrl = await getServerBaseUrl()
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
