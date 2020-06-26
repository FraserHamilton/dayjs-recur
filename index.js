import utc from 'dayjs/plugin/utc'

export default (option, dayjsClass, dayjsFactory) => {
  dayjsFactory.extend(utc)

  //   var Recur = function (options) {
  //     if (options.start) {
  //       this.start = moment(options.start).dateOnly()
  //     }

  //     if (options.end) {
  //       this.end = moment(options.end).dateOnly()
  //     }

  //     // Our list of rules, all of which must match
  //     this.rules = options.rules || []

  //     // Our list of exceptions. Match always fails on these dates.
  //     var exceptions = options.exceptions || []
  //     this.exceptions = []
  //     for (var i = 0; i < exceptions.length; i++) {
  //       this.except(exceptions[i])
  //     }

  //     // Temporary units integer, array, or object. Does not get imported/exported.
  //     this.units = null

  //     // Temporary measure type. Does not get imported/exported.
  //     this.measure = null

  //     // Temporary from date for next/previous. Does not get imported/exported.
  //     this.from = null

  //     return this
  //   }

  //   dayjsFactory.recur = function (start, end) {
  //     return 'foo'

  //     return new Recur({ start: start, end: end })
  //   }

  // Plugin for removing all time information from a given date
  dayjsClass.prototype.dateOnly = function () {
    return this.startOf('day').add(this.utcOffset(), 'minute').utc()
  }
  //   dayjsClass.dateOnly = function () {
  //     return this.hours(0)
  //       .minutes(0)
  //       .seconds(0)
  //       .milliseconds(0)
  //       .add(this.utcOffset(), 'minute')
  //       .utcOffset(0)
  //   }
}
