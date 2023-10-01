import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LineChart = ({time,price}) => {
  // Prepare data for the chart
  const data = {
    labels: time,
    datasets: [
      {
        label: 'ESOP price',
        data: price,
        fill: true,
        borderColor: 'black',
      },
    ],
  };

  // Set options for the chart
  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 16, // Adjust the font size for the y-axis
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Customize the color of the y-axis grid lines
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'ESOP price chart',
        font: {
          size: 18, // Adjust the font size for the title
        },
      },
      legend: {
        display: true, // Display the chart legend
        position: 'bottom', // Position the legend at the bottom
      },
      tooltips: {
        enabled: true, // Enable tooltips on hover
        backgroundColor: 'rgba(3,206,777, 0.8)', // Customize the background color of tooltips
        titleFont: {
          size: 14, // Adjust the font size for the tooltip title
          weight: 'bold', // Set the font weight for the tooltip title
        },
        bodyFont: {
          size: 12, // Adjust the font size for the tooltip content
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;