import { BASE_URL } from '@constants/api'

interface RequestApiOptions extends RequestInit {
  endpoint: string
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
}

export const requestApi = async <T>({ endpoint, method, ...options }: RequestApiOptions): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, { method, ...options })

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
    }
    return response.json()
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}
