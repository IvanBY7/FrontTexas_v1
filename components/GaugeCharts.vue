<!-- components/GaugeChart.vue -->
<template>
  <div ref="chart" class="chart-contain" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'GaugeChart',
  props: {
    valorsize: {
      type: Number,
      default: 0
    },
    fontsize: {
      type: Number,
      default: 0
    },
    valor: {
      type: Number,
      default: 0
    },
    valormin: {
      type: Number,
      default: 0
    },
    valormax: {
      type: Number,
      default: 0
    },
    tipodato: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      myChart: null,
      intervalId: null,
      resizeObserver: null
    }
  },
  mounted () {
    this.initChart()
    this.updateChart(this.valor, this.tipodato)

    this.intervalId = setInterval(() => {
      this.updateChart(this.valor, this.tipodato)
    }, 15000)

    this.resizeObserver = new ResizeObserver(() => {
      this.myChart.resize()
    })
    this.resizeObserver.observe(this.$refs.chart)
  },
  beforeDestroy () {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
    if (this.myChart) {
      this.myChart.dispose()
      this.myChart = null
    }
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.$refs.chart)
    }
  },
  methods: {
    initChart () {
      console.log(this.tipodato)
      this.myChart = echarts.init(this.$refs.chart)
      const option = {
        series: [
          {
            type: 'gauge',
            min: 0,
            max: this.valormax * 1.5,
            axisLine: {
              lineStyle: {
                width: 30,
                color: [
                  [this.valormin / (this.valormax * 1.5), '#cf2d2d'],
                  [this.valormax / (this.valormax * 1.5), '#294D99'],
                  [1, '#cf2d2d']
                ]
              }
            },
            pointer: {
              itemStyle: {
                color: 'auto',
                with: 10
              }
            },
            axisTick: {
              distance: -20,
              length: 10,
              lineStyle: {
                color: '#fff',
                width: 2
              }
            },
            splitLine: {
              distance: -30,
              length: 30,
              lineStyle: {
                color: '#fff',
                width: 4
              }
            },
            axisLabel: {
              color: 'inherit',
              distance: 40,
              fontSize: this.fontsize
            },
            detail: {
              valueAnimation: true,
              formatter: `${this.valor}${this.tipodato}`,
              color: 'inherit',
              fontSize: this.valorsize
            },
            data: [
              {
                value: this.valor
              }
            ]
          }
        ]
      }

      this.myChart.setOption(option)
    },
    updateChart (newValue) {
      this.myChart.setOption({
        series: [
          {
            data: [
              {
                value: newValue
              }
            ]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
/* Estilos específicos del componente */
.chart-contain{
  width: 100%;
  height: 300px;
}
@media screen and (max-width: 850px), print {
  .chart-contain{
    width: 100%;
    height: 250px;
  }
}
</style>
