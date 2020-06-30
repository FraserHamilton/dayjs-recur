import dayjs from 'dayjs'
import dayjsRecur from '../index'

dayjs.extend(dayjsRecur)

const startDate = '2020-01-01'
const endDate = '2021-01-01'

const isoFormat = 'YYYY-MM-DD'

describe('Creating a recurrence', () => {
  const now = dayjs()
  const nowDate = now.format(isoFormat)

  test('from dayjs constructor, with options parameter - dayjs.recur(options)', () => {
    const recur = dayjs.recur({ start: startDate, end: endDate })
    expect(recur.start.format(isoFormat)).toBe(startDate)
    expect(recur.end.format(isoFormat)).toBe(endDate)
  })

  test('from dayjs constructor, with start parameter only - dayjs.recur(start)', () => {
    const recur = dayjs.recur(startDate)
    expect(recur.start.format(isoFormat)).toBe(startDate)
  })

  test('from dayjs constructor, with start and end parameters - dayjs.recur(start, end)', () => {
    const recur = dayjs.recur(startDate, endDate)
    expect(recur.start.format(isoFormat)).toBe(startDate)
    expect(recur.end.format(isoFormat)).toBe(endDate)
  })

  test('from dayjs function, with options parameter - dayjs().recur(options)', () => {
    const recur = dayjs().recur({ start: startDate, end: endDate })
    expect(recur.start.format(isoFormat)).toBe(startDate)
    expect(recur.end.format(isoFormat)).toBe(endDate)
  })

  test('from dayjs function, with start and end parameters - dayjs().recur(start, end)', () => {
    const recur = dayjs().recur(startDate, endDate)
    expect(recur.start.format(isoFormat)).toBe(startDate)
    expect(recur.end.format(isoFormat)).toBe(endDate)
  })

  test('from dayjs function, with starting dayjs and end parameter - dayjs(start).recur(end)', () => {
    const recur = dayjs(startDate).recur(endDate)
    expect(recur.start.format(isoFormat)).toBe(startDate)
    expect(recur.end.format(isoFormat)).toBe(endDate)
  })

  test('from dayjs function, starting now, with end parameter  - dayjs().recur(end)', () => {
    const recur = now.recur(endDate)
    expect(recur.start.format(isoFormat)).toBe(nowDate)
    expect(recur.end.format(isoFormat)).toBe(endDate)
  })

  test('from dayjs function, starting now - dayjs().recur()', () => {
    const recur = now.recur()
    expect(recur.start.format(isoFormat)).toBe(nowDate)
  })

  test('from dayjs function, with starting dayjs and end parameter, which is a dayjs object - dayjs(start).recur(end)', () => {
    const startMoment = dayjs(startDate)
    const endMoment = dayjs(endDate)
    const recur = dayjs(startMoment).recur(endMoment)
    expect(recur.start.format(isoFormat)).toBe(startDate)
    expect(recur.end.format(isoFormat)).toBe(endDate)
  })
})

describe('Setting', () => {
  var recur

  beforeEach(() => {
    recur = dayjs().recur()
  })

  test('"start" should be getable/setable with startDate()', () => {
    recur.startDate(startDate)
    expect(recur.startDate().format(isoFormat)).toBe(startDate)
  })

  test('"end" should be getable/setable with endDate()', () => {
    recur.endDate(endDate)
    expect(recur.endDate().format(isoFormat)).toBe(endDate)
  })

  test('"from" should be getable/setable with fromDate()', () => {
    recur.fromDate(startDate)
    expect(recur.fromDate().format(isoFormat)).toBe(startDate)
  })
})

describe('The every() function', () => {
  test('should create a rule when a unit and measurement is passed', () => {
    const recurrence = dayjs().recur().every(1, 'day')
    expect(recurrence.save().rules.length).toBe(1)
  })

  test('should not create a rule when only a unit is passed', () => {
    const recurrence = dayjs().recur().every(1)
    expect(recurrence.save().rules.length).toBe(0)
  })

  test('should set the temporary units property', () => {
    const recurrence = dayjs().recur().every(1)
    expect(recurrence.units).not.toBeNull()
  })

  test('should accept an array', () => {
    const recurrence = dayjs().recur().every([1, 2])
    expect(recurrence.units).not.toBeNull()
  })
})

