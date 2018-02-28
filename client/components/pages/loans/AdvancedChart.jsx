import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class AdvancedChart extends React.Component {
  constructor(props){
    super(props)
  }

  
  render(){
    const chartData = {
      labels: [...this.props.chartDates],
      datasets: [{
          label: 'Amount Outstanding',
          data: [...this.props.chartPrincipal],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
              'rgba(255,99,132,1)',
          ],
          borderWidth: 1
      }, {
        label: 'Total Paid',
          data: [...this.props.chartOutstanding],
          backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
              'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
      }]
  };
    const options = {
      responsive: true,
      title: {
        display: true,
        text: 'Transaction Summary'
      },
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
              suggestedMax: this.props.principal
            }
          }
        ]
      },
      annotation: {
        events: ['mouseover'],
        annotations: [{
          type: 'box',
          yScaleID: 'y-axis-0',
          yMin: 0,
          yMax: 50000,
          // borderColor: 'blue',
          backgroundColor: "rgba(238, 119, 119, 0.54)",
        },
        {
          type: 'line',
          mode: 'horizontal',
          value: 25000,
          borderDash: [2,2],
          borderColor: 'red',
          scaleID: 'y-axis-0',
        },
        ]
      }
    };
    return(
      <div>
        <Line data={chartData} width="1200" height="500" options={options}/>
      </div>
    )
  }
}

module.exports = AdvancedChart;

