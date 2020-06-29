import dayjs from 'dayjs'
import dayjsRecur from '../index'

dayjs.extend(dayjsRecur)

const startDate = '2020-01-01'
const endDate = '2021-01-01'

const isoFormat = 'YYYY-MM-DD'

describe('Creating a recurrence', () => {
  var now = dayjs()
  var nowDate = now.format(isoFormat)

  test('from dayjs constructor, with options parameter - dayjs.recur(options)', () => {
    var recur = dayjs.recur({ start: startDate, end: endDate })
    expect(recur.start.format(isoFormat)).toBe(startDate)
    expect(recur.end.format(isoFormat)).toBe(endDate)
  })

  test('from dayjs constructor, with start parameter only - dayjs.recur(start)', () => {
    var recur = dayjs.recur(startDate)
    expect(recur.start.format(isoFormat)).toBe(startDate)
  })

  test('from dayjs constructor, with start and end parameters - dayjs.recur(start, end)', () => {
    var recur = dayjs.recur(startDate, endDate)
    expect(recur.start.format(isoFormat)).toBe(startDate)
    expect(recur.end.format(isoFormat)).toBe(endDate)
  })

  test('from dayjs function, with options parameter - dayjs().recur(options)', () => {
    var recur = dayjs().recur({ start: startDate, end: endDate })
    expect(recur.start.format(isoFormat)).toBe(startDate)
    expect(recur.end.format(isoFormat)).toBe(endDate)
  })

  test('from dayjs function, with start and end parameters - dayjs().recur(start, end)', () => {
    var recur = dayjs().recur(startDate, endDate)
    expect(recur.start.format(isoFormat)).toBe(startDate)
    expect(recur.end.format(isoFormat)).toBe(endDate)
  })

  test('from dayjs function, with starting dayjs and end parameter - dayjs(start).recur(end)', () => {
    var recur = dayjs(startDate).recur(endDate)
    expect(recur.start.format(isoFormat)).toBe(startDate)
    expect(recur.end.format(isoFormat)).toBe(endDate)
  })

  test('from dayjs function, starting now, with end parameter  - dayjs().recur(end)', () => {
    var recur = now.recur(endDate)
    expect(recur.start.format(isoFormat)).toBe(nowDate)
    expect(recur.end.format(isoFormat)).toBe(endDate)
  })

  test('from dayjs function, starting now - dayjs().recur()', () => {
    var recur = now.recur()
    expect(recur.start.format(isoFormat)).toBe(nowDate)
  })

  test('from dayjs function, with starting dayjs and end parameter, which is a dayjs object - dayjs(start).recur(end)', () => {
    var startMoment = dayjs(startDate)
    var endMoment = dayjs(endDate)
    var recur = dayjs(startMoment).recur(endMoment)
    expect(recur.start.format(isoFormat)).toBe(startDate)
    expect(recur.end.format(isoFormat)).toBe(endDate)
  })
})
