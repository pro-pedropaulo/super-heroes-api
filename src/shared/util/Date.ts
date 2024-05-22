import {
  isValid,
  addDays as addDaysfns,
  getDaysInMonth as getDaysInMonthfns,
  addYears as addYearsfns,
} from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

import BadRequest from '../errors/badRequest';
import { DATES, TIMEZONES } from '../constants/DATES';

/**
 * Format a date regarding the specified format
 * @param {Date} date
 * @param {string} formatDate Default: dd-MM-yyyy HH:mm
 * @param {string} timezone Default: UTC
 */
export function formatDate(
  date: Date,
  formatDate: string = DATES.DATE,
  timezone = TIMEZONES.AMERICA_SAO_PAULO,
): string {
  isValidDate(date);

  return formatInTimeZone(date, timezone, formatDate);
}

export function getDaysInMonth(date: Date) {
  return getDaysInMonthfns(date);
}

/**
 * Add a number of days to a date
 * @param {Date} date
 * @param {Number} days
 */
export function addDays(date: Date, days: number): Date {
  return addDaysfns(date, days);
}

export function addYears(date: Date, years: number): Date {
  return addYearsfns(date, years);
}

function isValidDate(date: Date): void {
  if (!isValid(date)) {
    throw new BadRequest('Invalid date');
  }
}
