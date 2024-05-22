import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updateAttributeSchema = z.object({
  id: z.number(),
  attributeName: z.string(),
});

export class UpdateAttributeDTO extends AbstractDTO<
  typeof updateAttributeSchema
> {
  protected rules() {
    return updateAttributeSchema;
  }
}

export type UpdateAttribute = z.infer<typeof updateAttributeSchema>;
