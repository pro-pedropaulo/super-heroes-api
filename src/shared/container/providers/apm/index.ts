import { container } from 'tsyringe';

import { IUserRepository } from '../../../../users/repositories/IUserRepository';
import { UserRepository } from '../../../../users/repositories/UserRepository';
import { IAttributeRepository } from '../../../../superheroes/attribute/repositories/IAttributeRepository';
import { AttributeRepository } from '../../../../superheroes/attribute/repositories/AttributeRepository';
import { ISuperpowerRepository } from '../../../../superheroes/superpower/repositories/ISuperpowerRepository';
import { SuperpowerRepository } from '../../../../superheroes/superpower/repositories/SuperpowerRepository';
import { IAlignmentRepository } from '../../../../superheroes/alignment/repositories/IAlignmentRepository';
import { AlignmentRepository } from '../../../../superheroes/alignment/repositories/AlignmentRepository';
import { IGenderRepository } from '../../../../superheroes/gender/repositories/IGenderRepository';
import { GenderRepository } from '../../../../superheroes/gender/repositories/GenderRepository';
import { IColourRepository } from '../../../../superheroes/colour/repositories/IColourRepository';
import { ColourRepository } from '../../../../superheroes/colour/repositories/ColourRepository';
import { IRaceRepository } from '../../../../superheroes/race/repositories/IRaceRepository';
import { RaceRepository } from '../../../../superheroes/race/repositories/RaceRepository';
import { IPublisherRepository } from '../../../../superheroes/publisher/repositories/IPublisherRepository';
import { PublisherRepository } from '../../../../superheroes/publisher/repositories/PublisherRepository';
import { IHeroAttributeRepository } from '../../../../superheroes/heroAttribute/repositories/IHeroAttributeRepository';
import { HeroAttributeRepository } from '../../../../superheroes/heroAttribute/repositories/HeroAttributeRepository';
import { ISuperheroRepository } from '../../../../superheroes/superhero/repositories/ISuperheroRepository';
import { SuperheroRepository } from '../../../../superheroes/superhero/repositories/SuperheroRepository';

container.register<IUserRepository>('UserRepository', UserRepository);
container.register<IAttributeRepository>(
  'AttributeRepository',
  AttributeRepository,
);
container.register<ISuperpowerRepository>(
  'SuperpowerRepository',
  SuperpowerRepository,
);
container.register<IAlignmentRepository>(
  'AlignmentRepository',
  AlignmentRepository,
);
container.register<IGenderRepository>('GenderRepository', GenderRepository);
container.register<IColourRepository>('ColourRepository', ColourRepository);
container.register<IRaceRepository>('RaceRepository', RaceRepository);
container.register<IPublisherRepository>(
  'PublisherRepository',
  PublisherRepository,
);
container.register<IHeroAttributeRepository>(
  'HeroAttributeRepository',
  HeroAttributeRepository,
);
container.register<ISuperheroRepository>(
  'SuperheroRepository',
  SuperheroRepository,
);
