import { z } from 'zod';

import { AbstractDTO } from '@/shared/dtos/AbstractDTO';

const updatePublisherSchema = z.object({
  id: z.number(),
  publisher: z.string(),
});

export class UpdatePublisherDTO extends AbstractDTO<
  typeof updatePublisherSchema
> {
  protected rules() {
    return updatePublisherSchema;
  }
}

export type UpdatePublisher = z.infer<typeof updatePublisherSchema>;
