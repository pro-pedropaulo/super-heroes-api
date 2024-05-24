import { inject, injectable } from 'tsyringe';

import { IPublisherRepository } from '../repositories/IPublisherRepository';
import { CreatePublisher } from '../dtos/CreatePublisherDTO';
import { UpdatePublisher } from '../dtos/UpdatePublisherDTO';
import NotFound from '../../../shared/errors/notFound';

@injectable()
export class PublisherService {
  constructor(
    @inject('PublisherRepository')
    private readonly publisherRepository: IPublisherRepository,
  ) {}

  async create(data: CreatePublisher) {
    return await this.publisherRepository.create(data);
  }

  async delete(id: number) {
    const publisher = await this.findById(id);
    return await this.publisherRepository.delete(publisher.id);
  }

  async findById(id: number) {
    const publisher = await this.publisherRepository.findById(id);

    if (!publisher) {
      throw new NotFound('NotFound any Publisher with this id!');
    }

    return publisher;
  }

  async getAll() {
    return await this.publisherRepository.getAll();
  }

  async update(data: UpdatePublisher) {
    await this.findById(data.id);
    return await this.publisherRepository.update(data);
  }
}
