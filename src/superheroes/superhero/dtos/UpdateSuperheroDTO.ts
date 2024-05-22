import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updateSuperheroSchema = z.object({
  id: z.number(),
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

export class UpdateSuperheroDTO extends AbstractDTO<
  typeof updateSuperheroSchema
> {
  protected rules() {
    return updateSuperheroSchema;
  }
}

export type UpdateSuperhero = z.infer<typeof updateSuperheroSchema>;
