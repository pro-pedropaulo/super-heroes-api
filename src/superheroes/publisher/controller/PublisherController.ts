import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePublisherDTO } from '../dtos/CreatePublisherDTO';
import { UpdatePublisherDTO } from '../dtos/UpdatePublisherDTO';
import { PublisherService } from '../services/PublisherService';

export class PublisherController {
  async create(request: Request, response: Response) {
    const requestValidated = new CreatePublisherDTO(request.body);

    const publisherService = container.resolve(PublisherService);

    const createdPublisher = await publisherService.create(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdPublisher);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const publisherService = container.resolve(PublisherService);

    const publisher = await publisherService.findById(Number(id));

    return response.status(200).json(publisher);
  }

  async getAll(request: Request, response: Response) {
    const publisherService = container.resolve(PublisherService);

    const publishers = await publisherService.getAll();

    return response.status(200).json(publishers);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const requestValidated = new UpdatePublisherDTO({
      id: Number(id),
      ...request.body,
    });

    const publisherService = container.resolve(PublisherService);

    await publisherService.update(requestValidated.getAll());

    return response
      .status(200)
      .json({ message: 'Publisher updated successfully' });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const publisherService = container.resolve(PublisherService);

    await publisherService.delete(Number(id));

    return response
      .status(200)
      .json({ message: 'Publisher deleted successfully' });
  }
}
