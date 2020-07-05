# dayjs-recur

This is a plugin for [Day.js](https://github.com/iamkun/dayjs) that allows you to work with recurring dates. This plugin only handles dates, any time information is discarded.

## Getting Started

The following guide will help you install and use this plugin with Day.js

### Prerequisites

Day.js installed

### Installation

You can install via Yarn or npm

```bash
yarn add dayjs-recur
```

```bash
npm install dayjs-recur
```

## Usage Guide

You will need to import the plugin and activate it via the Day.js `.extend()` function

### ES6

```javascript
import dayjs from 'dayjs'
import dayjsRecur from 'dayjs-recur'

dayjs.extend(dayjsRecur)
```

### Node

```javascript
const dayjs = require('dayjs')
const dayjsRecur = require('dayjs-recur')

dayjs.extend(dayjsRecur)
```

### Creating a Recurring Date

You can create a recurrence from an instance of dayjs or from the constructor a few different ways.

#### From an instance

```javascript 
// Create a recurrence using today as the start date.
const recurrence = moment().recur();
 
// Create a recurrence while passing the start and end dates to the recur function.
// Note: passing an end date requires you to also pass a start date.
const recurrence = dayjs().recur( start, end );
 
// You may pass a start date to the instance of dayjs, or use an existing dayjs instance, to set the start date.
// In this case, passing a date to the recur function sets and end date.
const recurrence = dayjs(start).recur( end );
 
// Finally, you can create a recurrence and pass in an entire set of options.
recurrence = dayjs().recur({
    start: "01/01/2020",
    end: "01/01/2021"
});
```

#### From the constructor

```javascript  
// Create recurrence without a start date. Note: this will not work with intervals.
const recurrence = dayjs.recur();
 
// Create a recurrence, passing just the start, or the start and end dates.
const recurrence = dayjs.recur( start, end );
 
// Create a recurrence, passing set of options.
const recurrence = dayjs.recur({
    start: "01/01/2020",
    end: "01/01/2021"
});
```

### Creating Rules

dayjs-recur uses rules to define when a date should recur. You can then generate future or past recurrences based on these rules, or see if a specific date matches the rules. Rules can also be overridden or removed.

#### The every() Function
The `every()` function allows you to set the units and, optionally, the measurment type of the recurring date. It returns the recur object to allow chaining.

```js
// Create a date to start from
const myDate = dayjs("01/01/2020");

// You can pass the units to recur on, and the measurement type.
const recurrence = myDate.recur().every(1, "days");

// You can also chain the measurement type instead of passing it to every.
const recurrence = myDate.recur().every(1).day();

// It is also possible to pass an array of units.
const recurrence = myDate.recur().every([3, 5]).days();

// When using the dayOfWeek measurement, you can pass days names.
const recurrence = myDate.recur().every(["Monday", "wed"]).daysOfWeek();

// Month names also work when using monthOfYear.
const recurrence = myDate.recur().every(["Jan", "february"], "monthsOfYear");
```

`every()` will override the last "every" if a measurement was not provided. The following line will create a recurrence for every 5 days.
```js
const recurrence  = myDate.recur().every(1).every(5).days();
```
If you need to specify multiple units, pass an array to `every()`.

You may also pass the units directly to the interval functions (listed below) instead of using `every()`.
```js
const recurrence = dayjs.recur().monthOfYear("January");
```

#### Length Intervals
dayjs-recur supports intervals for days, weeks, months, and years. Measurements may be singular or plural (ex: `day()` vs `days()`). Length Intervals **must** have a start date defined.

Possible Length Intervals Include:
* day / days
* week / weeks
* month / months
* year / years

##### Examples
```js
// Create a date to start from
const myDate = dayjs("01/01/2020");

// A daily interval - will match every day.
const interval = myDate.recur().every(1).day();

// A bi-weekly interval - will match any date that is exactly 2 weeks from myDate.
const interval = myDate.recur().every(2).weeks();

// A quarterly interval - will match any date that is exactly 3 months from myDate.
const interval = myDate.recur().every(3).months();

// A yearly interval - will match any date that is exactly 1 year from myDate.
const interval = myDate.recur().every(1).years();

// It is possible to match multiple units of a single measure using an array.
const interval = myDate.recur().every([3, 5]).days();

// It is NOT possible to create compound intervals. The following will never match.
const interval = myDate.recur().every(3).days().every(2).months(); // Won't work
```


#### Calendar Intervals
Calendar Intervals do not depend on a start date. They define a unit of another unit. For instance, a day of a month, or a month of a year. Measurements may be singular or plural (ex: `dayOfMonth()` vs `daysOfMonth()`).

Possible Calendar Intervals Include:
* dayOfWeek / daysOfWeek
* dayOfMonth / daysOfMonth
* weekOfMonth / weeksOfMonth
* weekOfYear / weeksOfYear
* monthOfYear / monthsOfYear

##### Examples
```js
// Will match any date that is on Sunday or Monday.
const cal = dayjs.recur().every(["Sunday", 1]).daysOfWeek();

// Will match any date that is the first or tenth day of any month.
const cal = dayjs.recur().every([1, 10]).daysOfMonth();

// Will match any date that is in the first or third week of any month.
const cal = dayjs.recur().every([1, 3]).weeksOfMonth();

// Will match any date that is in the 20th week of any year.
const cal = dayjs.recur().every(20).weekOfYear();

// Will match any date that is in January of any year.
const cal = dayjs.recur().every("January").monthsOfYear();

// You can also combine these rules to match specific dates.
// For instance, this will match only on Valentines day
const valentines = dayjs.recur().every(14).daysOfMonth()
                               .every("Februray").monthsOfYear();

// A weekOfMonthByDay interval is available for combining with
// the daysOfWeek to achieve "nth weekday of month" recurrences.
// The following matches every 1st and 3rd Thursday of the month.
// (Note this cannot be combined at the moment with every(x).months() expression) 
const cal = dayjs.recur().every("Thursday").daysOfWeek()
                    .every([0, 2]).weeksOfMonthByDay();

const cal = dayjs.recur().every(dayjs("01/01/2020").day()).daysOfWeek()
                    .every(dayjs("01/01/2020").monthWeekByDay()).weeksOfMonthByDay();

```

## Local Development and Contributing

We are more than happy to accept PRs for bugs, improvements or new features.
Developing your own changes locally is easy, you just need to clone the repo

```bash
git clone git@github.com/FraserHamilton/dayjs-recur

cd dayjs-recur
```

and install the dependencies with either `npm` or `yarn`

```bash
npm i
```

```bash
yarn
```

Tests can be ran with the `test` script

```bash
npm run test
```

```bash
yarn test
```
