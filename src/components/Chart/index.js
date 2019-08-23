import { Bar, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  data: () => ({
    // chartdata: {
    //   labels: [],
    //   datasets: [
    //     {
    //       backgroundColor: '#16ac9f',
    //       data: [19, 20, 19],
    //     },
    //   ],
    // },
    options: {
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
            beginAtZero: true,
          },
          gridLines: {
            display: false,
          },
        }],
        yAxes: [{
          ticks: {
            min: 18,
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
          },
        }],
      },
    },
  }),

  mounted() {
    // function getRandomInt(min, max) {
    //   min = Math.ceil(min);
    //   max = Math.floor(max);
    //   return Math.floor(Math.random() * (max - min)) + min;
    // }

    // const array = [];
    // const labels = [];
    // for (let i = 0; i < 50; i += 1) {
    //   array.push(getRandomInt(1, 100));
    //   labels.push(`Ledger Cycle: ${i}`);
    // }
    // this.chartdata.labels = labels;

    // this.chartdata.datasets[0].data = array;
    this.renderChart(this.chartData, this.options);
  },
};
