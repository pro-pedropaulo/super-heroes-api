import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createHeroAttributeSchema = z.object({
  attributeValue: z.number(),
  superhero: z.number(),
  attribute: z.number(),
});

export class CreateHeroAttributeDTO extends AbstractDTO<
  typeof createHeroAttributeSchema
> {
  protected rules() {
    return createHeroAttributeSchema;
  }
}

export type CreateHeroAttribute = z.infer<typeof createHeroAttributeSchema>;
