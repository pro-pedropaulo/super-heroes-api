import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const createGenderSchema = z.object({
  gender: z.string(),
});

export class CreateGenderDTO extends AbstractDTO<typeof createGenderSchema> {
  protected rules() {
    return createGenderSchema;
  }
}

export type CreateGender = z.infer<typeof createGenderSchema>;
