import 'dotenv-safe/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { type SeederOptions } from 'typeorm-extension';

import { logger } from '../../container/providers/logger';

const jsEnvs = ['homolog', 'production'];
const prefixFolder = jsEnvs.includes(process.env.NODE_ENV as string)
  ? 'dist'
  : 'src';

const entitiesFolders = [
  `${prefixFolder}/**/entities/**/*{.ts,.js}`,
  `${prefixFolder}/**/**/entities/**/*{.ts,.js}`,
];
const migrationsFolder = `${prefixFolder}/shared/infra/typeorm/migrations/**/*{.ts,.js}`;
const seedsFolder = `${prefixFolder}/shared/infra/typeorm/seeds/**/*{.ts,.js}`;

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
  entities: entitiesFolders,
  migrations: [migrationsFolder],
  seeds: [seedsFolder],
};

export const AppDataSource = new DataSource(options);

AppDataSource.initialize()
  .then(() => logger.info('🚀 Database Connected!'))
  .catch((err) => {
    console.error('⛔ Database Connection Error: ', err);
  });
