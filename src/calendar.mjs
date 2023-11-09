/**
 * Julian and Gregorian calendars calculations are based
 * on the algorithms from Fourmilab.
 *
 * @see {@link https://www.fourmilab.ch/documents/calendar/}
 */

const GREGORIAN_EPOCH = 1721425.5;

function mod(a, b) {
  return a - (b * Math.floor(a / b));
}

/**
 * Is a given year in the Gregorian calendar a leap year?
 *
 * @param {Number} year Year
 * @returns true if the given year is a leap year
 */
export function isLeapGregorianYear(year) {
  return ((year % 4) === 0)
    && (!(((year % 100) === 0) && ((year % 400) !== 0)));
}

/**
 * Is a given year in the Julian calendar a leap year?
 *
 * @param {Number} year Year
 * @returns true if the given year is a leap year
 */
export function isLeapJulianYear(year) {
  return mod(year, 4) === ((year > 0) ? 0 : 3);
}

function gregorianToJD(year, month, day) {
  return (GREGORIAN_EPOCH - 1)
    + (365 * (year - 1))
    + Math.floor((year - 1) / 4)
    + (-Math.floor((year - 1) / 100))
    + Math.floor((year - 1) / 400)
    + Math.floor((((367 * month) - 362) / 12)
      + ((month <= 2) ? 0
        : (isLeapGregorianYear(year) ? -1 : -2)
      )
      + day);
}

/**
 * Calculates Julian day number from Gregorian calendar date.
 *
 * @param {Date} date Gregorian calendar date
 * @returns Julian day number for a given date
 */
export function gregorianToJulianDay(date) {
  return gregorianToJD(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

/**
 * Calculates Julian day number from Julian calendar date.
 *
 * @param {Date} date Julian calendar date
 * @returns Julian day number
 */
export function julianToJulianDay(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  const day = date.getDate();

  // Adjust negative common era years to the zero-based notation we use.
  if (year < 1) {
    year += 1;
  }

  // Algorithm as given in Meeus, Astronomical Algorithms, Chapter 7, page 61
  if (month <= 2) {
    year -= 1;
    month += 12;
  }

  return ((Math.floor((365.25 * (year + 4716)))
    + Math.floor((30.6001 * (month + 1)))
    + day) - 1524.5);
}

/**
 * Calculates Gregorian calendar date from Julian day.
 *
 * @param {Number} julianDay Julian day
 * @returns Gregorian calendar date
 */
export function julianDayToGregorian(julianDay) {
  const wjd = Math.floor(julianDay - 0.5) + 0.5;
  const depoch = wjd - GREGORIAN_EPOCH;
  const quadricent = Math.floor(depoch / 146097);
  const dqc = mod(depoch, 146097);
  const cent = Math.floor(dqc / 36524);
  const dcent = mod(dqc, 36524);
  const quad = Math.floor(dcent / 1461);
  const dquad = mod(dcent, 1461);
  const yindex = Math.floor(dquad / 365);

  let year = (quadricent * 400) + (cent * 100) + (quad * 4) + yindex;
  if (!((cent === 4) || (yindex === 4))) {
    year += 1;
  }

  const yearday = wjd - gregorianToJD(year, 1, 1);
  const leapadj = ((wjd < gregorianToJD(year, 3, 1)) ? 0 : (isLeapGregorianYear(year) ? 1 : 2));
  const month = Math.floor((((yearday + leapadj) * 12) + 373) / 367);
  const day = (wjd - gregorianToJD(year, month, 1)) + 1;

  return new Date(Date.UTC(year, month - 1, day));
}

/**
 * Calculates Julian calendar date from Julian day.
 *
 * @param {Number} julianDay Julian day number
 * @returns Julian date as Date object
 */
export function julianDayToJulian(julianDay) {
  const jd = julianDay + 0.5;
  const z = Math.floor(jd);

  const a = z;
  const b = a + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);

  const month = Math.floor((e < 14) ? (e - 1) : (e - 13));
  let year = Math.floor((month > 2) ? (c - 4716) : (c - 4715));
  const day = b - d - Math.floor(30.6001 * e);

  /*  If year is less than 1, subtract one to convert from
      a zero based date system to the common era system in
      which the year -1 (1 B.C.E) is followed by year 1 (1 C.E.).  */
  if (year < 1) {
    year -= 1;
  }

  return new Date(Date.UTC(year, month - 1, day));
}

/**
 * Converts date in Gregorian calendar to a date in Julian calendar.
 *
 * @param {Date} date Julian calendar date.
 * @returns Gregorian calendar date.
 */
export function gregorianToJulian(date) {
  return julianDayToJulian(gregorianToJulianDay(date));
}

/**
 * Converts date in Julian calendar to a date in Gregorian calendar.
 *
 * @param {Date} date Julian calendar date.
 * @returns Gregorian calendar date.
 */
export function julianToGregorian(date) {
  return julianDayToGregorian(julianToJulianDay(date));
}
