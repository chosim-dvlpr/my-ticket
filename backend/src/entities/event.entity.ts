import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'date' })
  start_date: string

  @Column({ length: 255 })
  event_name: string

  @Column({ length: 255, nullable: true })
  poster_url: string

  @Column({ type: 'date' })
  end_date: string

  @Column({ length: 25 })
  place: string

  @Column({ length: 255 })
  road_address: string

  @Column({ length: 255, nullable: true })
  md_info_url: string

  @Column({ length: 255, nullable: true })
  seating_image_url: string
}
