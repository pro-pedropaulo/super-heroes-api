import Log from './models/log';

export interface ILog {
  log: string;
  message: string;
}

export async function addLog({ log, message }: ILog): Promise<void> {
  await new Log({
    log,
    message,
  }).save();
}