describe('An interval', () => {
  test('should not match a date before the start date', () => {
    const start = dayjs(startDate)
    const before = start.clone().subtract(1, 'day')
    const recurrence = start.recur()
    recurrence.every(1, 'day')
    expect(recurrence.matches(before)).toBe(false)
  })

  test('should not match a date after the end date', () => {
    const start = dayjs(startDate)
    const after = dayjs(endDate).add(1, 'day')
    const recurrence = start.recur()
    recurrence.endDate(endDate).every(1, 'day')
    expect(recurrence.matches(after)).toBe(false)
  })

  test('can be daily', () => {
    const recurrence = dayjs(startDate).recur().every(2).days()
    expect(recurrence.matches(dayjs(startDate).add(2, 'days'))).toBe(true)
    expect(recurrence.matches(dayjs(startDate).add(3, 'days'))).toBe(false)
  })

  test('can be weekly', () => {
    const recurrence = dayjs(startDate).recur().every(2).weeks()
    expect(recurrence.matches(dayjs(startDate).add(2, 'weeks'))).toBe(true)
    expect(recurrence.matches(dayjs(startDate).add(2, 'days'))).toBe(false)
    expect(recurrence.matches(dayjs(startDate).add(3, 'weeks'))).toBe(false)
  })

  test('can be monthly', () => {
    const recurrence = dayjs(startDate).recur().every(3).months()
    expect(recurrence.matches(dayjs(startDate).add(3, 'months'))).toBe(true)
    expect(recurrence.matches(dayjs(startDate).add(2, 'months'))).toBe(false)
    expect(recurrence.matches(dayjs(startDate).add(2, 'days'))).toBe(false)
  })

  test('can be yearly', () => {
    const recurrence = dayjs(startDate).recur().every(2).years()
    expect(recurrence.matches(dayjs(startDate).add(2, 'year'))).toBe(true)
    expect(recurrence.matches(dayjs(startDate).add(3, 'year'))).toBe(false)
    expect(recurrence.matches(dayjs(startDate).add(2, 'days'))).toBe(false)
  })

  test('can be an array of intervals', () => {
    const recurrence = dayjs(startDate).recur().every([3, 5]).days()
    expect(recurrence.matches(dayjs(startDate).add(3, 'days'))).toBe(true)
    expect(recurrence.matches(dayjs(startDate).add(5, 'days'))).toBe(true)
    expect(recurrence.matches(dayjs(startDate).add(10, 'days'))).toBe(true)
    expect(recurrence.matches(dayjs(startDate).add(4, 'days'))).toBe(false)
    expect(recurrence.matches(dayjs(startDate).add(8, 'days'))).toBe(false)
  })
})

describe('The Calendar Interval', () => {
  describe('daysOfWeek', () => {
    test('should work', () => {
      const recurrence = dayjs.recur().every(['Sunday', 1]).daysOfWeek()
      expect(recurrence.matches(dayjs().day(0))).toBe(true)
      expect(recurrence.matches(dayjs().day(1))).toBe(true)
      expect(recurrence.matches(dayjs().day(3))).toBe(false)
    })

    test.skip('should work with timezones', () => {
      var recurrence = dayjs
        .tz('2015-01-25', 'America/Vancouver')
        .recur()
        .every(['Sunday', 1])
        .daysOfWeek()
      var check = dayjs.tz('2015-02-01', 'Asia/Hong_Kong')
      expect(recurrence.matches(check)).toBe(true)
    })
  })

  test('daysOfMonth should work', () => {
    const recurrence = dayjs('2020-01-01').recur().every([1, 10]).daysOfMonth()
    expect(recurrence.matches(dayjs('2020-01-01'))).toBe(true)
    expect(recurrence.matches(dayjs('2020-01-02'))).toBe(false)
    expect(recurrence.matches(dayjs('2020-01-10'))).toBe(true)
    expect(recurrence.matches(dayjs('2020-01-15'))).toBe(false)
    expect(recurrence.matches(dayjs('2020-02-01'))).toBe(true)
    expect(recurrence.matches(dayjs('2020-02-02'))).toBe(false)
    expect(recurrence.matches(dayjs('2020-02-10'))).toBe(true)
    expect(recurrence.matches(dayjs('2020-02-15'))).toBe(false)
  })

  test('weeksOfMonth should work', () => {
    const recurrence = dayjs.recur().every([1, 3]).weeksOfMonth()

    expect(recurrence.matches(dayjs(startDate).date(6))).toBe(true)
    expect(recurrence.matches(dayjs(startDate).date(21))).toBe(true)
    expect(recurrence.matches(dayjs(startDate).date(26))).toBe(false)
  })

  test('weeksOfYear should work', () => {
    const recurrence = dayjs.recur().every(20).weekOfYear()
    expect(recurrence.matches(dayjs('2020-05-12'))).toBe(true)
    expect(recurrence.matches(dayjs(startDate))).toBe(false)
  })

  test('monthsOfYear should work', () => {
    const recurrence = dayjs.recur().every(1).monthsOfYear()
    expect(recurrence.matches(dayjs().month(1))).toBe(true)
    expect(recurrence.matches(dayjs().month(2))).toBe(false)
  })

  test('rules can be combined', () => {
    const valentines = dayjs
      .recur()
      .every(12)
      .daysOfMonth()
      .every(1)
      .monthsOfYear()

    expect(valentines.matches(dayjs('2020-02-12'))).toBe(true)
    // expect(valentines.matches(dayjs(startDate))).toBe(false)
  })

  test('can be passed units, without every()', () => {
    const recurrence = dayjs.recur().every([1, 3]).daysOfMonth()

    expect(recurrence.matches('2020-01-01')).toBe(true)
    expect(recurrence.matches('2020-01-03')).toBe(true)
    expect(recurrence.matches('2020-01-06')).toBe(false)
  })
})

