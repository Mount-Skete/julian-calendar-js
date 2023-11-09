# Julian calendar

[![ru](https://img.shields.io/badge/lang-ru-red.svg)](README.ru.md)

The project is a collection of functions to convert dates between Gregorian and Julian calendars.
Additionally it includes functions to calculate Orthodox and Catholic Easter dates.

[![Node CI](https://github.com/Mount-Skete/julian-calendar-js/actions/workflows/node-ci.yml/badge.svg)](https://github.com/Mount-Skete/julian-calendar-js/actions/workflows/node-ci.yml)
[![CodeQL](https://github.com/Mount-Skete/julian-calendar-js/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/Mount-Skete/julian-calendar-js/actions/workflows/github-code-scanning/codeql)

## Install
```shell
npm install @mount-skete/julian-calendar
```
The package is currently published only to GitHub Packages. You may need to add the following entry to your local or global `.npmrc` file.
```properties
@mount-skete:registry=https://npm.pkg.github.com
```

## API

```JavaScript
import {
  julianToGregorian,
  gregorianToJulian,
  isLeapJulianYear,
  isLeapGregorianYear,
  julianToJulianDay,
  gregorianToJulianDay,
  calculateOrthodoxEasterJulian,
  calculateOrthodoxEasterGregorian,
  calculateCatholicEasterGregorian,
  calculateEchoGregorian
} from '@mount-skete/julian-calendar';
```

**Converts date in Julian calendar to a date in Gregorian calendar.**
```JavaScript
const feb1 = new Date(Date.UTC(2023, 1, 1));
julianToGregorian(feb1); // '2023-02-14T00:00:00.000Z'
```

**Converts date in Gregorian calendar to a date in Julian calendar.**
```JavaScript
const feb1 = new Date(Date.UTC(2023, 1, 14));
gregorianToJulian(feb1); // '2023-02-01T00:00:00.000Z'
```

**Is a given year in the Julian calendar a leap year?**
```JavaScript
isLeapJulianYear(2020); // true
```

**Is a given year in the Gregorian calendar a leap year?**
```JavaScript
isLeapGregorianYear(2020); // true
```

**Calculates Julian day number from Julian calendar date.**
```JavaScript
const feb1 = new Date(Date.UTC(2023, 1, 1));
julianToJulianDay(feb1); // 2459989.5
```

**Calculates Julian day number from Gregorian calendar date.**
```JavaScript
const feb1 = new Date(Date.UTC(2023, 1, 1));
gregorianToJulianDay(feb1); // 2459976.5
```

**Calculates Orthodox Easter date in Julian calendar.**
```JavaScript
calculateOrthodoxEasterJulian(2023); // '2023-04-03T00:00:00.000Z'
```

**Calculates Orthodox Easter date in Gregorian calendar.**
```JavaScript
calculateOrthodoxEasterGregorian(2023); // '2023-04-16T00:00:00.000Z'
```

**Calculates Catholic Easter date in Gregorian calendar.**
```JavaScript
calculateCatholicEasterGregorian(2023); // '2023-04-09T00:00:00.000Z'
```

**Calculates week Echo for a given date in Gregorian calendar.**
```JavaScript
const feb1 = new Date(Date.UTC(2023, 1, 1));
calculateEchoGregorian(feb1); // 8
```

## Test
```shell
npm test
```

## License
Julian and Gregorian date conversion calculations are based on public domain algorithms from the [Fourmilab](https://www.fourmilab.ch/documents/calendar/).

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
