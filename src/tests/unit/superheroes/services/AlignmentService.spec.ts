import 'reflect-metadata';
import { container } from 'tsyringe';

import { AlignmentService } from '../../../../superheroes/alignment/services/alignmentService';
import { IAlignmentRepository } from '../../../../superheroes/alignment/repositories/IAlignmentRepository';
jest.mock('../../../../shared/infra/mongo/addAudit');
jest.mock('../../../../shared/infra/mongo/addLog');

describe('AlignmentService', () => {
  let alignmentService: AlignmentService;
  let alignmentRepository: IAlignmentRepository;

  beforeEach(() => {
    alignmentRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      getAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as IAlignmentRepository;

    container.registerInstance('AlignmentRepository', alignmentRepository);
    alignmentService = container.resolve(AlignmentService);
  });

  it('should create an alignment successfully', async () => {
    (alignmentRepository.create as jest.Mock).mockResolvedValue({
      id: 1,
      alignment: 'AlignmentName',
    });

    const alignment = await alignmentService.create({
      alignment: 'AlignmentName',
    });

    expect(alignment).toEqual({
      id: 1,
      alignment: 'AlignmentName',
    });
  });

  it('should find an alignment by ID successfully', async () => {
    (alignmentRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      alignment: 'AlignmentName',
    });

    const alignment = await alignmentService.findById(1);

    expect(alignmentRepository.findById).toHaveBeenCalledWith(1);
    expect(alignment).toEqual({
      id: 1,
      alignment: 'AlignmentName',
    });
  });

  it('should throw a not found error when finding a non-existent alignment by ID', async () => {
    (alignmentRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(alignmentService.findById(1)).rejects.toMatchObject({
      message: 'NotFound any Alignment with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should get all alignments successfully', async () => {
    (alignmentRepository.getAll as jest.Mock).mockResolvedValue([
      {
        id: 1,
        alignment: 'AlignmentName1',
      },
      {
        id: 2,
        alignment: 'AlignmentName2',
      },
    ]);

    const alignments = await alignmentService.getAll();

    expect(alignmentRepository.getAll).toHaveBeenCalled();
    expect(alignments).toEqual([
      {
        id: 1,
        alignment: 'AlignmentName1',
      },
      {
        id: 2,
        alignment: 'AlignmentName2',
      },
    ]);
  });

  it('should update an alignment successfully', async () => {
    (alignmentRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      alignment: 'AlignmentName',
    });
    (alignmentRepository.update as jest.Mock).mockResolvedValue({});

    await alignmentService.update({ id: 1, alignment: 'UpdatedAlignmentName' });

    expect(alignmentRepository.findById).toHaveBeenCalledWith(1);
    expect(alignmentRepository.update).toHaveBeenCalledWith({
      id: 1,
      alignment: 'UpdatedAlignmentName',
    });
  });

  it('should throw a not found error when updating a non-existent alignment', async () => {
    (alignmentRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(
      alignmentService.update({ id: 1, alignment: 'UpdatedAlignmentName' }),
    ).rejects.toMatchObject({
      message: 'NotFound any Alignment with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });

  it('should delete an alignment successfully', async () => {
    (alignmentRepository.findById as jest.Mock).mockResolvedValue({
      id: 1,
      alignment: 'AlignmentName',
    });
    (alignmentRepository.delete as jest.Mock).mockResolvedValue({});

    await alignmentService.delete(1);

    expect(alignmentRepository.findById).toHaveBeenCalledWith(1);
    expect(alignmentRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should throw a not found error when deleting a non-existent alignment', async () => {
    (alignmentRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(alignmentService.delete(1)).rejects.toMatchObject({
      message: 'NotFound any Alignment with this id!',
      statusCode: 404,
      status: 'Not Found',
    });
  });
});
