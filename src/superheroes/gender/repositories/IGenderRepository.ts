import { CreateGender } from '../dtos/CreateGenderDTO';
import { UpdateGender } from '../dtos/UpdateGenderDTO';
import { Gender } from '../entities/Gender';

export interface IGenderRepository {
  create(data: CreateGender): Promise<Gender>;
  findById(id: number): Promise<Gender | null>;
  getAll(): Promise<Gender[]>;
  update(data: UpdateGender): Promise<void>;
  delete(id: number): Promise<void>;
}
