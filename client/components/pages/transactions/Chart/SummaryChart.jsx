import React, { Component } from 'react';
import { Line, Chart } from 'react-chartjs-2';
import { Layer, Select, CheckBox } from 'grommet';
// import 'chartjs-plugin-annotation'

class HistoricalChart extends Component {
  constructor() {
    super()
  }

  render() {
    const { min, max, center } = this.props.annotations
    const options = {
      responsive: true,
      // title: {
      //   display: true,
      //   text: 'Transaction Summary'
      // },
      tooltips: {
        mode: 'label'
      },
      hover: {
        mode: 'dataset'
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              show: true,
              labelString: 'Month'
            }
          }
        ],
        yAxes: [
          {
            id: 'y-axis-0',
            display: true,
            scaleLabel: {
              show: true,
              labelString: 'Value'
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 5000
            }
          }
        ]
      },
      annotation: {
        events: ['mouseover'],
        annotations: [{
          type: 'box',
          yScaleID: 'y-axis-0',
          yMin: min,
          yMax: max,
          // borderColor: 'blue',
          backgroundColor: ["rgba(238, 119, 119, 0.54)","rgb(248, 207, 73)","rgb(117, 183, 169)"],
          // label: {    
          // enabled: false,
          // content: 'Test label'},
          // onMouseover: function(e) {
          //   var element = this;
          //   element.options.borderWidth = 7;
          //   element.options.label.enabled = true;
          //   element.options.label.content = e.type;
          //   element.chartInstance.update();
          //   element.chartInstance.chart.canvas.style.cursor = 'pointer';
          // }
        },
        {
          type: 'line',
          mode: 'horizontal',
          value: center,
          borderDash: [2,2],
          borderColor: 'red',
          scaleID: 'y-axis-0',
        },
        ]
      }
    }
    return (
      <div>
        <div>
          <Line 
            data={this.props.chartData} 
            options={options} 
            width="500" 
            height="400" 
            getElementAtEvent={(element) => this.props.handleChartClick(element)}/>
        </div>
        <CheckBox label='Toggle Total'
          toggle={true}
          disabled={false}
          reverse={true} 
          checked={this.props.displayTotal}
          onChange={() => this.props.toggleTotal()}/>
        <CheckBox label='Toggle Goals'
          toggle={true}
          disabled={false}
          reverse={true} 
          checked={this.props.displayGoal}
          onChange={() => this.props.toggleGoal()}/>
        <Select 
          placeHolder="Select a category"
          options={this.props.categories}
          value={this.props.filter.category}
          onChange={({value}) => {
            this.props.updateFilter('category', value, () => {
              this.props.renderChart();
            })
          }}
        />
        <Select 
          placeHolder="Select an account"
          options={this.props.accounts}
          value={this.props.filter.account}
          onChange={({value}) => {
            this.props.updateFilter('account', value, () => {
              this.props.renderChart();
            })
          }}
        />
      </div>
    )
  }
}

export default HistoricalChart