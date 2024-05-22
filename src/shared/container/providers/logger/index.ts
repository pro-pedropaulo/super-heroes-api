import winston from 'winston';

import { DATES, TIMEZONES } from '../../../constants/DATES';

import { formatDate } from '@/shared/util/Date';

const date = formatDate(
  new Date(),
  DATES.DATE_TIME_BR,
  TIMEZONES.AMERICA_SAO_PAULO,
);

const logFormat = winston.format.printf(function (info) {
  return `${date}-${info.level}: ${JSON.stringify(info.message, null, 4)}`;
});

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), logFormat),
    }),
  ],
});
