import { CreateAlignment } from '../dtos/CreateAlignmentDTO';
import { UpdateAlignment } from '../dtos/UpdateAlignmentDTO';
import { Alignment } from '../entities/Alignment';

export interface IAlignmentRepository {
  create(data: CreateAlignment): Promise<Alignment>;
  findById(id: number): Promise<Alignment | null>;
  getAll(): Promise<Alignment[]>;
  update(data: UpdateAlignment): Promise<void>;
  delete(id: number): Promise<void>;
}
