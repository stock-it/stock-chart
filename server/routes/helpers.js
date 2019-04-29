module.exports = {
  timeFrames: {
    day: 'daily',
    week: 'weekly',
    month: 'monthly',
    threeMonth: 'Quarterly',
    year: 'Annually',
    fiveYear: 'Quinquennial',
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
    stockCompany: company,
    relatedTags: related_tags,
    noOfOwners: num_owners,
    recommendationPercent: recommendation_percent,
    averageStock: average_stock,
    changePercent: change_percent,
    stockData: {
      day: day.rows.map(val => val.price),
      week: week.rows.map(val => val.price),
      month: month.rows.map(val => val.price),
      threeMonth: threeMonth.rows.map(val => val.price),
      year: year.rows.map(val => val.price),
      fiveYear: fiveYear.rows.map(val => val.price)
    },
  })
};