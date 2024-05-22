import { CreateAttribute } from '../dtos/CreateAttributeDTO';
import { UpdateAttribute } from '../dtos/UpdateAttributeDTO';
import { Attribute } from '../entities/Attribute';

export interface IAttributeRepository {
  create(data: CreateAttribute): Promise<Attribute>;
  findById(id: number): Promise<Attribute | null>;
  getAll(): Promise<Attribute[]>;
  update(data: UpdateAttribute): Promise<void>;
  delete(id: number): Promise<void>;
}
