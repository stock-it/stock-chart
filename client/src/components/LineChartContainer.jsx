import React from 'react';
import { PropTypes } from 'prop-types';
import LineChart from './LineChart';
import ToolTip from './ToolTip';

class LineChartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverLoc: null,
      activePoint: null
    }
  }

  
  getCords(e) {
    e.preventDefault();
  }
  
  handleChartHover(hoverLoc, activePoint) {
    const { changePrice } = this.props;
    changePrice(activePoint);
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint
    })
  }
  render() {
    const { activePoint, hoverLoc } = this.state;
    const { chart, selectedChart } = this.props;
    return (
      <React.Fragment>
        <div className='stock-chart-popup'>
          {hoverLoc && (<ToolTip hoverLoc={hoverLoc} activePoint={activePoint} filter={selectedChart} />)}
        </div>
        <div id='stock-chart-graph'>
          {chart && chart[selectedChart] && (
          <LineChart 
            chartData={chart[selectedChart]} 
            onChartHover={ (a,b) => this.handleChartHover(a,b) } />
          )}
        </div>
      </React.Fragment>
    )
  }
}

LineChartContainer.propTypes = {
  chart: PropTypes.shape({
    day: PropTypes.arrayOf(PropTypes.object),
    week: PropTypes.arrayOf(PropTypes.object),
    month: PropTypes.arrayOf(PropTypes.object),
    threeMonth: PropTypes.arrayOf(PropTypes.object),
    year: PropTypes.arrayOf(PropTypes.object),
    fiveYear: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

export default LineChartContainer;
