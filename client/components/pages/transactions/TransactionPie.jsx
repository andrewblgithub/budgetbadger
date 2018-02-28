import React from 'react';
import { Doughnut } from 'react-chartjs-2'


const TransactionPie = ({ data, labels }) => {
  // data = [40, 60]
  const chartData = { 
    labels: labels,
    datasets:[
    {
      label: 'test',
      data: data,
      backgroundColor: ["rgb(71, 255, 178)", "rgba(95, 0, 96, 0.8)"]
    }]
  }
  // const options = {
  //     responsive: true,
  //     title: {
  //       display: true,
  //       text: 'Transaction Summary'
  //     },
  //     tooltips: {
  //       mode: 'label'
  //     },
  //     hover: {
  //       mode: 'dataset'
  //     },
  //     scales: {
  //       xAxes: [
  //         {
  //           display: true,
  //           scaleLabel: {
  //             show: true,
  //             labelString: 'Month'
  //           }
  //         }
  //       ],
  //       yAxes: [
  //         {
  //           id: 'y-axis-0',
  //           display: true,
  //           scaleLabel: {
  //             show: true,
  //             labelString: 'Value'
  //           },
  //           ticks: {
  //             suggestedMin: 0,
  //             suggestedMax: 5000
  //           }
  //         }
  //       ]
  //     }
  //   }
  return (
    <Doughnut width="300" height="300" data={chartData}/>
  )
}

export default TransactionPie;