import { z } from 'zod';

import { passwordSchema } from '../../shared/validators/passwordSchema';
import { AbstractDTO } from '../../shared/dtos/AbstractDTO';

const updateUserSchema = passwordSchema({
  id: z.string(),
  name: z.string(),
  cpf: z.string(),
  email: z.string().email(),
  biography: z.string(),
});

export class UpdateUserDTO extends AbstractDTO<typeof updateUserSchema> {
  protected rules() {
    return updateUserSchema;
  }
}

export type UpdateUser = z.infer<typeof updateUserSchema>;
