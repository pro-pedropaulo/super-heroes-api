import { inject, injectable } from 'tsyringe';

import { IHeroAttributeRepository } from '../repositories/IHeroAttributeRepository';
import { CreateHeroAttribute } from '../dtos/CreateHeroAttributeDTO';
import { UpdateHeroAttribute } from '../dtos/UpdateHeroAttributeDTO';
import NotFound from '../../../shared/errors/notFound';
import { Superhero } from '../../superhero/entities/Superhero';
import { Attribute } from '../../attribute/entities/Attribute';

@injectable()
export class HeroAttributeService {
  constructor(
    @inject('HeroAttributeRepository')
    private readonly heroAttributeRepository: IHeroAttributeRepository,
  ) {}

  async create(data: CreateHeroAttribute) {
    const superhero = new Superhero();
    superhero.id = data.superhero;

    const attribute = new Attribute();
    attribute.id = data.attribute;

    return await this.heroAttributeRepository.create({
      ...data,
      superhero,
      attribute,
    });
  }

  async delete(id: number) {
    const heroAttribute = await this.findById(id);
    return await this.heroAttributeRepository.delete(heroAttribute.id);
  }

  async findById(id: number) {
    const heroAttribute = await this.heroAttributeRepository.findById(id);

    if (!heroAttribute) {
      throw new NotFound('NotFound any HeroAttribute with this id!');
    }

    return heroAttribute;
  }

  async getAll() {
    return await this.heroAttributeRepository.getAll();
  }

  async update(data: UpdateHeroAttribute) {
    await this.findById(data.id);

    const superhero = new Superhero();
    superhero.id = data.superhero;

    const attribute = new Attribute();
    attribute.id = data.attribute;

    return await this.heroAttributeRepository.update({
      ...data,
      superhero,
      attribute,
    });
  }
}
