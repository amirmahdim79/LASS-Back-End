const moment = require('moment');
require('moment-timezone');

// Set the timezone to Iran
moment.tz.setDefault('Asia/Tehran');

const momentJalali = require('moment-jalaali');

moment.updateLocale('en', {
    week: {
        dow: 6, // Saturday
    },
});

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

const isSameWeek = (a = new Date(), b) => {
    const first = moment(a)
    const sec = moment(b)
    
    return first.isSame(sec, 'week')
}

const changeDayOfWeek = (originalDate, newDayOfWeek) => {
    const modifiedDate = moment(originalDate).isoWeekday(newDayOfWeek);
    return modifiedDate;
}

function changeDayOfMonth(originalDate, newDayOfMonth) {
    const modifiedDate = moment(originalDate).date(newDayOfMonth);
    return modifiedDate;
}

const generateWeeklyDates = (start, target, dayOfWeek) => {
    const dates = [];
    let currentDate = (dayOfWeek !== undefined && dayOfWeek !== null) ? changeDayOfWeek(moment(start), dayOfWeek) : moment(start)
    let targetDate = moment(target)
    let killSwitch = 0
  
    while (currentDate.isSameOrBefore(targetDate)) {
        if (killSwitch > 100) break 
        const newDate = (dayOfWeek !== undefined && dayOfWeek !== null) ? changeDayOfWeek(moment(currentDate.clone()), dayOfWeek) : currentDate.clone()
        if (!newDate.isBefore(new Date())) {
            dates.push(newDate);
        }

        currentDate.add(7, 'days');
        killSwitch += 1
    }
  
    return dates;
}

const generateMonthlyDates = (start, target, dayOfMonth = null) => {
    const dates = [];
    let currentDate = (dayOfMonth !== undefined && dayOfMonth !== null) ? changeDayOfMonth(moment(start), dayOfMonth) : moment(start)
    let targetDate = moment(target)
    let killSwitch = 0

    while (currentDate.isSameOrBefore(targetDate)) {
        if (killSwitch > 100) break 
        const newDate = (dayOfMonth !== undefined && dayOfMonth !== null) ? changeDayOfMonth(moment(currentDate.clone()), dayOfMonth) : currentDate.clone()
        if (!newDate.isBefore(new Date())) {
            dates.push(newDate);
        }

        currentDate.add(1, 'month');
        killSwitch += 1
    }
  
    return dates;
}

module.exports = {
    MOMENT: moment,
    MOMENT_JALALI: momentJalali,
    isNextDay,
    isSameDay,
    isToday,
    isYesterday,
    dayDiff,
    dayDiffExcludeHours,
    getYesterday,
    isSameWeek,
    generateWeeklyDates,
    generateMonthlyDates,
    changeDayOfWeek,
    changeDayOfMonth,
}