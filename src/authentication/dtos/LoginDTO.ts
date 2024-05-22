import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const loginSchema = z.object({
  email: z.string().email().optional(),
  cpf: z.string().optional(),
  password: z.string(),
});

export class LoginDTO extends AbstractDTO<typeof loginSchema> {
  protected rules() {
    return loginSchema;
  }
}

export type LoginData = z.infer<typeof loginSchema>;
