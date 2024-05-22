import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const getFilterSuperheroSchema = z.object({
  attributeName: z.string().optional(),
  powerName: z.string().optional(),
  alignment: z.string().optional(),
  publisher: z.string().optional(),
});

export class GetFilterSuperheroDTO extends AbstractDTO<
  typeof getFilterSuperheroSchema
> {
  protected rules() {
    return getFilterSuperheroSchema;
  }
}

export type GetFilterSuperhero = z.infer<typeof getFilterSuperheroSchema>;
