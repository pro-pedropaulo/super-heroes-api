import { z } from 'zod';

import { AbstractDTO } from '../../shared/dtos/AbstractDTO';

const activeUserSchema = z.object({
  id: z.string(),
  active: z.boolean(),
});

export class ActiveUserDTO extends AbstractDTO<typeof activeUserSchema> {
  protected rules() {
    return activeUserSchema;
  }
}

export type ActiveUser = z.infer<typeof activeUserSchema>;
