import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Superhero } from '../../superhero/entities/Superhero';
import { Attribute } from '../../attribute/entities/Attribute';

@Entity('hero_attribute')
export class HeroAttribute {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'attribute_value' })
  attributeValue: number;

  @ManyToOne(() => Superhero, (superhero) => superhero.heroAttributes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'hero_id' })
  superhero: Superhero;

  @ManyToOne(() => Attribute, (attribute) => attribute.heroAttributes)
  @JoinColumn({ name: 'attribute_id' })
  attribute: Attribute;
}
