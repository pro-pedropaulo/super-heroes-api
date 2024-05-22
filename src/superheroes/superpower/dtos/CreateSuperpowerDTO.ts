import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createSuperpowerSchema = z.object({
  powerName: z.string(),
});

export class CreateSuperpowerDTO extends AbstractDTO<
  typeof createSuperpowerSchema
> {
  protected rules() {
    return createSuperpowerSchema;
  }
}

export type CreateSuperpower = z.infer<typeof createSuperpowerSchema>;
