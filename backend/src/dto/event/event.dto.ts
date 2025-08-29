import { ApiProperty } from '@nestjs/swagger'
import { PartialType } from '@nestjs/swagger'

export class CreateEventDto {
  @ApiProperty({
    description: '이벤트 시작 날짜',
    example: '2025-05-24',
  })
  start_date: string

  @ApiProperty({
    description: '이벤트 이름',
    example: '서울 재즈 페스티벌',
  })
  event_name: string

  @ApiProperty({
    description: '포스터 이미지 URL',
    example: 'https://example.com/poster.jpg',
    required: false,
  })
  poster_url?: string

  @ApiProperty({
    description: '이벤트 종료 날짜',
    example: '2025-05-25',
  })
  end_date: string

  @ApiProperty({
    description: '이벤트 장소',
    example: '올림픽공원',
  })
  place: string

  @ApiProperty({
    description: '도로명 주소',
    example: '서울특별시 송파구 올림픽로 424',
  })
  road_address: string

  @ApiProperty({
    description: 'MD 정보 URL',
    example: 'https://example.com/md-info',
    required: false,
  })
  md_info_url?: string

  @ApiProperty({
    description: '좌석 배치도 이미지 URL',
    example: 'https://example.com/seating.jpg',
    required: false,
  })
  seating_image_url?: string
}

export class UpdateEventDto extends PartialType(CreateEventDto) {}
