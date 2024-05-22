import { CreatePublisher } from '../dtos/CreatePublisherDTO';
import { UpdatePublisher } from '../dtos/UpdatePublisherDTO';
import { Publisher } from '../entities/Publisher';

export interface IPublisherRepository {
  create(data: CreatePublisher): Promise<Publisher>;
  findById(id: number): Promise<Publisher | null>;
  getAll(): Promise<Publisher[]>;
  update(data: UpdatePublisher): Promise<void>;
  delete(id: number): Promise<void>;
  getPublisherByIds(ids: number[]): Promise<Publisher[]>;
}
