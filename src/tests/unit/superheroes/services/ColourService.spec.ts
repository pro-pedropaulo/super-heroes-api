import 'reflect-metadata';
import { container } from 'tsyringe';

import { ColourService } from '../../../../superheroes/colour/services/ColourService';
import { IColourRepository } from '../../../../superheroes/colour/repositories/IColourRepository';
jest.mock('../../../../shared/infra/mongo/addAudit');
jest.mock('../../../../shared/infra/mongo/addLog');

describe('ColourService', () => {
  let colourService: ColourService;
  let colourRepository: IColourRepository;

  beforeEach(() => {
    colourRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as IColourRepository;

    container.registerInstance('ColourRepository', colourRepository);
    colourService = container.resolve(ColourService);
  });

  it('should create a colour successfully', async () => {
    (colourRepository.create as jest.Mock).mockResolvedValue({
      id: 1,
      colour: 'ColourName',
    });

    const colour = await colourService.create({
      colour: 'ColourName',
    });

    expect(colour).toEqual({
      id: 1,
      colour: 'ColourName',
    });
  });

  it('should find a colour by ID successfully', async () => {
    (colourRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      colour: 'ColourName',
    });

    const colour = await colourService.findById(1);

    expect(colourRepository.findById).toHaveBeenCalledWith(1);
    expect(colour).toEqual({
      id: 1,
      colour: 'ColourName',
    });
  });

  it('should throw a not found error when finding a non-existent colour by ID', async () => {
    (colourRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(colourService.findById(1)).rejects.toMatchObject({
      message: 'NotFound any Colour with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should get all colours successfully', async () => {
    (colourRepository.getAll as jest.Mock).mockResolvedValue([
      {
        id: 1,
        colour: 'ColourName1',
      },
      {
        id: 2,
        colour: 'ColourName2',
      },
    ]);

    const colours = await colourService.getAll();

    expect(colourRepository.getAll).toHaveBeenCalled();
    expect(colours).toEqual([
      {
        id: 1,
        colour: 'ColourName1',
      },
      {
        id: 2,
        colour: 'ColourName2',
      },
    ]);
  });

  it('should update a colour successfully', async () => {
    (colourRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      colour: 'ColourName',
    });
    (colourRepository.update as jest.Mock).mockResolvedValue({});

    await colourService.update({ id: 1, colour: 'UpdatedColourName' });

    expect(colourRepository.findById).toHaveBeenCalledWith(1);
    expect(colourRepository.update).toHaveBeenCalledWith({
      id: 1,
      colour: 'UpdatedColourName',
    });
  });

  it('should throw a not found error when updating a non-existent colour', async () => {
    (colourRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      colourService.update({ id: 1, colour: 'UpdatedColourName' }),
    ).rejects.toMatchObject({
      message: 'NotFound any Colour with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should delete a colour successfully', async () => {
    (colourRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      colour: 'ColourName',
    });
    (colourRepository.delete as jest.Mock).mockResolvedValue({});

    await colourService.delete(1);

    expect(colourRepository.findById).toHaveBeenCalledWith(1);
    expect(colourRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw a not found error when deleting a non-existent colour', async () => {
    (colourRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(colourService.delete(1)).rejects.toMatchObject({
      message: 'NotFound any Colour with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });
});
