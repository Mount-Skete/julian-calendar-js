import { julianToGregorian } from './calendar.mjs';

/**
 * Calculates Orthodox Easter date in Julian calendar.
 *
 * Calculation is performed according to Meeus's Julian algorithm.
 * @see {@link https://en.wikipedia.org/wiki/Date_of_Easter#Meeus's_Julian_algorithm}
 * @param {Number} year year
 * @returns Easter date in UTC time zone.
 */
export function calculateOrthodoxEasterJulian(year) {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;

  return new Date(Date.UTC(year, month - 1, day));
}

/**
 * Calculates Orthodox Easter date in Gregorian calendar.
 *
 * Calculation is performed according to Meeus's Julian algorithm
 * and converts it to Gregorian calendar.
 * @see calculateOrthodoxEasterJulian
 * @see julianToGregorian
 * @see {@link https://en.wikipedia.org/wiki/Date_of_Easter#Meeus's_Julian_algorithm}
 * @param {Number} year year
 * @returns Easter date in UTC time zone.
 */
export function calculateOrthodoxEasterGregorian(year) {
  return julianToGregorian(calculateOrthodoxEasterJulian(year));
}

/**
 * Calculates Catholic Easter date in Gregorian calendar.
 *
 * Calculation is performed according to corrected Meeus/Jones/Butcher algorithm.
 * @see {@link https://en.wikipedia.org/wiki/Date_of_Easter#Anonymous_Gregorian_algorithm}
 * @param {Number} year year
 * @returns Easter date in UTC time zone.
 */
export function calculateCatholicEasterGregorian(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const g = Math.floor((8 * b + 13) / 25);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 19 * l) / 433);
  const n = Math.floor((h + l - 7 * m + 90) / 25);
  const p = (h + l - 7 * m + 33 * n + 19) % 32;

  return new Date(Date.UTC(year, n - 1, p));
}
