import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updateGenderSchema = z.object({
  id: z.number(),
  gender: z.string(),
});

export class UpdateGenderDTO extends AbstractDTO<typeof updateGenderSchema> {
  protected rules() {
    return updateGenderSchema;
  }
}

export type UpdateGender = z.infer<typeof updateGenderSchema>;
