import mongoose, { Document, Model } from 'mongoose';
const Schema = mongoose.Schema;

const AuditSchema = new Schema({
  userId: { type: String, nullable: true },
  createdAt: { type: Date, default: Date.now },
  module: { type: String },
  feature: { type: String },
  oldData: { type: Object },
  newData: { type: Object },
});

export interface IAudit extends Document {
  userId?: string;
  createdAt: Date;
  module: string;
  feature: string;
  oldData: object;
  newData: object;
}

const Audit =
  (mongoose.models.Audit as Model<IAudit>) ||
  mongoose.model<IAudit>('Audit', AuditSchema);

export default Audit;
