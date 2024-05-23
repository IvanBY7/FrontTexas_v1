<!-- components/LiquidFillChart.vue -->
<template>
  <div ref="chart" class="chart-container" @click="handleClick" />
</template>

<script>
import * as echarts from 'echarts/core'
import 'echarts-liquidfill'

export default {
  name: 'LiquidFillChart',
  props: {
    data: {
      type: Number,
      default: 0
    },
    maximo: {
      type: Number,
      default: 0
    },
    minimo: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      chart: null,
      resizeObserver: null
    }
  },
  mounted () {
    this.initChart()
    this.addResizeObserver()
  },
  beforeDestroy () {
    if (this.resizeObserver) {
      this.resizeObserver.unobserve(this.$refs.chart)
      this.resizeObserver.disconnect()
    }
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    initChart () {
      let color = ''
      let colorbackground = ''
      if (this.minimo > this.data || this.maximo < this.data) {
        color = '#cf2d2d'
        colorbackground = '#f5d0d0'
      } else {
        color = '#294D99'
        colorbackground = '#E1F5FD'
      }
      const dato = this.data / 100
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption({
        series: [
          {
            type: 'liquidFill',
            data: [dato],
            color: [color],
            backgroundStyle: {
              color: colorbackground
            },
            label: {
              color: `${color}`
            },
            outline: {
              show: true,
              borderDistance: 8,
              itemStyle: {
                color: 'none',
                borderColor: color,
                borderWidth: 8,
                shadowBlur: 20,
                shadowColor: 'rgba(0, 0, 0, 0.25)'
              }
            }
          }
        ]
      })
    },
    addResizeObserver () {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.chart) {
          this.chart.resize()
        }
      })
      this.resizeObserver.observe(this.$refs.chart)
    },
    handleClick () {
      this.$emit('chart-click')
    }
  }
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 600px;
  cursor: pointer;
}
@media screen and (max-width: 769px), print {
  .chart-container{
    width: 100%;
    height: 350px;
  }
}
</style>
