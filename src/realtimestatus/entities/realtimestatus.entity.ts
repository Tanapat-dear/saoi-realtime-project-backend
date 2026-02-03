import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import dayjs from 'dayjs'


@Entity('saoi_realtime_oee_data')
export class Realtimestatus {
 
  @Column({
     type: 'timestamp' ,transformer:
      {
        to: (value: Date) => value,
        from: (value: Date) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'), // load → string
      }
  ,})    
  ptime: Date;

  @PrimaryColumn({ type: 'varchar', length: 50 })
  mac_address: string;

  @Column({ type: 'varchar', length: 50 })
  user_name: string;

  @Column({ type: 'int' })              // แทน number
  red_info: number;

  @Column({ type: 'int' })              // แทน number
  amber_info: number;
  
  @Column({ type: 'int' })              // แทน number
  green_info: number;

  @Column({ type: 'int' })              // แทน number
  wdt_monitor_info: number;


  @Column({
     type: 'timestamp' ,transformer:
      {
        to: (value: Date) => value,
        from: (value: Date) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'), // load → string
      }
  ,})    
  update_at: Date;
 
}