describe('Rules', () => {
  test('should be overridden when duplicated', () => {
    const recurrence = dayjs(startDate).recur().every(1).day()
    recurrence.every(2).days()
    expect(recurrence.rules.length).toBe(1)
  })

  test('should be forgettable', () => {
    const recurrence = dayjs(startDate).recur().every(1).day()
    recurrence.forget('days')
    expect(recurrence.rules.length).toBe(0)
  })

  test('should be possible to see if one exists', () => {
    const recurrence = dayjs(startDate).recur().every(1).day()
    expect(recurrence.hasRule('days')).toBe(true)
    expect(recurrence.hasRule('months')).toBe(false)
  })
})

describe('weeksOfMonthByDay()', () => {
  test('can recur on the 1st and 3rd Sundays of the month', () => {
    var recurrence
    recurrence = dayjs
      .recur()
      .every(['Sunday'])
      .daysOfWeek()
      .every([0, 2])
      .weeksOfMonthByDay()
    expect(recurrence.matches(dayjs(startDate))).toBe(false)
    expect(recurrence.matches(dayjs(startDate).date(5))).toBe(true)
    expect(recurrence.matches(dayjs(startDate).date(8))).toBe(false)
    expect(recurrence.matches(dayjs(startDate).date(13))).toBe(false)
    expect(recurrence.matches(dayjs(startDate).date(19))).toBe(true)
    expect(recurrence.matches(dayjs(startDate).date(27))).toBe(false)
  })

  test('can recur on the 2nd, 4th and 5th Sundays and Thursdays of the month', () => {
    var recurrence
    recurrence = dayjs
      .recur()
      .every(['Sunday', 'Thursday'])
      .daysOfWeek()
      .every([1, 3, 4])
      .weeksOfMonthByDay()

    expect(recurrence.matches(dayjs(startDate).date(6))).toBe(false)
    expect(recurrence.matches(dayjs(startDate).date(12))).toBe(true)
    expect(recurrence.matches(dayjs(startDate).date(19))).toBe(false)
    expect(recurrence.matches(dayjs(startDate).date(26))).toBe(true)
    expect(recurrence.matches(dayjs(startDate).date(3))).toBe(false)
    expect(recurrence.matches(dayjs(startDate).date(9))).toBe(true)
    expect(recurrence.matches(dayjs(startDate).date(17))).toBe(false)
    expect(recurrence.matches(dayjs(startDate).date(23))).toBe(true)
    expect(recurrence.matches(dayjs(startDate).date(30))).toBe(true)
  })

  test('can recur on the 4th Wednesday of the month', () => {
    var recurrence
    recurrence = dayjs
      .recur()
      .every(dayjs('2017-09-27').day())
      .daysOfWeek()
      .every(dayjs('2017-09-27').monthWeekByDay())
      .weeksOfMonthByDay()

    expect(recurrence.matches(dayjs('2017-09-27'))).toBe(true)
    expect(recurrence.matches(dayjs('2017-10-25'))).toBe(true)
    expect(recurrence.matches(dayjs('2017-11-22'))).toBe(true)
    expect(recurrence.matches(dayjs('2017-12-27'))).toBe(true)
  })

  test('will throw an error if used without daysOfWeek()', () => {
    var recurrence,
      caught = { message: false }
    try {
      recurrence = dayjs.recur().every(0).weeksOfMonthByDay()
    } catch (e) {
      caught = e
    }
    expect(caught.message).toBe(
      'weeksOfMonthByDay must be combined with daysOfWeek'
    )
  })
})

