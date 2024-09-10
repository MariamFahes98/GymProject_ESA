export const dataLine = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55, 60],
            fill: false,
            backgroundColor: 'purple',
            borderColor: 'rgba(214, 188, 250, 1)',
        },
    ],
};

export const dataBar = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [
        {
            label: 'Quantity',
            data: [12, 19, 3, 5],
            backgroundColor: 'rgba(214, 188, 250, 1)',
            borderColor: 'rgba(214, 188, 250, 1)',
            borderWidth: 1,
        },
    ],
};



// Donut chart data
export const donutData = {
  labels: ['Stratching', 'Crossfit', 'Yoga'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: [
        '#DDA0DD',
        '#800080',
        '#E6E6FA',
      ],
      borderColor: [
        '#452c63',
        '#4B0082',
        '#33006F',
      ],
      borderWidth: 1,
    },
  ],
};

// Donut chart options
export const donutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.label + ': ' + tooltipItem.raw;
        },
      },
    },
  },
  
};
