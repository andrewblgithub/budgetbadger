import React, { Component } from 'react';
import Layer from 'grommet/components/Layer';
import TransactionChart from './SummaryChart.jsx'
import {
  filterTransactionsByValue,
  generateDailyData,
  generateMonthlyData
} from './chartHelpers.jsx'

class SummaryChartContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      chartData: {}, 
      displayAnnual: true,
      displayTotal: false,
      month: '',
      filter: {},
      filteredTransactions: [],
      accounts: [],
      categories: [],
    }
    this.handleChartClick = this.handleChartClick.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.toggleTotal = this.toggleTotal.bind(this);
  }

  // Below checks whether or not a month has been selected
  // if true, the chart will render daily transactions for the selected month
  // else it will reset to all transactions for the year

  handleChartClick(element) {
    let chartData, month;
    if (this.state.displayAnnual) {
      month = this.state.chartData.labels[element[0]._index];
      chartData = generateDailyData(this.state.filteredTransactions, month);
    } else {
      chartData = generateMonthlyData(this.state.filteredTransactions);
    }    
    this.setState({
      month,
      chartData,
      displayAnnual: !this.state.displayAnnual
    })
  }

  // Enables users to add a total spending dataset to the chart
  // in order to compare filtered data to total spend.

  toggleTotal () {
    let { chartData } = this.state, total;
    // checks state of the chart
    if (!this.state.displayTotal) {
      if (this.state.displayAnnual) {
        total = generateMonthlyData(this.props.transactions);
        total.datasets[0].label = 'Monthly Totals'
      } else {
        total = generateDailyData(this.props.transactions, this.state.month);
        total.datasets[0].label = 'Daily Totals'
      }
      total.datasets[0].backgroundColor = "rgb(148, 0, 211)"
      chartData.datasets.push(total.datasets[0]);
      // if total is already displayed, remove it
    } else {
      chartData.datasets.splice(1)
    }
    this.setState({
      chartData,
      displayTotal: !this.state.displayTotal
    })
  }

  renderChart() {
    const filteredTransactions = filterTransactionsByValue(this.props.transactions, this.state.filter);
    // check current state of the chart
    const chartData = this.state.displayAnnual ?
    generateMonthlyData(filteredTransactions) :
    generateDailyData(filteredTransactions, this.state.month);

    this.setState({
      filteredTransactions,
      chartData
    })
  }

  // adds or removes key-value pairs from filter object
  updateFilter(key, value, callback) {
    let { filter } = this.state;
    value === 'none' ?
    delete filter[key] :
    filter[key] = value;
    this.setState({
      filter
    }, () => callback());
  }

  componentDidMount(){
    this.renderChart();
  }

  componentWillReceiveProps({categories, accounts}){
    categories = categories.map(a => a[0]);
    accounts = accounts.map(a => a.bank_name);
    accounts.unshift('none');
    categories.unshift('none');
    this.setState({
      categories,
      accounts,
    })
  }

  render() {
    return (
      this.props.displaySummary ?
      <Layer
        closer={true}
        overlayClose={true}
        padding="small"
        flush={true}
        onClose={this.props.handleSummary}>
        <TransactionChart 
          categories={this.state.categories}
          accounts={this.state.accounts}
          renderChart={this.renderChart}
          toggleTotal={this.toggleTotal}
          chartData={this.state.chartData}
          updateFilter={this.updateFilter}
          displayTotal={this.state.displayTotal}
          filter={this.state.filter}
          handleChartClick={this.handleChartClick}/>
      </Layer> :
      null
    )
  }

}

export default SummaryChartContainer;