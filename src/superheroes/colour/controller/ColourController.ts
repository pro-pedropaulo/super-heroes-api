import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateColourDTO } from '../dtos/CreateColourDTO';
import { UpdateColourDTO } from '../dtos/UpdateColourDTO';
import { ColourService } from '../services/ColourService';

export class ColourController {
  async create(request: Request, response: Response) {
    const requestValidated = new CreateColourDTO(request.body);

    const colourService = container.resolve(ColourService);

    const createdColour = await colourService.create(requestValidated.getAll());

    return response.status(201).json(createdColour);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;

    const colourService = container.resolve(ColourService);

    const colour = await colourService.findById(Number(id));

    return response.status(200).json(colour);
  }

  async getAll(request: Request, response: Response) {
    const colourService = container.resolve(ColourService);

    const colours = await colourService.getAll();

    return response.status(200).json(colours);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const requestValidated = new UpdateColourDTO({
      id: Number(id),
      ...request.body,
    });

    const colourService = container.resolve(ColourService);

    await colourService.update(requestValidated.getAll());

    return response
      .status(200)
      .json({ message: 'Colour updated successfully' });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const colourService = container.resolve(ColourService);

    await colourService.delete(Number(id));

    return response
      .status(200)
      .json({ message: 'Colour deleted successfully' });
  }
}
