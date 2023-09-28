const moment = require('moment');
require('moment-timezone');

// Set the timezone to Iran
moment.tz.setDefault('Asia/Tehran');

const dayDiff = (a, b) => {
    const date1 = moment(a)
    const date2 = moment(b)
    
    return date1.diff(date2, 'days')
}

const dayDiffExcludeHours = (a, b) => {
    const date1 = moment(a).startOf('day')
    const date2 = moment(b).startOf('day')
    
    return date1.diff(date2, 'days')
}

const isNextDay = (a, b) => {
    const date1 = moment(a)
    const date2 = moment(b)
    const nextDay = date2.add(1, 'days')
    
    return (
        date1.isSame(nextDay, 'year') &&
        date1.isSame(nextDay, 'month') &&
        date1.isSame(nextDay, 'day')
    );
}

const isSameDay = (a, b) => {
    const date1 = moment(a)
    const date2 = moment(b)

    return (
        date1.isSame(date2, 'year') &&
        date1.isSame(date2, 'month') &&
        date1.isSame(date2, 'day')
    );
}

const isToday = (a) => {
    const date = moment(a)
    const now = moment()

    return (
        date.isSame(now, 'year') &&
        date.isSame(now, 'month') &&
        date.isSame(now, 'day')
    );
}

const isYesterday = (a) => {
    const date = moment(a)
    const now = moment()
    const lastDay = now.subtract(1, 'days')

    return (
        date.isSame(lastDay, 'year') &&
        date.isSame(lastDay, 'month') &&
        date.isSame(lastDay, 'day')
    );
}

const getYesterday = (a) => {
    const date = moment(a)
    const yesterday = date.subtract(1, 'days')

    return yesterday
}

module.exports = {
    MOMENT: moment,
    isNextDay,
    isSameDay,
    isToday,
    isYesterday,
    dayDiff,
    dayDiffExcludeHours,
    getYesterday,
}