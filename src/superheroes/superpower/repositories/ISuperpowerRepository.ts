import { CreateSuperpower } from '../dtos/CreateSuperpowerDTO';
import { UpdateSuperpower } from '../dtos/UpdateSuperpowerDTO';
import { Superpower } from '../entities/Superpower';

export interface ISuperpowerRepository {
  create(data: CreateSuperpower): Promise<Superpower>;
  findById(id: number): Promise<Superpower | null>;
  findByIds(ids: number[]): Promise<Superpower[]>;
  getAll(): Promise<Superpower[]>;
  update(data: UpdateSuperpower): Promise<void>;
  delete(id: number): Promise<void>;
}
