import { inject, injectable } from 'tsyringe';

import { ISuperheroRepository } from '../repositories/ISuperheroRepository';
import { IGenderRepository } from '../../gender/repositories/IGenderRepository';
import { IColourRepository } from '../../colour/repositories/IColourRepository';
import { IRaceRepository } from '../../race/repositories/IRaceRepository';
import { IPublisherRepository } from '../../publisher/repositories/IPublisherRepository';
import { IAlignmentRepository } from '../../alignment/repositories/IAlignmentRepository';
import { ISuperpowerRepository } from '../../superpower/repositories/ISuperpowerRepository';
import { CreateSuperhero } from '../dtos/CreateSuperheroDTO';
import { UpdateSuperhero } from '../dtos/UpdateSuperheroDTO';
import { GetOrderSuperhero } from '../dtos/GetOrderSuperheroDTO';
import { GetFilterSuperhero } from '../dtos/GetFilterSuperheroDTO';
import { CreateSuperheroBattle } from '../dtos/CreateSuperheroBattleDTO';
import NotFound from '../../../shared/errors/notFound';
import BadRequest from '../../../shared/errors/badRequest';
import { Publisher } from '../../publisher/entities/Publisher';

@injectable()
export class SuperheroService {
  constructor(
    @inject('SuperheroRepository')
    private readonly superheroRepository: ISuperheroRepository,
    @inject('GenderRepository')
    private readonly genderRepository: IGenderRepository,
    @inject('ColourRepository')
    private readonly colourRepository: IColourRepository,
    @inject('RaceRepository')
    private readonly raceRepository: IRaceRepository,
    @inject('PublisherRepository')
    private readonly publisherRepository: IPublisherRepository,
    @inject('AlignmentRepository')
    private readonly alignmentRepository: IAlignmentRepository,
    @inject('SuperpowerRepository')
    private readonly superpowerRepository: ISuperpowerRepository,
  ) {}

  async create(data: CreateSuperhero) {
    const gender = await this.genderRepository.findById(data.gender);
    const eyeColour = await this.colourRepository.findById(data.eyeColour);
    const hairColour = await this.colourRepository.findById(data.hairColour);
    const skinColour = await this.colourRepository.findById(data.skinColour);
    const race = await this.raceRepository.findById(data.race);
    const publisher = await this.publisherRepository.findById(data.publisher);
    const alignment = await this.alignmentRepository.findById(data.alignment);

    if (
      !gender ||
      !eyeColour ||
      !hairColour ||
      !skinColour ||
      !race ||
      !publisher ||
      !alignment
    ) {
      throw new NotFound('Some related entities were not found');
    }

    const superpowerIds = data.superpowers.map(
      (superpower) => superpower.powerId,
    );
    const superpowers =
      await this.superpowerRepository.findByIds(superpowerIds);

    if (superpowerIds.length !== superpowers.length) {
      throw new BadRequest('Some superpowers reported were not found');
    }

    return await this.superheroRepository.create({
      ...data,
      gender,
      eyeColour,
      hairColour,
      skinColour,
      race,
      publisher,
      alignment,
      superpowers,
    });
  }

  async findById(id: number) {
    const superhero = await this.superheroRepository.findById(id);

    if (!superhero) {
      throw new NotFound('Superhero not found');
    }

    return superhero;
  }

  async getAll(
    page: number,
    size: number,
    order: GetOrderSuperhero,
    filter: GetFilterSuperhero,
  ) {
    return await this.superheroRepository.getAll(page, size, order, filter);
  }

  async update(data: UpdateSuperhero) {
    const superhero = await this.findById(data.id);
    const gender = await this.genderRepository.findById(data.gender);
    const eyeColour = await this.colourRepository.findById(data.eyeColour);
    const hairColour = await this.colourRepository.findById(data.hairColour);
    const skinColour = await this.colourRepository.findById(data.skinColour);
    const race = await this.raceRepository.findById(data.race);
    const publisher = await this.publisherRepository.findById(data.publisher);
    const alignment = await this.alignmentRepository.findById(data.alignment);

    if (
      !gender ||
      !eyeColour ||
      !hairColour ||
      !skinColour ||
      !race ||
      !publisher ||
      !alignment
    ) {
      throw new NotFound('Some related entities were not found');
    }

    const superpowerIds = data.superpowers.map(
      (superpower) => superpower.powerId,
    );
    const superpowers =
      await this.superpowerRepository.findByIds(superpowerIds);

    if (superpowerIds.length !== superpowers.length) {
      throw new BadRequest('Some superpowers reported were not found');
    }

    return await this.superheroRepository.update({
      ...data,
      id: superhero.id,
      gender,
      eyeColour,
      hairColour,
      skinColour,
      race,
      publisher,
      alignment,
      superpowers,
    });
  }

  async delete(id: number) {
    const superhero = await this.findById(id);

    await this.superheroRepository.delete(superhero.id);
  }

  async createBattle(data: CreateSuperheroBattle) {
    const publishers = await this.publisherRepository.getPublisherByIds([
      data.publisherOne,
      data.publisherTwo,
    ]);

    if (publishers.length !== 2) {
      throw new BadRequest(
        'You need to pass two publishers to create a SuperheroBattle',
      );
    }

    return this.createPublisherBattle(publishers);
  }

  private createPublisherBattle(publishers: Publisher[]) {
    const maxAttributes: {
      [key: string]: {
        superheroName: string;
        attributeValue: number;
        publisher: string;
      };
    } = {};

    publishers.forEach((publisher) =>
      publisher.superheroes.forEach((superhero) => {
        superhero.heroAttributes.forEach((attribute) => {
          const attributeName = attribute.attribute.attributeName;
          const attributeValue = attribute.attributeValue;

          if (
            !maxAttributes[attributeName] ||
            attributeValue > maxAttributes[attributeName].attributeValue
          ) {
            maxAttributes[attributeName] = {
              superheroName: superhero.superheroName,
              attributeValue,
              publisher: publisher.publisher,
            };
          }
        });
      }),
    );

    return Object.keys(maxAttributes).map((attributeName) => {
      const { superheroName, attributeValue, publisher } =
        maxAttributes[attributeName];
      return `${superheroName} from ${publisher} has the highest ${attributeName} with ${attributeValue}`;
    });
  }
}
