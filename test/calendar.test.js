import test from 'node:test';
import assert from 'node:assert/strict';

import {
  isLeapJulianYear,
  julianToJulianDay,
  julianToGregorian,
  isLeapGregorianYear,
  gregorianToJulianDay,
  gregorianToJulian,
} from '../src/calendar.mjs';

test('Is leap Julian year', async (t) => {
  await t.test('Verify leap year', async () => {
    const actual = isLeapJulianYear(2020);

    assert.equal(actual, true);
  });

  await t.test('Verify non-leap year', async () => {
    const actual = isLeapJulianYear(2021);

    assert.equal(actual, false);
  });
});

test('Julian to Julian Day conversion', async (t) => {
  await t.test('Converts non-leap recent date', async () => {
    const feb1 = new Date(Date.UTC(2023, 1, 1));

    const actual = julianToJulianDay(feb1);

    assert.equal(actual, 2459989.5);
  });

  await t.test('Converts leap recent date', async () => {
    const jul1 = new Date(Date.UTC(2020, 6, 1));

    const actual = julianToJulianDay(jul1);

    assert.equal(actual, 2459044.5);
  });
});

test('julianToGregorian', async (t) => {
  await t.test('converts date within month', async () => {
    const feb1 = new Date(Date.UTC(2023, 1, 1));

    const actual = julianToGregorian(feb1);

    assert.equal(actual.toISOString(), '2023-02-14T00:00:00.000Z');
  });
});

test('Is leap Gregorian year', async (t) => {
  await t.test('Verify leap year', async () => {
    const actual = isLeapGregorianYear(2020);

    assert.equal(actual, true);
  });

  await t.test('Verify non-leap year', async () => {
    const actual = isLeapGregorianYear(2021);

    assert.equal(actual, false);
  });
});

test('Gregorian to Julian Day conversion', async (t) => {
  await t.test('Converts non-leap recent date', async () => {
    const feb1 = new Date(Date.UTC(2023, 1, 1));

    const actual = gregorianToJulianDay(feb1);

    assert.equal(actual, 2459976.5);
  });

  await t.test('Converts leap recent date', async () => {
    const jul1 = new Date(Date.UTC(2020, 6, 1));

    const actual = gregorianToJulianDay(jul1);

    assert.equal(actual, 2459031.5);
  });
});

test('Gregorian to Julian conversion', async (t) => {
  await t.test('converts date within month', () => {
    const feb1 = new Date(Date.UTC(2023, 1, 14));

    const actual = gregorianToJulian(feb1);

    assert.equal(actual.toISOString(), '2023-02-01T00:00:00.000Z');
  });
});
