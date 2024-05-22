import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import '../../container/providers/apm';
import { app } from './app';

const HOST = process.env.SERVER_HOST ?? '';
const PORT = process.env.SERVER_PORT ?? 5000;

app.listen(PORT, () => console.log(`🔥 Server Started! ${HOST}:${PORT}`));
