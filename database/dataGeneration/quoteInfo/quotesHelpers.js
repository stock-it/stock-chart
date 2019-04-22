const faker = require('faker');

let today = new Date();
today.getDay() === 6 ?
(today = new Date(today - 86400000)) 
: today.getDay() === 0 
? (today = new Date(today - (86400000 * 2)))
: '';

const dayInfo = {
  date: today.getDate(),
  month: today.getMonth(),
  year: today.getFullYear(),
  day: today.getDay(),
  fullDay: today,
}

const getTimeIntervals = (minInterval, startTime = 0, endTime = 24) => {
  const times = [];
  let time = startTime;
  const suffix = ['AM', 'PM'];

  for (var i = 0; time < endTime; i += 1) {
    let hrs = Math.floor(time / 60);
    let min = (time % 60);
    times.push(("0" + (hrs % 12)).slice(-2) + ':' + ("0" + min).slice(-2) + suffix[Math.floor(hrs / 12)]);
    time = time + minInterval;
  }
  return times;
}

const dailyTimeIntervals = getTimeIntervals(5, 9 * 60, 18 * 60);

const generateDailyPrices = (basePrice, stockId) => {
  const { date, month, year } = dayInfo;

  let hour, min;
  let chunk = [];

  for (let i = 0; i < dailyTimeIntervals.length; i += 1) {
    hour = Number(dailyTimeIntervals[i].slice(0,2));
    hour < 9 ? (hour = hour + 12) : '';
    min = Number(dailyTimeIntervals[i].slice(3,5));
    basePrice = basePrice * (faker.random.number({ min: 97, max: 103 }) / 100);
    chunk.push(`${stockId}|${basePrice}|${new Date(year, month, date, hour, min).toISOString()}|daily\n`);
  }
  return chunk.join('');
}

const weeklyTimeIntervals = getTimeIntervals(10, 9 * 60 + 30, 15 * 60 + 50)

const generateWeeklyPrices = (basePrice, stockId) => {
  let chunk = [];
  const { date, month, year, day } = dayInfo;

  let hour, min;

  for (let d = date - 6; d <= date; d++) {
    if (d === date - day || d === date - (day + 1)) {
      continue;
    } else {
      for (let i = 0; i < weeklyTimeIntervals.length; i += 1) {
        hour = Number(weeklyTimeIntervals[i].slice(0,2));
        hour < 9 ? (hour = hour + 12) : '';
        min = Number(weeklyTimeIntervals[i].slice(3,5));
        basePrice = basePrice * (faker.random.number({ min: 97, max: 103 }) / 100);

        chunk.push(`${stockId}|${basePrice}|${new Date(year, month, d, hour, min).toISOString()}|weekly\n`);
      }
    }
  }
  return chunk.join('');
}

const monthlyTimeIntervals = [10, 11, 12, 13, 14, 15];

const generateMonthlyPrices = (basePrice, stockId) => {
  let chunk = [];
  const { fullDay } = dayInfo;

  for (let d = 30; d > 0; d -= 1) {
    const date = new Date(fullDay - 86400000 * d);
    date.setMinutes(0);
    if (date.getDay() === 5 || date.getDay() === 6) {
      continue;
    } else {
      for (let i = 0; i < monthlyTimeIntervals.length; i++) {
        let newDate = new Date (date.setHours(monthlyTimeIntervals[i]))
        basePrice = basePrice * (faker.random.number({ min: 97, max: 103 }) / 100);

        chunk.push(`${stockId}|${basePrice}|${newDate.toISOString()}|monthly\n`);
      }
    }
  }
  return chunk.join('');
}

const generatePricesPerPeriod = (basePrice, stockId, daysBack, interval) => {
  const { fullDay } = dayInfo;
  let chunk = [];

  for (let d = 1; d < daysBack; d += 1) {
    const date = new Date(fullDay - 86400000 * d);
    date.setMinutes(0);
    date.setHours(17);
    if (date.getDay() === 5 || date.getDay() === 6) {
      continue;
    } else {
      basePrice = basePrice * (faker.random.number({ min: 97, max: 103 }) / 100);
      chunk.push(`${stockId}|${basePrice}|${date.toISOString()}|${interval}\n`)
    }
  }
  return chunk.join('');
}

module.exports.generateDailyPrices = generateDailyPrices;
module.exports.generateWeeklyPrices = generateWeeklyPrices;
module.exports.generateMonthlyPrices = generateMonthlyPrices;
module.exports.generatePricesPerPeriod = generatePricesPerPeriod;
