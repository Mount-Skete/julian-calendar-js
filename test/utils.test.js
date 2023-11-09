import test from 'node:test';
import assert from 'node:assert/strict';

import {
  calculateEchoGregorian,
} from '../src/utils.mjs';

test('Echos calculation', async (t) => {
  const PRE_EASTER_WEEK_ECHOS = {
    '2022-04-18T00:00:00.000Z': 2,
    '2022-04-21T00:00:00.000Z': 2,

    '2023-04-10T00:00:00.000Z': 2,
    '2023-04-15T00:00:00.000Z': 2,

    '2024-04-29T00:00:00.000Z': 6,
    '2024-05-03T00:00:00.000Z': 6,
  };

  const EASTER_WEEK_ECHOS = {
    '2022-04-24T00:00:00.000Z': 1,
    '2022-04-25T00:00:00.000Z': 2,
    '2022-04-26T00:00:00.000Z': 3,
    '2022-04-27T00:00:00.000Z': 4,
    '2022-04-28T00:00:00.000Z': 5,
    '2022-04-29T00:00:00.000Z': 6,
    '2022-04-30T00:00:00.000Z': 8,

    '2023-04-16T00:00:00.000Z': 1,
    '2023-04-17T00:00:00.000Z': 2,
    '2023-04-18T00:00:00.000Z': 3,
    '2023-04-19T00:00:00.000Z': 4,
    '2023-04-20T00:00:00.000Z': 5,
    '2023-04-21T00:00:00.000Z': 6,
    '2023-04-22T00:00:00.000Z': 8,

    '2024-05-05T00:00:00.000Z': 1,
    '2024-05-06T00:00:00.000Z': 2,
    '2024-05-07T00:00:00.000Z': 3,
    '2024-05-08T00:00:00.000Z': 4,
    '2024-05-09T00:00:00.000Z': 5,
    '2024-05-10T00:00:00.000Z': 6,
    '2024-05-11T00:00:00.000Z': 8,
  };

  const DATES_ECHOS = {
    // Sundays
    '2022-05-01T00:00:00.000Z': 1,
    '2022-05-08T00:00:00.000Z': 2,
    '2022-05-15T00:00:00.000Z': 3,
    '2022-05-22T00:00:00.000Z': 4,
    '2022-05-29T00:00:00.000Z': 5,
    '2022-06-05T00:00:00.000Z': 6,
    '2022-06-12T00:00:00.000Z': 7,
    '2022-06-19T00:00:00.000Z': 8,

    '2023-04-23T00:00:00.000Z': 1,
    '2023-04-30T00:00:00.000Z': 2,
    '2023-05-07T00:00:00.000Z': 3,
    '2023-05-14T00:00:00.000Z': 4,
    '2023-05-21T00:00:00.000Z': 5,
    '2023-05-28T00:00:00.000Z': 6,
    '2023-06-04T00:00:00.000Z': 7,
    '2023-06-11T00:00:00.000Z': 8,

    '2024-05-12T00:00:00.000Z': 1,
    '2024-05-19T00:00:00.000Z': 2,
    '2024-05-26T00:00:00.000Z': 3,
    '2024-06-02T00:00:00.000Z': 4,
    '2024-06-09T00:00:00.000Z': 5,
    '2024-06-16T00:00:00.000Z': 6,
    '2024-06-23T00:00:00.000Z': 7,
    '2024-06-30T00:00:00.000Z': 8,

    // Week days
    '2023-06-19T10:00:00.000Z': 1,
    '2023-06-27T10:00:00.000Z': 2,
    '2023-07-05T10:00:00.000Z': 3,
    '2023-07-13T10:00:00.000Z': 4,
    '2023-07-21T10:00:00.000Z': 5,
    '2023-07-29T10:00:00.000Z': 6,
    '2023-07-31T10:00:00.000Z': 7,
    '2023-08-08T10:00:00.000Z': 8,
  };

  await t.test('Verify Echos in Gregorian calendar', async () => {
    Object.keys(DATES_ECHOS)
      .forEach((dateISO) => {
        const date = new Date(dateISO);
        const expected = DATES_ECHOS[dateISO];

        const actual = calculateEchoGregorian(date);

        assert.equal(
          actual,
          expected,
          `Echo doesn't match for ${dateISO}. ${actual} != ${expected}`,
        );
      });
  });

  await t.test('Verify pre Easter week Echos in Gregorian calendar', async () => {
    Object.keys(PRE_EASTER_WEEK_ECHOS)
      .forEach((dateISO) => {
        const date = new Date(dateISO);
        const expected = PRE_EASTER_WEEK_ECHOS[dateISO];

        const actual = calculateEchoGregorian(date);

        assert.equal(
          actual,
          expected,
          `Echo doesn't match for ${dateISO}. ${actual} != ${expected}`,
        );
      });
  });

  await t.test('Verify Easter week Echos in Gregorian calendar', async () => {
    Object.keys(EASTER_WEEK_ECHOS)
      .forEach((dateISO) => {
        const date = new Date(dateISO);
        const expected = EASTER_WEEK_ECHOS[dateISO];

        const actual = calculateEchoGregorian(date);

        assert.equal(
          actual,
          expected,
          `Echo doesn't match for ${dateISO}. ${actual} != ${expected}`,
        );
      });
  });

  await t.test('Verify 2023-feb-1 Echo in Gregorian calendar', async () => {
    const date = new Date(Date.UTC(2023, 1, 1));
    const expected = 8;
    const actual = calculateEchoGregorian(date);

    assert.equal(
      actual,
      expected,
      `Echo doesn't match for ${date.toISOString()}. ${actual} != ${expected}`,
    );
  });
});
