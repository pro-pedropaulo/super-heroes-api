import 'reflect-metadata';
import { container } from 'tsyringe';

import { SuperheroService } from '../../../../superheroes/superhero/services/SuperheroService';
import { ISuperheroRepository } from '../../../../superheroes/superhero/repositories/ISuperheroRepository';
import { IGenderRepository } from '../../../../superheroes/gender/repositories/IGenderRepository';
import { IColourRepository } from '../../../../superheroes/colour/repositories/IColourRepository';
import { IRaceRepository } from '../../../../superheroes/race/repositories/IRaceRepository';
import { IPublisherRepository } from '../../../../superheroes/publisher/repositories/IPublisherRepository';
import { IAlignmentRepository } from '../../../../superheroes/alignment/repositories/IAlignmentRepository';
import { ISuperpowerRepository } from '../../../../superheroes/superpower/repositories/ISuperpowerRepository';
jest.mock('../../../../shared/infra/mongo/addAudit');
jest.mock('../../../../shared/infra/mongo/addLog');

describe('SuperheroService', () => {
  let superheroService: SuperheroService;
  let superheroRepository: ISuperheroRepository;
  let genderRepository: IGenderRepository;
  let colourRepository: IColourRepository;
  let raceRepository: IRaceRepository;
  let publisherRepository: IPublisherRepository;
  let alignmentRepository: IAlignmentRepository;
  let superpowerRepository: ISuperpowerRepository;

  beforeEach(() => {
    superheroRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as ISuperheroRepository;

    genderRepository = {
      findById: jest.fn(),
    } as unknown as IGenderRepository;

    colourRepository = {
      findById: jest.fn(),
    } as unknown as IColourRepository;

    raceRepository = {
      findById: jest.fn(),
    } as unknown as IRaceRepository;

    publisherRepository = {
      findById: jest.fn(),
      getPublisherByIds: jest.fn(),
    } as unknown as IPublisherRepository;

    alignmentRepository = {
      findById: jest.fn(),
    } as unknown as IAlignmentRepository;

    superpowerRepository = {
      findById: jest.fn(),
      findByIds: jest.fn(),
    } as unknown as ISuperpowerRepository;

    container.registerInstance('SuperheroRepository', superheroRepository);
    container.registerInstance('GenderRepository', genderRepository);
    container.registerInstance('ColourRepository', colourRepository);
    container.registerInstance('RaceRepository', raceRepository);
    container.registerInstance('PublisherRepository', publisherRepository);
    container.registerInstance('AlignmentRepository', alignmentRepository);
    container.registerInstance('SuperpowerRepository', superpowerRepository);

    superheroService = container.resolve(SuperheroService);
  });

  it('should create a superhero successfully', async () => {
    (genderRepository.findById as jest.Mock).mockResolvedValue({});
    (colourRepository.findById as jest.Mock).mockResolvedValue({});
    (raceRepository.findById as jest.Mock).mockResolvedValue({});
    (publisherRepository.findById as jest.Mock).mockResolvedValue({});
    (alignmentRepository.findById as jest.Mock).mockResolvedValue({});
    (superpowerRepository.findByIds as jest.Mock).mockResolvedValue([{}, {}]);
    (superheroRepository.create as jest.Mock).mockResolvedValue({
      id: 1,
      superheroName: 'SuperheroName',
    });

    const superhero = await superheroService.create({
      superheroName: 'SuperheroName',
      fullName: 'FullName',
      heightCm: 180,
      weightKg: 80,
      gender: 1,
      eyeColour: 1,
      hairColour: 2,
      skinColour: 3,
      race: 1,
      publisher: 1,
      alignment: 1,
      superpowers: [{ powerId: 1 }, { powerId: 2 }],
    });

    expect(superhero).toEqual({
      id: 1,
      superheroName: 'SuperheroName',
    });
  });

  it('should find a superhero by ID successfully', async () => {
    (superheroRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      superheroName: 'SuperheroName',
    });

    const superhero = await superheroService.findById(1);

    expect(superheroRepository.findById).toHaveBeenCalledWith(1);
    expect(superhero).toEqual({
      id: 1,
      superheroName: 'SuperheroName',
    });
  });

  it('should throw a not found error when finding a non-existent superhero by ID', async () => {
    (superheroRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(superheroService.findById(1)).rejects.toMatchObject({
      message: 'Superhero not found',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should get all superheroes successfully', async () => {
    (superheroRepository.getAll as jest.Mock).mockResolvedValue({
      content: [
        {
          id: 1,
          superheroName: 'SuperheroName1',
        },
        {
          id: 2,
          superheroName: 'SuperheroName2',
        },
      ],
    });

    const superheroes = await superheroService.getAll(1, 30, {}, {});

    expect(superheroRepository.getAll).toHaveBeenCalled();
    expect(superheroes.content).toEqual([
      {
        id: 1,
        superheroName: 'SuperheroName1',
      },
      {
        id: 2,
        superheroName: 'SuperheroName2',
      },
    ]);
  });

  it('should update a superhero successfully', async () => {
    (superheroRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      superheroName: 'SuperheroName',
    });
    (genderRepository.findById as jest.Mock).mockResolvedValue({});
    (colourRepository.findById as jest.Mock).mockResolvedValue({});
    (raceRepository.findById as jest.Mock).mockResolvedValue({});
    (publisherRepository.findById as jest.Mock).mockResolvedValue({});
    (alignmentRepository.findById as jest.Mock).mockResolvedValue({});
    (superpowerRepository.findByIds as jest.Mock).mockResolvedValue([{}, {}]);
    (superheroRepository.update as jest.Mock).mockResolvedValue({});

    await superheroService.update({
      id: 1,
      superheroName: 'UpdatedSuperheroName',
      fullName: 'UpdatedFullName',
      heightCm: 190,
      weightKg: 85,
      gender: 1,
      eyeColour: 1,
      hairColour: 2,
      skinColour: 3,
      race: 1,
      publisher: 1,
      alignment: 1,
      superpowers: [{ powerId: 1 }, { powerId: 2 }],
    });

    expect(superheroRepository.findById).toHaveBeenCalledWith(1);
    expect(superheroRepository.update).toHaveBeenCalledWith({
      id: 1,
      superheroName: 'UpdatedSuperheroName',
      fullName: 'UpdatedFullName',
      heightCm: 190,
      weightKg: 85,
      gender: {},
      eyeColour: {},
      hairColour: {},
      skinColour: {},
      race: {},
      publisher: {},
      alignment: {},
      superpowers: [{}, {}],
    });
  });

  it('should throw a not found error when updating a non-existent superhero', async () => {
    (superheroRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      superheroService.update({
        id: 1,
        superheroName: 'UpdatedSuperheroName',
        fullName: 'UpdatedFullName',
        heightCm: 190,
        weightKg: 85,
        gender: 1,
        eyeColour: 1,
        hairColour: 2,
        skinColour: 3,
        race: 1,
        publisher: 1,
        alignment: 1,
        superpowers: [{ powerId: 1 }, { powerId: 2 }],
      }),
    ).rejects.toMatchObject({
      message: 'Superhero not found',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should delete a superhero successfully', async () => {
    (superheroRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      superheroName: 'SuperheroName',
    });
    (superheroRepository.delete as jest.Mock).mockResolvedValue({});

    await superheroService.delete(1);

    expect(superheroRepository.findById).toHaveBeenCalledWith(1);
    expect(superheroRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw a not found error when deleting a non-existent superhero', async () => {
    (superheroRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(superheroService.delete(1)).rejects.toMatchObject({
      message: 'Superhero not found',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should create a battle between superheroes successfully', async () => {
    (publisherRepository.getPublisherByIds as jest.Mock).mockResolvedValue([
      {
        id: 1,
        publisher: 'PublisherOne',
        superheroes: [
          {
            id: 1,
            superheroName: 'SuperheroOne',
            heroAttributes: [
              {
                attribute: {
                  attributeName: 'Strength',
                },
                attributeValue: 100,
              },
            ],
          },
        ],
      },
      {
        id: 2,
        publisher: 'PublisherTwo',
        superheroes: [
          {
            id: 2,
            superheroName: 'SuperheroTwo',
            heroAttributes: [
              {
                attribute: {
                  attributeName: 'Strength',
                },
                attributeValue: 90,
              },
            ],
          },
        ],
      },
    ]);

    const battle = await superheroService.createBattle({
      publisherOne: 1,
      publisherTwo: 2,
      attribute: 'Strength',
    });

    expect(battle).toEqual({
      battleResults: [
        {
          heroOne: 'SuperheroOne',
          heroTwo: 'SuperheroTwo',
          results: [
            {
              attribute: 'Strength',
              heroOneValue: 100,
              heroTwoValue: 90,
              winner: 'SuperheroOne',
            },
          ],
          winner: 'SuperheroOne',
          winnerDetails:
            'Hero SuperheroOne won in attributes: Strength. Hero SuperheroTwo did not win any attributes.',
          heroOnePublisher: 'PublisherOne',
          heroTwoPublisher: 'PublisherTwo',
        },
      ],
      overallWinner:
        'Overall winner is PublisherOne. PublisherOne has 1 wins, and PublisherTwo has 0 wins.',
    });
  });

  it('should throw a bad request error when creating a battle with non-existent publishers', async () => {
    (publisherRepository.getPublisherByIds as jest.Mock).mockResolvedValue([
      {
        id: 1,
        publisher: 'PublisherOne',
      },
    ]);

    await expect(
      superheroService.createBattle({
        publisherOne: 1,
        publisherTwo: 2,
        attribute: 'Strength',
      }),
    ).rejects.toMatchObject({
      message: 'You need to pass two publishers to create a SuperheroBattle',
      statusCode: 400,
      status: 'Bad Request',
    });
  });
});
