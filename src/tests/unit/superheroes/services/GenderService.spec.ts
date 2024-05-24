import 'reflect-metadata';
import { container } from 'tsyringe';

import { GenderService } from '../../../../superheroes/gender/services/GenderService';
import { IGenderRepository } from '../../../../superheroes/gender/repositories/IGenderRepository';
jest.mock('../../../../shared/infra/mongo/addAudit');
jest.mock('../../../../shared/infra/mongo/addLog');

describe('GenderService', () => {
  let genderService: GenderService;
  let genderRepository: IGenderRepository;

  beforeEach(() => {
    genderRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as IGenderRepository;

    container.registerInstance('GenderRepository', genderRepository);
    genderService = container.resolve(GenderService);
  });

  it('should create a gender successfully', async () => {
    (genderRepository.create as jest.Mock).mockResolvedValue({
      id: 1,
      gender: 'GenderName',
    });

    const gender = await genderService.create({
      gender: 'GenderName',
    });

    expect(gender).toEqual({
      id: 1,
      gender: 'GenderName',
    });
  });

  it('should find a gender by ID successfully', async () => {
    (genderRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      gender: 'GenderName',
    });

    const gender = await genderService.findById(1);

    expect(genderRepository.findById).toHaveBeenCalledWith(1);
    expect(gender).toEqual({
      id: 1,
      gender: 'GenderName',
    });
  });

  it('should throw a not found error when finding a non-existent gender by ID', async () => {
    (genderRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(genderService.findById(1)).rejects.toMatchObject({
      message: 'NotFound any Gender with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should get all genders successfully', async () => {
    (genderRepository.getAll as jest.Mock).mockResolvedValue([
      {
        id: 1,
        gender: 'GenderName1',
      },
      {
        id: 2,
        gender: 'GenderName2',
      },
    ]);

    const genders = await genderService.getAll();

    expect(genderRepository.getAll).toHaveBeenCalled();
    expect(genders).toEqual([
      {
        id: 1,
        gender: 'GenderName1',
      },
      {
        id: 2,
        gender: 'GenderName2',
      },
    ]);
  });

  it('should update a gender successfully', async () => {
    (genderRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      gender: 'GenderName',
    });
    (genderRepository.update as jest.Mock).mockResolvedValue({});

    await genderService.update({ id: 1, gender: 'UpdatedGenderName' });

    expect(genderRepository.findById).toHaveBeenCalledWith(1);
    expect(genderRepository.update).toHaveBeenCalledWith({
      id: 1,
      gender: 'UpdatedGenderName',
    });
  });

  it('should throw a not found error when updating a non-existent gender', async () => {
    (genderRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      genderService.update({ id: 1, gender: 'UpdatedGenderName' }),
    ).rejects.toMatchObject({
      message: 'NotFound any Gender with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should delete a gender successfully', async () => {
    (genderRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      gender: 'GenderName',
    });
    (genderRepository.delete as jest.Mock).mockResolvedValue({});

    await genderService.delete(1);

    expect(genderRepository.findById).toHaveBeenCalledWith(1);
    expect(genderRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw a not found error when deleting a non-existent gender', async () => {
    (genderRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(genderService.delete(1)).rejects.toMatchObject({
      message: 'NotFound any Gender with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });
});
