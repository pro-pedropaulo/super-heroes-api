import { IPageResponse } from '../../../shared/dtos/IPageResponse';
import { StrictOmit } from '../../../shared/util/types/StrictOmitType';
import { GetFilterSuperhero } from '../dtos/GetFilterSuperheroDTO';
import { GetOrderSuperhero } from '../dtos/GetOrderSuperheroDTO';
import { Superhero } from '../entities/Superhero';

export type SuperheroSaveInput = StrictOmit<Superhero, 'id' | 'heroAttributes'>;
export type SuperheroUpdateInput = StrictOmit<Superhero, 'heroAttributes'>;

export interface ISuperheroRepository {
  create(data: SuperheroSaveInput): Promise<Superhero>;
  findById(id: number): Promise<Superhero | null>;
  getAll(
    page: number,
    size: number,
    order: GetOrderSuperhero,
    filter: GetFilterSuperhero,
  ): Promise<IPageResponse<Superhero>>;
  update(data: SuperheroUpdateInput): Promise<void>;
  delete(id: number): Promise<void>;
}
