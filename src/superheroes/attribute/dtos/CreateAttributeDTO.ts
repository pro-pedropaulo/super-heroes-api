import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createAttributeSchema = z.object({
  attributeName: z.string(),
});

export class CreateAttributeDTO extends AbstractDTO<
  typeof createAttributeSchema
> {
  protected rules() {
    return createAttributeSchema;
  }
}

export type CreateAttribute = z.infer<typeof createAttributeSchema>;
