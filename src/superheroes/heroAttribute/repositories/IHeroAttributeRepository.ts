import { StrictOmit } from '../../../shared/util/types/StrictOmitType';
import { HeroAttribute } from '../entities/HeroAttribute';

export type HeroAttributeSaveInput = StrictOmit<HeroAttribute, 'id'>;
export type HeroAttributeUpdateInput = HeroAttribute;

export interface IHeroAttributeRepository {
  create(data: HeroAttributeSaveInput): Promise<HeroAttribute>;
  findById(id: number): Promise<HeroAttribute | null>;
  getAll(): Promise<HeroAttribute[]>;
  update(data: HeroAttributeUpdateInput): Promise<void>;
  delete(id: number): Promise<void>;
}
