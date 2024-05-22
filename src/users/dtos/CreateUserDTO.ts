import { z } from 'zod';

import { passwordSchema } from '../../shared/validators/passwordSchema';
import { AbstractDTO } from '../../shared/dtos/AbstractDTO';

const createUserSchema = passwordSchema({
  name: z.string(),
  cpf: z.string(),
  email: z.string().email(),
  biography: z.string(),
});

export class CreateUserDTO extends AbstractDTO<typeof createUserSchema> {
  protected rules() {
    return createUserSchema;
  }
}

export type CreateUser = z.infer<typeof createUserSchema>;
