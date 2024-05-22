import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('superpower')
export class Superpower {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'power_name' })
  powerName: string;
}
