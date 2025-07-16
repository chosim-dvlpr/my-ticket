import { NextResponse } from 'next/server'

import { apiGet } from '@lib/apiClient'
import { Event } from '@type/event.type'

const createErrorResponse = (message: string, status: number) => {
  return NextResponse.json(
    {
      error: message,
      timestamp: new Date().toISOString(),
      status,
    },
    { status },
  )
}

const createSuccessResponse = (data: any, metadata?: any) => {
  return NextResponse.json({
    data,
    metadata: {
      timestamp: new Date().toISOString(),
      count: Array.isArray(data) ? data.length : 1,
      ...metadata,
    },
  })
}

export async function GET() {
  try {
    const events = await apiGet<Event[]>('/events')

    return createSuccessResponse(events)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.'

    if (errorMessage.includes('HTTP Error: 404')) {
      return createErrorResponse('이벤트 데이터를 찾을 수 없습니다.', 404)
    } else if (errorMessage.includes('timeout')) {
      return createErrorResponse('요청 시간이 초과되었습니다.', 504)
    } else {
      return createErrorResponse('서버 내부 오류가 발생했습니다.', 500)
    }
  }
}
