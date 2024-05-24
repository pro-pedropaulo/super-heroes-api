/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Superhero } from '../entities/Superhero';
import { HeroAttribute } from '../../heroAttribute/entities/HeroAttribute';

interface BattleResult {
  heroOne: string;
  heroTwo: string;
  results: AttributeComparison[];
  winner: string;
  winnerDetails: string;
  heroOnePublisher: string;
  heroTwoPublisher: string;
}

interface AttributeComparison {
  attribute: string;
  heroOneValue: number;
  heroTwoValue: number;
  winner: string;
}

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

    const heroesPublisherOne = publishers[0].superheroes;
    const heroesPublisherTwo = publishers[1].superheroes;

    const battleResults = this.createPublisherBattle(
      publishers,
      data.attribute,
      heroesPublisherOne,
      heroesPublisherTwo,
    );

    const publisherWinCounts = this.calculatePublisherWins(battleResults);

    const overallWinner =
      this.determineOverallPublisherWinner(publisherWinCounts);

    return {
      battleResults,
      overallWinner: `Overall winner is ${overallWinner.winner}. ${publishers[0].publisher} has ${publisherWinCounts[publishers[0].publisher]} wins, and ${publishers[1].publisher} has ${publisherWinCounts[publishers[1].publisher]} wins.`,
    };
  }

  private createPublisherBattle(
    publishers: Publisher[],
    attribute?: string,
    heroesPublisherOne?: Superhero[],
    heroesPublisherTwo?: Superhero[],
  ): BattleResult[] {
    const results: BattleResult[] = [];

    (heroesPublisherOne || publishers[0].superheroes).forEach(
      (heroOne: Superhero) => {
        (heroesPublisherTwo || publishers[1].superheroes).forEach(
          (heroTwo: Superhero) => {
            const result = this.compareHeroes(
              heroOne,
              heroTwo,
              publishers[0].publisher,
              publishers[1].publisher,
              attribute,
            );
            results.push(result);
          },
        );
      },
    );

    return results;
  }

  private compareHeroes(
    heroOne: Superhero,
    heroTwo: Superhero,
    publisherOne: string,
    publisherTwo: string,
    attribute?: string,
  ): BattleResult {
    const attributes = attribute
      ? [attribute]
      : ['Combat', 'Durability', 'Intelligence', 'Power', 'Speed', 'Strength'];
    const result: BattleResult = {
      heroOne: heroOne.superheroName,
      heroTwo: heroTwo.superheroName,
      results: [],
      winner: '',
      winnerDetails: '',
      heroOnePublisher: publisherOne,
      heroTwoPublisher: publisherTwo,
    };

    attributes.forEach((attribute) => {
      const heroOneValue =
        heroOne.heroAttributes.find(
          (attr: HeroAttribute) => attr.attribute.attributeName === attribute,
        )?.attributeValue || 0;
      const heroTwoValue =
        heroTwo.heroAttributes.find(
          (attr: HeroAttribute) => attr.attribute.attributeName === attribute,
        )?.attributeValue || 0;
      const winner =
        heroOneValue > heroTwoValue
          ? heroOne.superheroName
          : heroTwo.superheroName;
      result.results.push({ attribute, heroOneValue, heroTwoValue, winner });
    });

    const heroOneWins = result.results
      .filter((r) => r.winner === heroOne.superheroName)
      .map((r) => r.attribute);
    const heroTwoWins = result.results
      .filter((r) => r.winner === heroTwo.superheroName)
      .map((r) => r.attribute);

    result.winnerDetails =
      heroOneWins.length === 0
        ? `Hero ${heroOne.superheroName} did not win any attributes.`
        : `Hero ${heroOne.superheroName} won in attributes: ${heroOneWins.join(', ')}.`;

    result.winnerDetails +=
      heroTwoWins.length === 0
        ? ` Hero ${heroTwo.superheroName} did not win any attributes.`
        : ` Hero ${heroTwo.superheroName} won in attributes: ${heroTwoWins.join(', ')}.`;

    result.winner = this.calculateOverallWinner(
      result.results,
      result.heroOne,
      result.heroTwo,
    );
    return result;
  }

  private calculateOverallWinner(
    results: AttributeComparison[],
    heroOne: string,
    heroTwo: string,
  ): string {
    const heroOneWins = results.filter((r) => r.winner === heroOne).length;
    const heroTwoWins = results.filter((r) => r.winner === heroTwo).length;
    return heroOneWins > heroTwoWins ? heroOne : heroTwo;
  }

  private calculatePublisherWins(results: BattleResult[]): {
    [publisher: string]: number;
  } {
    const publisherWinCounts: { [publisher: string]: number } = {};

    results.forEach((result) => {
      const winnerPublisher =
        result.winner === result.heroOne
          ? result.heroOnePublisher
          : result.heroTwoPublisher;
      if (winnerPublisher in publisherWinCounts) {
        publisherWinCounts[winnerPublisher]++;
      } else {
        publisherWinCounts[winnerPublisher] = 1;
      }
    });

    return {
      [results[0].heroOnePublisher]:
        publisherWinCounts[results[0].heroOnePublisher] || 0,
      [results[0].heroTwoPublisher]:
        publisherWinCounts[results[0].heroTwoPublisher] || 0,
    };
  }

  private determineOverallPublisherWinner(publisherWinCounts: {
    [publisher: string]: number;
  }): { winner: string } {
    const publishers = Object.keys(publisherWinCounts);
    if (publishers.length === 0) {
      return { winner: 'No winners' };
    }

    const winner =
      publisherWinCounts[publishers[0]] >=
      (publisherWinCounts[publishers[1]] || 0)
        ? publishers[0]
        : publishers[1];

    return { winner };
  }
}
