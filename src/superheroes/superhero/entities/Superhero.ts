import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Gender } from '../../gender/entities/Gender';
import { Colour } from '../../colour/entities/Colour';
import { Race } from '../../race/entities/Race';
import { Alignment } from '../../alignment/entities/Alignment';
import { Publisher } from '../../publisher/entities/Publisher';
import { HeroAttribute } from '../../heroAttribute/entities/HeroAttribute';
import { Superpower } from '../../superpower/entities/Superpower';

@Entity('superhero')
export class Superhero {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'superhero_name' })
  superheroName: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'height_cm' })
  heightCm: number;

  @Column({ name: 'weight_kg' })
  weightKg: number;

  @ManyToOne(() => Gender, (gender) => gender.superheroes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'gender_id' })
  gender: Gender;

  @ManyToOne(() => Colour, (colour) => colour.superheroEyeColours, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'eye_colour_id' })
  eyeColour: Colour;

  @ManyToOne(() => Colour, (colour) => colour.superheroHairColours, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'hair_colour_id' })
  hairColour: Colour;

  @ManyToOne(() => Colour, (colour) => colour.superheroSkinColours, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'skin_colour_id' })
  skinColour: Colour;

  @ManyToOne(() => Race, (race) => race.superheroes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'race_id' })
  race: Race;

  @ManyToOne(() => Publisher, (publisher) => publisher.superheroes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'publisher_id' })
  publisher: Publisher;

  @ManyToOne(() => Alignment, (alignment) => alignment.superheroes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'alignment_id' })
  alignment: Alignment;

  @OneToMany(() => HeroAttribute, (heroAttribute) => heroAttribute.superhero, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  heroAttributes: HeroAttribute[];

  @ManyToMany(() => Superpower, { cascade: true })
  @JoinTable({
    name: 'hero_power',
    joinColumn: { name: 'hero_id' },
    inverseJoinColumn: { name: 'power_id' },
  })
  superpowers: Superpower[];
}
