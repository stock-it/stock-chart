import React from 'react';
import LineChartContainer from './LineChartContainer';
import TimeFilter from './TimeFilter';
import StockInfo from './StockInfo';
import CompanyInfo from './CompanyInfo';
import TagContainer from './TagContainer';
import API from './api';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stockId: null,
      chartData: {},
      averageStock: null,
      changePercent: null,
      selectedFilter: 'day',
      currentPrice: null,
      stockCompany: null,
      relatedTags: [],
      noOfOwners: null,
      recommendationPercent: null,
    };
  }
  

  componentDidMount() {
    const { stockId } = this.props.match ? this.props.match.params : { stockId: null };
    API.get((stockId && `/api/stocks/${stockId}`) || `/api/stocks/TSLA`)
    .then((response) => {
      const {ticker,
        company,
        related_tags,
        num_owners,
        recommendation_percent,
        average_stock,
        change_percent,
      } = response.data
      this.setState({
        stockId: ticker,
        stockCompany: company,
        relatedTags: related_tags,
        noOfOwners: num_owners,
        recommendationPercent: recommendation_percent,
        averageStock: average_stock,
        changePercent: change_percent,
      }, this.getPriceData('day'))
    });
  }

  getPriceData(interval) {
    const { stockId } = this.props.match ? this.props.match.params : { stockId: null };
    API.get(`api/quotes/${stockId || 'TSLA'}/${interval}`)
      .then(response => {
        console.log(response);
        const { chartData } = this.state;
        const prices = response.data.map(val => val.price);
        chartData[interval] = prices;
        this.setState({
          chartData,
          selectedFilter: interval,
        })
      })
  }

  changeSelectedFilter(e) {
    this.getPriceData(e.target.id);
  }


  changeCurrentPrice(activePoint) {
    this.setState({
      currentPrice: activePoint ? activePoint.price : null
    })
  }

  render() {
    const { chartData,
      relatedTags,
      stockCompany,
      noOfOwners,
      recommendationPercent,
      stockId,
      averageStock,
      changePercent,
      selectedFilter,
      currentPrice,
    } = this.state;
    return (
      <div id="stock-chart-container">
        {stockId && (<TagContainer tags={relatedTags} />)}

        {stockId && (
        <CompanyInfo 
          companyName={stockCompany} 
          noOfOwners={noOfOwners}
          recommendation={recommendationPercent}
        />
        )}

        {stockId && 
        (
          <StockInfo 
            averageStock={averageStock}
            changePercent={changePercent}
            currentPrice={currentPrice} 
          />
          )}

        {chartData[selectedFilter] && (
        <LineChartContainer 
          chart={chartData} 
          selectedChart={selectedFilter} 
          changePrice={price => this.changeCurrentPrice(price)}
        />
        )}

        <TimeFilter changeSelectedFilter={e => this.changeSelectedFilter(e)} />
      </div>
    );
  }
}

export default App;
