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
      chartData: null,
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
      const {stockId,
        stockCompany,
        relatedTags,
        noOfOwners,
        recommendationPercent,
        averageStock,
        changePercent,
        stockData
      } = response.data
      this.setState({
        stockId,
        stockCompany,
        relatedTags,
        noOfOwners,
        recommendationPercent,
        averageStock,
        changePercent,
        chartData: stockData,
      })
    })
  }

  changeSelectedFilter(e) {
    this.setState({
      selectedFilter: e.target.id
    })
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

        {chartData && (
        <LineChartContainer 
        chart={chartData} 
        selectedChart={selectedFilter} 
        changePrice={price => this.changeCurrentPrice(price)} />
        )}

        <TimeFilter changeSelectedFilter={e => this.changeSelectedFilter(e)} />
      </div>
    );
  }
}

export default App;
