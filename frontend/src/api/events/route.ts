import { requestApi } from '../requestApi'

export async function getEvents<T>(): Promise<T> {
  return await requestApi<T>({ endpoint: '/events', method: 'GET' })
}
