import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updateSuperpowerSchema = z.object({
  id: z.number(),
  powerName: z.string(),
});

export class UpdateSuperpowerDTO extends AbstractDTO<
  typeof updateSuperpowerSchema
> {
  protected rules() {
    return updateSuperpowerSchema;
  }
}

export type UpdateSuperpower = z.infer<typeof updateSuperpowerSchema>;
