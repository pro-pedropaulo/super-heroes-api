import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updateHeroAttributeSchema = z.object({
  id: z.number(),
  attributeValue: z.number(),
  superhero: z.number(),
  attribute: z.number(),
});

export class UpdateHeroAttributeDTO extends AbstractDTO<
  typeof updateHeroAttributeSchema
> {
  protected rules() {
    return updateHeroAttributeSchema;
  }
}

export type UpdateHeroAttribute = z.infer<typeof updateHeroAttributeSchema>;
