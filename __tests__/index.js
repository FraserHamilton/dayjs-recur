import dayjs from 'dayjs'
import dayjsRecur from '../index'

import moment from 'moment'
import 'moment-recur'

dayjs.extend(dayjsRecur)

test('between gets date between two dates', () => {
  //   console.log(moment().dateOnly().format())
  //   console.log(dayjs().dateOnly().format())
  console.log(moment().monthWeekByDay())
  console.log(dayjs().monthWeekByDay())
})
