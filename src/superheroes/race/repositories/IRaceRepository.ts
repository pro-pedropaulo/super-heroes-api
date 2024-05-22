import { CreateRace } from '../dtos/CreateRaceDTO';
import { UpdateRace } from '../dtos/UpdateRaceDTO';
import { Race } from '../entities/Race';

export interface IRaceRepository {
  create(data: CreateRace): Promise<Race>;
  findById(id: number): Promise<Race | null>;
  getAll(): Promise<Race[]>;
  update(data: UpdateRace): Promise<void>;
  delete(id: number): Promise<void>;
}
