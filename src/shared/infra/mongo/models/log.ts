import mongoose, { Document, Model } from 'mongoose';

const Schema = mongoose.Schema;

const LogSchema = new Schema({
  log: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export interface ILog extends Document {
  log: string;
  message: string;
  createdAt: Date;
}

const Log =
  (mongoose.models.Log as Model<ILog>) ||
  mongoose.model<ILog>('Log', LogSchema);

export default Log;
