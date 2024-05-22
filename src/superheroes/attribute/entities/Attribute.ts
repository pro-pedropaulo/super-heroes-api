import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { HeroAttribute } from './../../heroAttribute/entities/HeroAttribute';

@Entity('attribute')
export class Attribute {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'attribute_name' })
  attributeName: string;

  @OneToMany(() => HeroAttribute, (heroAttribute) => heroAttribute.attribute)
  heroAttributes: HeroAttribute[];
}
