import 'reflect-metadata';
import { container } from 'tsyringe';

import { PublisherService } from '../../../../superheroes/publisher/services/PublisherService';
import { IPublisherRepository } from '../../../../superheroes/publisher/repositories/IPublisherRepository';
jest.mock('../../../../shared/infra/mongo/addAudit');
jest.mock('../../../../shared/infra/mongo/addLog');

describe('PublisherService', () => {
  let publisherService: PublisherService;
  let publisherRepository: IPublisherRepository;

  beforeEach(() => {
    publisherRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      getPublisherByIds: jest.fn(),
    } as unknown as IPublisherRepository;

    container.registerInstance('PublisherRepository', publisherRepository);
    publisherService = container.resolve(PublisherService);
  });

  it('should create a publisher successfully', async () => {
    (publisherRepository.create as jest.Mock).mockResolvedValue({
      id: 1,
      publisher: 'PublisherName',
    });

    const publisher = await publisherService.create({
      publisher: 'PublisherName',
    });

    expect(publisher).toEqual({
      id: 1,
      publisher: 'PublisherName',
    });
  });

  it('should find a publisher by ID successfully', async () => {
    (publisherRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      publisher: 'PublisherName',
    });

    const publisher = await publisherService.findById(1);

    expect(publisherRepository.findById).toHaveBeenCalledWith(1);
    expect(publisher).toEqual({
      id: 1,
      publisher: 'PublisherName',
    });
  });

  it('should throw a not found error when finding a non-existent publisher by ID', async () => {
    (publisherRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(publisherService.findById(1)).rejects.toMatchObject({
      message: 'NotFound any Publisher with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should get all publishers successfully', async () => {
    (publisherRepository.getAll as jest.Mock).mockResolvedValue([
      {
        id: 1,
        publisher: 'PublisherName1',
      },
      {
        id: 2,
        publisher: 'PublisherName2',
      },
    ]);

    const publishers = await publisherService.getAll();

    expect(publisherRepository.getAll).toHaveBeenCalled();
    expect(publishers).toEqual([
      {
        id: 1,
        publisher: 'PublisherName1',
      },
      {
        id: 2,
        publisher: 'PublisherName2',
      },
    ]);
  });

  it('should update a publisher successfully', async () => {
    (publisherRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      publisher: 'PublisherName',
    });
    (publisherRepository.update as jest.Mock).mockResolvedValue({});

    await publisherService.update({
      id: 1,
      publisher: 'UpdatedPublisherName',
    });

    expect(publisherRepository.findById).toHaveBeenCalledWith(1);
    expect(publisherRepository.update).toHaveBeenCalledWith({
      id: 1,
      publisher: 'UpdatedPublisherName',
    });
  });

  it('should throw a not found error when updating a non-existent publisher', async () => {
    (publisherRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      publisherService.update({
        id: 1,
        publisher: 'UpdatedPublisherName',
      }),
    ).rejects.toMatchObject({
      message: 'NotFound any Publisher with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should delete a publisher successfully', async () => {
    (publisherRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      publisher: 'PublisherName',
    });
    (publisherRepository.delete as jest.Mock).mockResolvedValue({});

    await publisherService.delete(1);

    expect(publisherRepository.findById).toHaveBeenCalledWith(1);
    expect(publisherRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw a not found error when deleting a non-existent publisher', async () => {
    (publisherRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(publisherService.delete(1)).rejects.toMatchObject({
      message: 'NotFound any Publisher with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });
});
