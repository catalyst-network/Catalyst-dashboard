import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          borderColor: '#16ac9f',

          data: [19, 20, 19],
        },
      ],
    },
    options: {
      backgroundColor: '#16ac9f',
      borderColor: '#16ac9f',
      legend: {
        display: false,
      },
      tooltips: {
        displayColors: false,
        model: 'index',
        axis: 'x',
      },
      maintainAspectRatio: false,
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
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    const array = [];
    const labels = [];
    for (let i = 0; i < 50; i += 1) {
      array.push(getRandomInt(1, 100));
      labels.push(`Ledger Cycle: ${i}`);
    }
    this.chartdata.labels = labels;

    this.chartdata.datasets[0].data = array;
    this.renderChart(this.chartdata, this.options);
  },
};
