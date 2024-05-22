import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updateAlignmentSchema = z.object({
  id: z.number(),
  alignment: z.string(),
});

export class UpdateAlignmentDTO extends AbstractDTO<
  typeof updateAlignmentSchema
> {
  protected rules() {
    return updateAlignmentSchema;
  }
}

export type UpdateAlignment = z.infer<typeof updateAlignmentSchema>;
