import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: new Array(50),
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#16ac9f',
          data: [19, 20, 19],
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 9,
      scales: {
        xAxes: [{
          ticks: {
            display: false,
          },
          gridLines: {
            display: false,
          },
        }],
        yAxes: [{
          ticks: {
            min: 18,
            display: false,
          },
          gridLines: {
            display: false,
          },
        }],
      },
    },
  }),

  mounted() {
    const array = [];
    const labels = [];
    for (let i = 0; i < 50; i += 1) {
      array.push(19);
      labels.push('');
    }
    // this.chartdata.labels = labels;
    // array.push(20);
    this.chartdata.datasets[0].data = array;
    this.renderChart(this.chartdata, this.options);
  },
};
