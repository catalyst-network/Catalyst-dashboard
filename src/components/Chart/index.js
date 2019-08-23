import { Bar, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  data: () => ({
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
          },
          gridLines: {
            display: false,
          },
        }],
        yAxes: [{
          ticks: {
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
    this.renderChart(this.chartData, this.options);
  },
};
