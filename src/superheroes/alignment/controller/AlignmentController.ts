import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAlignmentDTO } from '../dtos/CreateAlignmentDTO';
import { UpdateAlignmentDTO } from '../dtos/UpdateAlignmentDTO';
import { AlignmentService } from '../services/alignmentService';

export class AlignmentController {
  async create(request: Request, response: Response) {
    const requestValidated = new CreateAlignmentDTO(request.body);

    const alignmentService = container.resolve(AlignmentService);

    const createdAlignment = await alignmentService.create(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdAlignment);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const alignmentService = container.resolve(AlignmentService);

    const alignment = await alignmentService.findById(Number(id));

    return response.status(200).json(alignment);
  }

  async getAll(request: Request, response: Response) {
    const alignmentService = container.resolve(AlignmentService);

    const alignments = await alignmentService.getAll();

    return response.status(200).json(alignments);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const requestValidated = new UpdateAlignmentDTO({
      id: Number(id),
      ...request.body,
    });

    const alignmentService = container.resolve(AlignmentService);

    await alignmentService.update(requestValidated.getAll());

    return response
      .status(200)
      .json({ message: 'Alignment updated successfully' });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const alignmentService = container.resolve(AlignmentService);

    await alignmentService.delete(Number(id));

    return response
      .status(200)
      .json({ message: 'Alignment deleted successfully' });
  }
}
