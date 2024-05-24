import 'reflect-metadata';
import { container } from 'tsyringe';

import { RaceService } from '../../../../superheroes/race/services/RaceService';
import { IRaceRepository } from '../../../../superheroes/race/repositories/IRaceRepository';
jest.mock('../../../../shared/infra/mongo/addAudit');
jest.mock('../../../../shared/infra/mongo/addLog');

describe('RaceService', () => {
  let raceService: RaceService;
  let raceRepository: IRaceRepository;

  beforeEach(() => {
    raceRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as IRaceRepository;

    container.registerInstance('RaceRepository', raceRepository);
    raceService = container.resolve(RaceService);
  });

  it('should create a race successfully', async () => {
    (raceRepository.create as jest.Mock).mockResolvedValue({
      id: 1,
      race: 'RaceName',
    });

    const race = await raceService.create({
      race: 'RaceName',
    });

    expect(race).toEqual({
      id: 1,
      race: 'RaceName',
    });
  });

  it('should find a race by ID successfully', async () => {
    (raceRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      race: 'RaceName',
    });

    const race = await raceService.findById(1);

    expect(raceRepository.findById).toHaveBeenCalledWith(1);
    expect(race).toEqual({
      id: 1,
      race: 'RaceName',
    });
  });

  it('should throw a not found error when finding a non-existent race by ID', async () => {
    (raceRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(raceService.findById(1)).rejects.toMatchObject({
      message: 'NotFound any Race with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should get all races successfully', async () => {
    (raceRepository.getAll as jest.Mock).mockResolvedValue([
      {
        id: 1,
        race: 'RaceName1',
      },
      {
        id: 2,
        race: 'RaceName2',
      },
    ]);

    const races = await raceService.getAll();

    expect(raceRepository.getAll).toHaveBeenCalled();
    expect(races).toEqual([
      {
        id: 1,
        race: 'RaceName1',
      },
      {
        id: 2,
        race: 'RaceName2',
      },
    ]);
  });

  it('should update a race successfully', async () => {
    (raceRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      race: 'RaceName',
    });
    (raceRepository.update as jest.Mock).mockResolvedValue({});

    await raceService.update({
      id: 1,
      race: 'UpdatedRaceName',
    });

    expect(raceRepository.findById).toHaveBeenCalledWith(1);
    expect(raceRepository.update).toHaveBeenCalledWith({
      id: 1,
      race: 'UpdatedRaceName',
    });
  });

  it('should throw a not found error when updating a non-existent race', async () => {
    (raceRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      raceService.update({
        id: 1,
        race: 'UpdatedRaceName',
      }),
    ).rejects.toMatchObject({
      message: 'NotFound any Race with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should delete a race successfully', async () => {
    (raceRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      race: 'RaceName',
    });
    (raceRepository.delete as jest.Mock).mockResolvedValue({});

    await raceService.delete(1);

    expect(raceRepository.findById).toHaveBeenCalledWith(1);
    expect(raceRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw a not found error when deleting a non-existent race', async () => {
    (raceRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(raceService.delete(1)).rejects.toMatchObject({
      message: 'NotFound any Race with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });
});
