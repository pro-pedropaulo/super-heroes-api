import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createSuperheroSchema = z.object({
  superheroName: z.string(),
  fullName: z.string(),
  heightCm: z.number(),
  weightKg: z.number(),
  gender: z.number(),
  eyeColour: z.number(),
  hairColour: z.number(),
  skinColour: z.number(),
  race: z.number(),
  publisher: z.number(),
  alignment: z.number(),
  superpowers: z.array(
    z.object({
      powerId: z.number(),
    }),
  ),
});

export class CreateSuperheroDTO extends AbstractDTO<
  typeof createSuperheroSchema
> {
  protected rules() {
    return createSuperheroSchema;
  }
}

export type CreateSuperhero = z.infer<typeof createSuperheroSchema>;
