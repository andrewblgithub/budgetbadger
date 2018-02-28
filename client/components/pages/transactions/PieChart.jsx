import React, { Component } from 'react';
import { Layer, Heading, Box } from 'grommet';
import forEach from 'lodash';
import c3 from 'c3'
import { Doughnut } from 'react-chartjs-2'

const PieChart = ({ breakdown, handleClose, displayModal }) => {
  const nums = breakdown.map(a => a[1]);
  const chartData = { 
    labels: breakdown.map(a => a[0]),
    datasets:[
    {
      label: 'test',
      data: nums,
      backgroundColor: ["rgb(248, 207, 73)","rgb(117, 183, 169)", "rgb(239, 253, 129)", "rgb(194, 223, 98)", "rgb(232, 80, 196)", "rgb(226, 163, 219)", "rgb(68, 151, 169)", "rgb(89, 194, 215)", "rgb(249, 213, 84)"]
    }]
  }
  return (
    displayModal ?
    <Layer closer={true} overlayClose={true} onClose={handleClose}>
    <Box pad="small">
      <Heading tag="h3" align="center" strong={true}> Category Breakdown </Heading>
      <Doughnut data={chartData} width="300" height="300" />
    </Box>
    </Layer> :
    null
  )
}

export default PieChart;