# Julian calendar

[![en](https://img.shields.io/badge/lang-en-red.svg)](README.md)

Проект представляет собой набор функций для преобразования дат между григорианским и юлианским календарями.
Кроме того, он включает функции для расчета дат православной и католической Пасхи.

[![Node CI](https://github.com/Mount-Skete/julian-calendar-js/actions/workflows/node-ci.yml/badge.svg)](https://github.com/Mount-Skete/julian-calendar-js/actions/workflows/node-ci.yml)
[![CodeQL](https://github.com/Mount-Skete/julian-calendar-js/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/Mount-Skete/julian-calendar-js/actions/workflows/github-code-scanning/codeql)

## Установка
```shell
npm install @mount-skete/julian-calendar
```
В настоящее время пакет опубликован только в GitHub Packages. Возможно, вам придется добавить следующую запись в локальный или глобальный файл `.npmrc`.
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

**Преобразует дату по юлианскому календарю в дату по григорианскому календарю.**
```JavaScript
const feb1 = new Date(Date.UTC(2023, 1, 1));
julianToGregorian(feb1); // '2023-02-14T00:00:00.000Z'
```

**Преобразует дату по григорианскому календарю в дату по юлианскому календарю.**
```JavaScript
const feb1 = new Date(Date.UTC(2023, 1, 14));
gregorianToJulian(feb1); // '2023-02-01T00:00:00.000Z'
```

**Является ли данный год по юлианскому календарю високосным?**
```JavaScript
isLeapJulianYear(2020); // true
```

**Является ли данный год по григорианскому календарю високосным?**
```JavaScript
isLeapGregorianYear(2020); // true
```

**Вычисляет номер юлианского дня на основе даты юлианского календаря.**
```JavaScript
const feb1 = new Date(Date.UTC(2023, 1, 1));
julianToJulianDay(feb1); // 2459989.5
```

**Вычисляет номер юлианского дня на основе даты по григорианскому календарю.**
```JavaScript
const feb1 = new Date(Date.UTC(2023, 1, 1));
gregorianToJulianDay(feb1); // 2459976.5
```

**Рассчитывает дату православной Пасхи по юлианскому календарю.**
```JavaScript
calculateOrthodoxEasterJulian(2023); // '2023-04-03T00:00:00.000Z'
```

**Рассчитывает дату православной Пасхи по григорианскому календарю.**
```JavaScript
calculateOrthodoxEasterGregorian(2023); // '2023-04-16T00:00:00.000Z'
```

**Рассчитывает дату католической Пасхи по григорианскому календарю.**
```JavaScript
calculateCatholicEasterGregorian(2023); // '2023-04-09T00:00:00.000Z'
```

**Вычисляет глас недели или дня для заданной даты по григорианскому календарю.**
```JavaScript
const feb1 = new Date(Date.UTC(2023, 1, 1));
calculateEchoGregorian(feb1); // 8
```

## Тестирование
```shell
npm test
```

## Лицензия
Расчеты преобразования дат по юлианскому и григорианскому календарю основаны на общедоступных алгоритмов из [Fourmilab](https://www.fourmilab.ch/documents/calendar/).

Этот проект лицензируется по лицензии MIT — подробности см. в файле [LICENSE](LICENSE).
