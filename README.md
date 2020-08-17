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
const recurrence = dayjs().recur();
 
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
// (Note this cannot be combined at the dayjs with every(x).months() expression) 
const cal = dayjs.recur().every("Thursday").daysOfWeek()
                    .every([0, 2]).weeksOfMonthByDay();

const cal = dayjs.recur().every(dayjs("01/01/2020").day()).daysOfWeek()
                    .every(dayjs("01/01/2020").monthWeekByDay()).weeksOfMonthByDay();

```

### Using the Rules
#### Matching
The `matches()` function will test a date to check if all of the recurrence rules match. It returns `true` if the date matches, `false` otherwise.
```js
const interval = dayjs("01/01/2020").recur().every(2).days();
interval.matches("01/03/2020"); // false
interval.matches("01/03/2020"); // true
```

You may also see if a date matches before the start date or after the end date by passing `true` as the second argument to `matches()`.
```js
const interval = dayjs("01/01/2020").recur().every(2).days();
interval.matches("12/30/2019"); // false
interval.matches("12/30/2019", true); // true
```

#### Exceptions
To prevent a date from matching that would normally match, use the `except()` function.

```js
const recurrence = dayjs("01/01/2020").recur().every(1).day().except("01/02/2020");
recurrence.matches("01/02/2020"); // false
```


#### Overriding and Forgetting
If a rule is created with the same measurement of a previous rule, it will override the previous rule. Rules can also be removed from a recurrence.

```js
// Create a recurrence that matches every day, with an exception
const recurrence = dayjs("01/01/2020").recur().every(1).day().except("01/03/2020");

// This will override the previous rule and match every 2 days instead.
recurrence.every(2).days();

// Exceptions can also be removed by passing a date to the forget() function.
recurrence.forget("01/03/2020");

// Rules can be removed by passing the measurement to the forget() function.
recurrence.forget("days");
```


#### Generating Dates
It is also possible to generate dates from the rules. These functions require a starting date.

```js
 let nextDates;

// Create a recurrence
const recurrence = dayjs("01/01/2020").recur().every(2).days();

// Generate the next three dates as dayjs instances
// Outputs: [dayjs("01/03/2020"), dayjs("01/05/2020"), dayjs("01/07/2020")]
nextDates = recurrence.next(3); 

// Generate the next three dates
// Outputs: ["01/03/2020", "01/05/2020", "01/07/2020"]
nextDates = recurrence.next(3);

// Generate previous three dates
// Outputs: ["12/30/2020", "12/28/2020", "12/26/2020"]
nextDates = recurrence.previous(3);
```

If your recurrence does not have a start date set, or if it does but you want to start at a different date, use the `fromDate()` method first.
```js
const recurrence = dayjs("01/01/2020").recur().every(2).days();
recurrence.fromDate("02/05/2020");

// Outputs: ["02/06/2020", "02/08/2020", "02/10/2020"]
nextDates = recurrence.next(3);
```

With both a start date and an end date set, you can generate all dates within that range that match the pattern (including the start/end dates).
```js
const recurrence = dayjs().recur("01/01/2020", "01/07/2020").every(2).days();

// Outputs: ["01/01/2020", "01/03/2020", "01/05/2020", "01/07/2020"]
allDates = recurrence.all();
```


**Important Note:** These functions may be very inefficient/slow. They work by attempting to match every date from the start of a range until the desired number of dates have been generated. So if you attempt to get 10 dates for a rule that matches once a year, it will run the match function for ~3650 days.


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
