import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

/**
 * @description connect to Mongodb
 * @return {Promise} - Connected to Mongo
 */
export async function connectMongo() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  const user = `${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@`;
  const host = `${process.env.MONGO_HOST}/${process.env.MONGO_DB}?authSource=admin`;

  const authentication = process.env.MONGO_SRV === 'true' ? '+srv' : '';

  const mongoURI = `mongodb${authentication}://${user}${host}`;

  const options = {
    maxPoolSize: 10, // Maintain up to 10 socket connections
  };

  await mongoose.connect(mongoURI, options);
  return;
}

/**
 * Closes the connection safely and gracefully
 * @return {Promise} with the connection status
 */
export async function closeMongooseConnection(): Promise<void> {
  return await mongoose.disconnect();
}
