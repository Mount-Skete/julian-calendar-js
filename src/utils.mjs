import { calculateOrthodoxEasterGregorian } from './easter.mjs';

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MS_PER_WEEK = MS_PER_DAY * 7;

function addDays(date, days) {
  return new Date(date.getTime() + days * MS_PER_DAY);
}

function weeksBetween(date1, date2) {
  return Math.abs((date1 - date2) / MS_PER_WEEK);
}

function daysBetween(date1, date2) {
  return Math.abs((date1 - date2) / MS_PER_DAY);
}

/**
 * Compares dates ignoring time.
 *
 * @param {Date} date1 First date
 * @param {Date} date2 Second date
 * @returns true if date matches
 */
function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate();
}

/**
 * Calculates Echo for a given date in Gregorian calendar.
 *
 * @param {Date} date Date in Gregorian calendar
 * @returns Echo as number 1 to 8.
 */
export function calculateEchoGregorian(date) {
  const year = date.getFullYear();
  const easter = calculateOrthodoxEasterGregorian(year);
  let echoStart = addDays(easter, 7);

  // Bright Week Saturday should have echo 8.
  if (isSameDay(date, addDays(easter, 6))) {
    return 8;
  }

  // Bright Week should have echo calculated by days.
  if (date.getTime() >= easter.getTime()
    && date.getTime() <= addDays(easter, 6)) {
    return daysBetween(easter, date) + 1;
  }

  // Date is before year's Easter.
  // Calculating from previous Easter.
  if (date.getTime() < echoStart.getTime()) {
    echoStart = addDays(calculateOrthodoxEasterGregorian(year - 1), 7);
  }

  const weeks = Math.floor(weeksBetween(date, echoStart));
  const echo = (weeks % 8) + 1;

  return echo;
}
