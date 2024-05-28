import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}

// import { Doughnut, mixins } from 'vue-chartjs'
// const { reactiveProp } = mixins

// export default {
//   name: 'DoughnutChart',
//   extends: Doughnut,
//   mixins: [reactiveProp],
//   props: {
//     chartData: {
//       type: Object,
//       required: true
//     },
//     options: {
//       type: Object,
//       default: () => ({})
//     }
//   },
//   mounted () {
//     this.renderChart(this.chartData, this.options)
//   }
// }
