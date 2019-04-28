module.exports = {
  timeFrames: {
    daily: 'day',
    weekly: 'week',
    monthly: 'month',
    Quarterly: 'threeMonth',
    Annually: 'year',
    Quinquennial: 'fiveYear',
  },
  combineResponses: ({
    ticker,
    average_stock,
    change_percent,
    company,
    num_owners,
    recommendation_percent,
    related_tags,
  }, {
    day,
    week,
    month,
    threeMonth,
    year,
    fiveYear,
  }) => ({
    stockId: ticker,
    stockInfo: {
      stockCompany: company,
      relatedTags: related_tags,
      noOfOwners: num_owners,
      recommendationPercent: recommendation_percent,
    },
    stockData: {
      day: day.rows.map(val => val.price),
      week: week.rows.map(val => val.price),
      month: month.rows.map(val => val.price),
      threeMonth: threeMonth.rows.map(val => val.price),
      year: year.rows.map(val => val.price),
      fiveYear: fiveYear.rows.map(val => val.price)
    },
    averageStock: average_stock,
    changePercent: change_percent,
  })
};