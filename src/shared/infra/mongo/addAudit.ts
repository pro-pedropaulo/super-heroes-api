import Audit from './models/audit';

export interface IAudit {
  userId?: string;
  module: string;
  feature: string;
  oldData: object;
  newData: object;
}

export async function addAudit({
  userId,
  module,
  feature,
  oldData,
  newData,
}: IAudit): Promise<void> {
  await new Audit({
    userId,
    module,
    feature,
    oldData,
    newData,
  }).save();
}
