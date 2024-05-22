import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Superhero } from '../../superhero/entities/Superhero';

@Entity('alignment')
export class Alignment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  alignment: string;

  @OneToMany(() => Superhero, (superhero) => superhero.alignment)
  superheroes: Superhero[];
}
