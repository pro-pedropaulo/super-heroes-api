import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Superhero } from '../../superhero/entities/Superhero';

@Entity('gender')
export class Gender {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  gender: string;

  @OneToMany(() => Superhero, (superhero) => superhero.gender)
  superheroes: Superhero[];
}
