import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updateColourSchema = z.object({
  id: z.number(),
  colour: z.string(),
});

export class UpdateColourDTO extends AbstractDTO<typeof updateColourSchema> {
  protected rules() {
    return updateColourSchema;
  }
}

export type UpdateColour = z.infer<typeof updateColourSchema>;
