import { NextResponse } from 'next/server'

import { BASE_URL } from '@/constants/api'

export async function getEvents<T>(): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}/events`)

    if (!response.ok) {
      throw new Error('Failed to fetch events')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Failed to fetch events')
  }
}

export async function GET() {
  try {
    const data = await getEvents()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}
