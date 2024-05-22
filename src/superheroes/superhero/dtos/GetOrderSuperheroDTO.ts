import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const getOrderSuperheroSchema = z.object({
  attributeValue: z.string().optional(),
  powerId: z.string().optional(),
});

export class GetOrderSuperheroDTO extends AbstractDTO<
  typeof getOrderSuperheroSchema
> {
  protected rules() {
    return getOrderSuperheroSchema;
  }
}

export type GetOrderSuperhero = z.infer<typeof getOrderSuperheroSchema>;
