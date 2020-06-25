const moment = require('moment')
require('moment-recur')

const dayjs = require('dayjs')
const dayjsRecur = require('./dayjs-recur')

dayjs.extend(dayjsRecur)

const now = dayjs()

console.log(now)
