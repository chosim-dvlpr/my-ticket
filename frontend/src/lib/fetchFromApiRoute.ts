function getServerBaseUrl(): string {
  if (process.env.NODE_ENV === 'production') {
    const host = process.env.NEXT_PUBLIC_CLIENT_URL
    if (!host) {
      throw new Error('NEXT_PUBLIC_CLIENT_URL is not defined in production environment.')
    }
    return host
  }
  return 'http://localhost:3000'
}

export async function fetchFromApiRoute<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  const baseUrl = getServerBaseUrl()
  const url = `${baseUrl}${endpoint}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-Server-Component',
      },
      ...options,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API Route request failed with status ${response.status}: ${errorText}`)
    }

    const result = await response.json()

    return result.data
  } catch (error) {
    console.error(`Failed to fetch from API route: ${url}`, error)
    return null
  }
}
