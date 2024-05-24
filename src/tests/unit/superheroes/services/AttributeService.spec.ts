import 'reflect-metadata';
import { container } from 'tsyringe';

import { AttributeService } from '../../../../superheroes/attribute/services/AttributeService';
import { IAttributeRepository } from '../../../../superheroes/attribute/repositories/IAttributeRepository';
jest.mock('../../../../shared/infra/mongo/addAudit');
jest.mock('../../../../shared/infra/mongo/addLog');

describe('AttributeService', () => {
  let attributeService: AttributeService;
  let attributeRepository: IAttributeRepository;

  beforeEach(() => {
    attributeRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as IAttributeRepository;

    container.registerInstance('AttributeRepository', attributeRepository);
    attributeService = container.resolve(AttributeService);
  });

  it('should create an attribute successfully', async () => {
    (attributeRepository.create as jest.Mock).mockResolvedValue({
      id: 1,
      attributeName: 'AttributeName',
    });

    const attribute = await attributeService.create({
      attributeName: 'AttributeName',
    });

    expect(attribute).toEqual({
      id: 1,
      attributeName: 'AttributeName',
    });
  });

  it('should find an attribute by ID successfully', async () => {
    (attributeRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      attributeName: 'AttributeName',
    });

    const attribute = await attributeService.findById(1);

    expect(attributeRepository.findById).toHaveBeenCalledWith(1);
    expect(attribute).toEqual({
      id: 1,
      attributeName: 'AttributeName',
    });
  });

  it('should throw a not found error when finding a non-existent attribute by ID', async () => {
    (attributeRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(attributeService.findById(1)).rejects.toMatchObject({
      message: 'NotFound any Attribute with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should get all attributes successfully', async () => {
    (attributeRepository.getAll as jest.Mock).mockResolvedValue([
      {
        id: 1,
        attributeName: 'AttributeName1',
      },
      {
        id: 2,
        attributeName: 'AttributeName2',
      },
    ]);

    const attributes = await attributeService.getAll();

    expect(attributeRepository.getAll).toHaveBeenCalled();
    expect(attributes).toEqual([
      {
        id: 1,
        attributeName: 'AttributeName1',
      },
      {
        id: 2,
        attributeName: 'AttributeName2',
      },
    ]);
  });

  it('should update an attribute successfully', async () => {
    (attributeRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      attributeName: 'AttributeName',
    });
    (attributeRepository.update as jest.Mock).mockResolvedValue({});

    await attributeService.update({
      id: 1,
      attributeName: 'UpdatedAttributeName',
    });

    expect(attributeRepository.findById).toHaveBeenCalledWith(1);
    expect(attributeRepository.update).toHaveBeenCalledWith({
      id: 1,
      attributeName: 'UpdatedAttributeName',
    });
  });

  it('should throw a not found error when updating a non-existent attribute', async () => {
    (attributeRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      attributeService.update({ id: 1, attributeName: 'UpdatedAttributeName' }),
    ).rejects.toMatchObject({
      message: 'NotFound any Attribute with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should delete an attribute successfully', async () => {
    (attributeRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      attributeName: 'AttributeName',
    });
    (attributeRepository.delete as jest.Mock).mockResolvedValue({});

    await attributeService.delete(1);

    expect(attributeRepository.findById).toHaveBeenCalledWith(1);
    expect(attributeRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw a not found error when deleting a non-existent attribute', async () => {
    (attributeRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(attributeService.delete(1)).rejects.toMatchObject({
      message: 'NotFound any Attribute with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });
});
