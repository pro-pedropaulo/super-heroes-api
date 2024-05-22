import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Superhero } from '../../superhero/entities/Superhero';

@Entity('colour')
export class Colour {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  colour: string;

  @OneToMany(() => Superhero, (superhero) => superhero.eyeColour)
  superheroEyeColours: Superhero[];

  @OneToMany(() => Superhero, (superhero) => superhero.hairColour)
  superheroHairColours: Superhero[];

  @OneToMany(() => Superhero, (superhero) => superhero.skinColour)
  superheroSkinColours: Superhero[];
}
