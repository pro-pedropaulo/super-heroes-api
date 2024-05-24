import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAttributeDTO } from '../dtos/CreateAttributeDTO';
import { UpdateAttributeDTO } from '../dtos/UpdateAttributeDTO';
import { AttributeService } from '../services/AttributeService';

export class AttributeController {
  async create(request: Request, response: Response) {
    const requestValidated = new CreateAttributeDTO(request.body);

    const attributeService = container.resolve(AttributeService);

    const createdAttribute = await attributeService.create(
      requestValidated.getAll(),
    );

    return response.status(201).json(createdAttribute);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const attributeService = container.resolve(AttributeService);

    const attribute = await attributeService.findById(Number(id));

    return response.status(200).json(attribute);
  }

  async getAll(request: Request, response: Response) {
    const attributeService = container.resolve(AttributeService);

    const attributes = await attributeService.getAll();

    return response.status(200).json(attributes);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const requestValidated = new UpdateAttributeDTO({
      id: Number(id),
      ...request.body,
    });

    const attributeService = container.resolve(AttributeService);

    await attributeService.update(requestValidated.getAll());

    return response
      .status(200)
      .json({ message: 'Attribute updated successfully' });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const attributeService = container.resolve(AttributeService);

    await attributeService.delete(Number(id));

    return response
      .status(200)
      .json({ message: 'Attribute deleted successfully' });
  }
}
