import test from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateOrthodoxEasterJulian,
  calculateOrthodoxEasterGregorian,
  calculateCatholicEasterGregorian,
} from '../src/easter.mjs';

test('Orthodox Easter calculation', async (t) => {
  const EASTER_DATES = {
    2020: '2020-04-19T00:00:00.000Z',
    2021: '2021-05-02T00:00:00.000Z',
    2022: '2022-04-24T00:00:00.000Z',
    2023: '2023-04-16T00:00:00.000Z',
    2024: '2024-05-05T00:00:00.000Z',
    2025: '2025-04-20T00:00:00.000Z',
    2026: '2026-04-12T00:00:00.000Z',
    2027: '2027-05-02T00:00:00.000Z',
    2028: '2028-04-16T00:00:00.000Z',
    2029: '2029-04-08T00:00:00.000Z',
    2030: '2030-04-28T00:00:00.000Z',
    2031: '2031-04-13T00:00:00.000Z',
    2032: '2032-05-02T00:00:00.000Z',
  };

  const EASTER_DATES_JULIAN = {
    2023: '2023-04-03T00:00:00.000Z',
    2024: '2024-04-22T00:00:00.000Z',
  };

  await t.test('Verify Orthodox Easter dates in Gregorian calendar', async () => {
    Object.keys(EASTER_DATES)
      .forEach((year) => {
        const expected = EASTER_DATES[year];
        const actual = calculateOrthodoxEasterGregorian(year);

        assert.equal(actual.toISOString(), expected);
      });
  });

  await t.test('Verify Orthodox Easter dates in Julian calendar', async () => {
    Object.keys(EASTER_DATES_JULIAN)
      .forEach((year) => {
        const expected = EASTER_DATES_JULIAN[year];
        const actual = calculateOrthodoxEasterJulian(year);

        assert.equal(actual.toISOString(), expected);
      });
  });
});

test('Catholic Easter calculation', async (t) => {
  const EASTER_DATES = {
    1961: '1961-04-02T00:00:00.000Z',
    2020: '2020-04-12T00:00:00.000Z',
    2021: '2021-04-04T00:00:00.000Z',
    2022: '2022-04-17T00:00:00.000Z',
    2023: '2023-04-09T00:00:00.000Z',
    2024: '2024-03-31T00:00:00.000Z',
    2025: '2025-04-20T00:00:00.000Z',
    2026: '2026-04-05T00:00:00.000Z',
    2027: '2027-03-28T00:00:00.000Z',
    2028: '2028-04-16T00:00:00.000Z',
    2029: '2029-04-01T00:00:00.000Z',
    2030: '2030-04-21T00:00:00.000Z',
    2031: '2031-04-13T00:00:00.000Z',
    2032: '2032-03-28T00:00:00.000Z',
  };

  await t.test('Verify Catholic Easter dates in Gregorian calendar', async () => {
    Object.keys(EASTER_DATES)
      .forEach((year) => {
        const expected = EASTER_DATES[year];
        const actual = calculateCatholicEasterGregorian(year);

        assert.equal(actual.toISOString(), expected);
      });
  });
});
