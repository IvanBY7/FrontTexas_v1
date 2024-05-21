<!-- components/GaugeChart.vue -->
<template>
  <div ref="chart" style="width: 100%; height: 400px;" />
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'GaugeChart',
  props: {
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
      myChart: null
    }
  },
  watch: {
    valor (newValue) {
      // Cuando cambia el valor desde el padre, actualiza el gráfico
      this.updateChart(newValue)
    }
  },
  mounted () {
    this.initChart()
    this.updateChart(this.valor) // Inicia el gráfico con el valor inicial

    // Actualiza el gráfico cada 2 segundos (opcional)
    setInterval(() => {
      this.updateChart(this.valor)
    }, 2000)
  },
  beforeDestroy () {
    if (this.myChart) {
      this.myChart.dispose()
    }
  },
  methods: {
    initChart () {
      // Inicializa ECharts
      this.myChart = echarts.init(this.$refs.chart)
      // Opciones del gráfico
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
                  [(this.valormin / 150), '#cc0000'],
                  [(this.valormax / 150), '#007500'],
                  [1, '#cc0000']
                ]
              }
            },
            pointer: {
              itemStyle: {
                color: 'auto'
              }
            },
            axisTick: {
              distance: -30,
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
              fontSize: 15
            },
            detail: {
              valueAnimation: true,
              formatter: '{value}°C',
              color: 'inherit'
            },
            data: [
              {
                value: this.valor
              }
            ]
          }
        ]
      }

      // Establece las opciones iniciales del gráfico
      this.myChart.setOption(option)
    },
    updateChart (newValue) {
      // Actualiza los datos del gráfico
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
  </style>
