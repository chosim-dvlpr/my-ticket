import { SERVER_URL } from '@constants/api'

interface RequestApiOptions extends RequestInit {
  endpoint: string
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
}

const requestApi = async <T>({ endpoint, method, ...options }: RequestApiOptions): Promise<T> => {
  try {
    const response = await fetch(`${SERVER_URL}${endpoint}`, { method, ...options })

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
    }
    return response.json()
  } catch (error) {
    throw new Error('Failed to fetch data')
  }
}

export const apiGet = <T>(endpoint: string, options?: Omit<RequestApiOptions, 'endpoint' | 'method'>) =>
  requestApi<T>({ endpoint, method: 'GET', ...options })

export const apiPost = <T>(endpoint: string, data?: any, options?: Omit<RequestApiOptions, 'endpoint' | 'method'>) =>
  requestApi<T>({
    endpoint,
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })

export const apiPatch = <T>(endpoint: string, data?: any, options?: Omit<RequestApiOptions, 'endpoint' | 'method'>) =>
  requestApi<T>({
    endpoint,
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })

export const apiDelete = <T>(endpoint: string, options?: Omit<RequestApiOptions, 'endpoint' | 'method'>) =>
  requestApi<T>({ endpoint, method: 'DELETE', ...options })
