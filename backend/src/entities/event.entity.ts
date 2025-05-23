import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('event')
export class Event {
  @ApiProperty({ description: '이벤트 ID' })
  @PrimaryGeneratedColumn('increment')
  id: number

  @ApiProperty({ description: '이벤트 시작 날짜' })
  @Column({ type: 'date' })
  start_date: string

  @ApiProperty({ description: '이벤트 이름' })
  @Column({ length: 255 })
  event_name: string

  @ApiProperty({ description: '포스터 이미지 URL', required: false })
  @Column({ length: 255, nullable: true })
  poster_url?: string

  @ApiProperty({ description: '이벤트 종료 날짜' })
  @Column({ type: 'date' })
  end_date: string

  @ApiProperty({ description: '이벤트 장소' })
  @Column({ length: 25 })
  place: string

  @ApiProperty({ description: '도로명 주소' })
  @Column({ length: 255 })
  road_address: string

  @ApiProperty({ description: 'MD 정보 URL', required: false })
  @Column({ length: 255, nullable: true })
  md_info_url?: string

  @ApiProperty({ description: '좌석 배치도 이미지 URL', required: false })
  @Column({ length: 255, nullable: true })
  seating_image_url?: string
}