describe('Future Dates', () => {
  test('can be generated', () => {
    var recurrence, nextDates
    recurrence = dayjs(startDate).recur().every(2).days()
    nextDates = recurrence.next(3, isoFormat)
    expect(nextDates.length).toBe(3)
    expect(nextDates[0]).toBe('2020-01-03')
    expect(nextDates[1]).toBe('2020-01-05')
    expect(nextDates[2]).toBe('2020-01-07')
  })

  test("can start from a temporary 'from' date", () => {
    var recurrence, nextDates
    recurrence = dayjs(startDate).recur().every(2).days()
    recurrence.fromDate('2020-02-05')
    nextDates = recurrence.next(3, isoFormat)
    expect(nextDates.length).toBe(3)
    expect(nextDates[0]).toBe('2020-02-06')
    expect(nextDates[1]).toBe('2020-02-08')
    expect(nextDates[2]).toBe('2020-02-10')
  })
})

describe('Previous Dates', () => {
  test('can be generated', () => {
    var recurrence, nextDates
    recurrence = dayjs(startDate).recur().every(2).days()
    nextDates = recurrence.previous(3, isoFormat)
    expect(nextDates.length).toBe(3)
    expect(nextDates[0]).toBe('2019-12-30')
    expect(nextDates[1]).toBe('2019-12-28')
    expect(nextDates[2]).toBe('2019-12-26')
  })
})

describe('All Dates', () => {
  test('can be generated', () => {
    var recurrence, allDates
    recurrence = dayjs(startDate).recur('2020-01-07').every(2).days()
    allDates = recurrence.all(isoFormat)
    expect(allDates.length).toBe(4)
    expect(allDates[0]).toBe('2020-01-01')
    expect(allDates[1]).toBe('2020-01-03')
    expect(allDates[2]).toBe('2020-01-05')
    expect(allDates[3]).toBe('2020-01-07')
  })

  test("can start from a temporary 'from' date", () => {
    var recurrence, allDates
    recurrence = dayjs().recur(startDate, '2020-01-08').every(2).days()
    recurrence.fromDate('2020-01-05')
    allDates = recurrence.all(isoFormat)
    expect(allDates.length).toBe(2)
    expect(allDates[0]).toBe('2020-01-05')
    expect(allDates[1]).toBe('2020-01-07')
  })

  test('should throw error if start date is after end date', () => {
    var recurrence,
      recurrence = dayjs().recur('2030-01-01', '2020-01-01').every(2).days()
    expect(() => {
      recurrence.all(isoFormat)
    }).toThrow(new Error('Start date cannot be later than end date.'))
  })

  test('should only generate a single date when start date and end date are the same', () => {
    var recurrence, allDates
    recurrence = dayjs().recur(startDate, startDate).every(1).days()
    allDates = recurrence.all(isoFormat)
    expect(allDates.length).toBe(1)
    expect(allDates[0]).toBe(startDate)
  })
})

describe('Exceptions', () => {
  var mo, exception, recur

  beforeEach(() => {
    mo = dayjs(startDate)
    exception = mo.clone().add(3, 'day')
    recur = mo.clone().recur().every(1, 'days')
  })

  test('should prevent exception days from matching', () => {
    recur.except(exception)
    expect(recur.matches(exception)).toBe(false)
  })

  test('should be removable', () => {
    recur.except(exception)
    recur.forget(exception)
    expect(recur.matches(exception)).toBe(true)
  })
})

describe('Options', () => {
  test('should be importable', () => {
    var recurrence = dayjs().recur({
      start: startDate,
      end: '2020-12-31',
      rules: [{ units: { 2: true }, measure: 'days' }],
      exceptions: ['2020-01-05'],
    })

    expect(recurrence.startDate().format(isoFormat)).toBe(startDate)
    expect(recurrence.endDate().format(isoFormat)).toBe('2020-12-31')
    expect(recurrence.rules.length).toBe(1)
    expect(recurrence.exceptions.length).toBe(1)
    expect(recurrence.matches('2020-01-03')).toBe(true)
    expect(recurrence.matches('2020-01-05')).toBe(false)
  })

  test('should be exportable', () => {
    const recurrence = dayjs(startDate)
      .recur('2020-12-31')
      .every(2, 'days')
      .except('2020-01-05')
    const data = recurrence.save()
    expect(data.start).toBe(startDate)
    expect(data.end).toBe('2020-12-31')
    expect(data.exceptions[0]).toBe('2020-01-05')
    expect(data.rules[0].units[2]).toBe(true)
    expect(data.rules[0].measure).toBe('days')
  })
})

describe('The repeats() function', () => {
  test('should return true when there are rules set', () => {
    const recurrence = dayjs().recur().every(1).days()
    expect(recurrence.repeats()).toBe(true)
  })

  test('should return false when there are no rules set', () => {
    const recurrence = dayjs().recur()
    expect(recurrence.repeats()).toBe(false)
  })
})
