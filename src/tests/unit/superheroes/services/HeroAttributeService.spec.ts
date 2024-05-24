import 'reflect-metadata';
import { container } from 'tsyringe';

import { HeroAttributeService } from '../../../../superheroes/heroAttribute/services/HeroAttributeService';
import { IHeroAttributeRepository } from '../../../../superheroes/heroAttribute/repositories/IHeroAttributeRepository';
jest.mock('../../../../shared/infra/mongo/addAudit');
jest.mock('../../../../shared/infra/mongo/addLog');

describe('HeroAttributeService', () => {
  let heroAttributeService: HeroAttributeService;
  let heroAttributeRepository: IHeroAttributeRepository;

  beforeEach(() => {
    heroAttributeRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as IHeroAttributeRepository;

    container.registerInstance(
      'HeroAttributeRepository',
      heroAttributeRepository,
    );
    heroAttributeService = container.resolve(HeroAttributeService);
  });

  it('should create a hero attribute successfully', async () => {
    (heroAttributeRepository.create as jest.Mock).mockResolvedValue({
      id: 1,
      attributeValue: 100,
      superhero: { id: 1 },
      attribute: { id: 1 },
    });

    const heroAttribute = await heroAttributeService.create({
      attributeValue: 100,
      superhero: 1,
      attribute: 1,
    });

    expect(heroAttribute).toEqual({
      id: 1,
      attributeValue: 100,
      superhero: { id: 1 },
      attribute: { id: 1 },
    });
  });

  it('should find a hero attribute by ID successfully', async () => {
    (heroAttributeRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      attributeValue: 100,
      superhero: { id: 1 },
      attribute: { id: 1 },
    });

    const heroAttribute = await heroAttributeService.findById(1);

    expect(heroAttributeRepository.findById).toHaveBeenCalledWith(1);
    expect(heroAttribute).toEqual({
      id: 1,
      attributeValue: 100,
      superhero: { id: 1 },
      attribute: { id: 1 },
    });
  });

  it('should throw a not found error when finding a non-existent hero attribute by ID', async () => {
    (heroAttributeRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(heroAttributeService.findById(1)).rejects.toMatchObject({
      message: 'NotFound any HeroAttribute with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should get all hero attributes successfully', async () => {
    (heroAttributeRepository.getAll as jest.Mock).mockResolvedValue([
      {
        id: 1,
        attributeValue: 100,
        superhero: { id: 1 },
        attribute: { id: 1 },
      },
      {
        id: 2,
        attributeValue: 200,
        superhero: { id: 2 },
        attribute: { id: 2 },
      },
    ]);

    const heroAttributes = await heroAttributeService.getAll();

    expect(heroAttributeRepository.getAll).toHaveBeenCalled();
    expect(heroAttributes).toEqual([
      {
        id: 1,
        attributeValue: 100,
        superhero: { id: 1 },
        attribute: { id: 1 },
      },
      {
        id: 2,
        attributeValue: 200,
        superhero: { id: 2 },
        attribute: { id: 2 },
      },
    ]);
  });

  it('should update a hero attribute successfully', async () => {
    (heroAttributeRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      attributeValue: 100,
      superhero: { id: 1 },
      attribute: { id: 1 },
    });
    (heroAttributeRepository.update as jest.Mock).mockResolvedValue({});

    await heroAttributeService.update({
      id: 1,
      attributeValue: 200,
      superhero: 1,
      attribute: 1,
    });

    expect(heroAttributeRepository.findById).toHaveBeenCalledWith(1);
    expect(heroAttributeRepository.update).toHaveBeenCalledWith({
      id: 1,
      attributeValue: 200,
      superhero: { id: 1 },
      attribute: { id: 1 },
    });
  });

  it('should throw a not found error when updating a non-existent hero attribute', async () => {
    (heroAttributeRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      heroAttributeService.update({
        id: 1,
        attributeValue: 200,
        superhero: 1,
        attribute: 1,
      }),
    ).rejects.toMatchObject({
      message: 'NotFound any HeroAttribute with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should delete a hero attribute successfully', async () => {
    (heroAttributeRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      attributeValue: 100,
      superhero: { id: 1 },
      attribute: { id: 1 },
    });
    (heroAttributeRepository.delete as jest.Mock).mockResolvedValue({});

    await heroAttributeService.delete(1);

    expect(heroAttributeRepository.findById).toHaveBeenCalledWith(1);
    expect(heroAttributeRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw a not found error when deleting a non-existent hero attribute', async () => {
    (heroAttributeRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(heroAttributeService.delete(1)).rejects.toMatchObject({
      message: 'NotFound any HeroAttribute with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });
});
