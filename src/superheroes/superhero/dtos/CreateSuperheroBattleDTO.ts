import { z } from 'zod';

import { AbstractDTO } from '../../../shared/dtos/AbstractDTO';

const createSuperheroBattleSchema = z.object({
  publisherOne: z.number(),
  publisherTwo: z.number(),
});

export class CreateSuperheroBattleDTO extends AbstractDTO<
  typeof createSuperheroBattleSchema
> {
  protected rules() {
    return createSuperheroBattleSchema;
  }
}

export type CreateSuperheroBattle = z.infer<typeof createSuperheroBattleSchema>;
