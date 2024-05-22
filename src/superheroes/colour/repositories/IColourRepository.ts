import { CreateColour } from '../dtos/CreateColourDTO';
import { UpdateColour } from '../dtos/UpdateColourDTO';
import { Colour } from '../entities/Colour';

export interface IColourRepository {
  create(data: CreateColour): Promise<Colour>;
  findById(id: number): Promise<Colour | null>;
  getAll(): Promise<Colour[]>;
  update(data: UpdateColour): Promise<void>;
  delete(id: number): Promise<void>;
}
