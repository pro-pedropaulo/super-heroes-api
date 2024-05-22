import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createRaceSchema = z.object({
  race: z.string(),
});

export class CreateRaceDTO extends AbstractDTO<typeof createRaceSchema> {
  protected rules() {
    return createRaceSchema;
  }
}

export type CreateRace = z.infer<typeof createRaceSchema>;
