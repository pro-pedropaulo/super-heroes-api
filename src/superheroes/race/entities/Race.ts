import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Superhero } from '../../superhero/entities/Superhero';

@Entity('race')
export class Race {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  race: string;

  @OneToMany(() => Superhero, (superhero) => superhero.race)
  superheroes: Superhero[];
}
