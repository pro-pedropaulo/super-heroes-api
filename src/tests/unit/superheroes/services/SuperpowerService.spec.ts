import 'reflect-metadata';
import { container } from 'tsyringe';

import { SuperpowerService } from '../../../../superheroes/superpower/services/SuperpowerService';
import { ISuperpowerRepository } from '../../../../superheroes/superpower/repositories/ISuperpowerRepository';
jest.mock('../../../../shared/infra/mongo/addAudit');
jest.mock('../../../../shared/infra/mongo/addLog');

describe('SuperpowerService', () => {
  let superpowerService: SuperpowerService;
  let superpowerRepository: ISuperpowerRepository;

  beforeEach(() => {
    superpowerRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByIds: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as ISuperpowerRepository;

    container.registerInstance('SuperpowerRepository', superpowerRepository);
    superpowerService = container.resolve(SuperpowerService);
  });

  it('should create a superpower successfully', async () => {
    (superpowerRepository.create as jest.Mock).mockResolvedValue({
      id: 1,
      powerName: 'SuperpowerName',
    });

    const superpower = await superpowerService.create({
      powerName: 'SuperpowerName',
    });

    expect(superpower).toEqual({
      id: 1,
      powerName: 'SuperpowerName',
    });
  });

  it('should find a superpower by ID successfully', async () => {
    (superpowerRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      powerName: 'SuperpowerName',
    });

    const superpower = await superpowerService.findById(1);

    expect(superpowerRepository.findById).toHaveBeenCalledWith(1);
    expect(superpower).toEqual({
      id: 1,
      powerName: 'SuperpowerName',
    });
  });

  it('should throw a not found error when finding a non-existent superpower by ID', async () => {
    (superpowerRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(superpowerService.findById(1)).rejects.toMatchObject({
      message: 'NotFound any Superpower with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should get all superpowers successfully', async () => {
    (superpowerRepository.getAll as jest.Mock).mockResolvedValue([
      {
        id: 1,
        powerName: 'SuperpowerName1',
      },
      {
        id: 2,
        powerName: 'SuperpowerName2',
      },
    ]);

    const superpowers = await superpowerService.getAll();

    expect(superpowerRepository.getAll).toHaveBeenCalled();
    expect(superpowers).toEqual([
      {
        id: 1,
        powerName: 'SuperpowerName1',
      },
      {
        id: 2,
        powerName: 'SuperpowerName2',
      },
    ]);
  });

  it('should update a superpower successfully', async () => {
    (superpowerRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      powerName: 'SuperpowerName',
    });
    (superpowerRepository.update as jest.Mock).mockResolvedValue({});

    await superpowerService.update({
      id: 1,
      powerName: 'UpdatedSuperpowerName',
    });

    expect(superpowerRepository.findById).toHaveBeenCalledWith(1);
    expect(superpowerRepository.update).toHaveBeenCalledWith({
      id: 1,
      powerName: 'UpdatedSuperpowerName',
    });
  });

  it('should throw a not found error when updating a non-existent superpower', async () => {
    (superpowerRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      superpowerService.update({
        id: 1,
        powerName: 'UpdatedSuperpowerName',
      }),
    ).rejects.toMatchObject({
      message: 'NotFound any Superpower with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should delete a superpower successfully', async () => {
    (superpowerRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      powerName: 'SuperpowerName',
    });
    (superpowerRepository.delete as jest.Mock).mockResolvedValue({});

    await superpowerService.delete(1);

    expect(superpowerRepository.findById).toHaveBeenCalledWith(1);
    expect(superpowerRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw a not found error when deleting a non-existent superpower', async () => {
    (superpowerRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(superpowerService.delete(1)).rejects.toMatchObject({
      message: 'NotFound any Superpower with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });
});
