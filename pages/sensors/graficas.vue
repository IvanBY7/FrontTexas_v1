<template>
  <div class="container m-3">
    <!-- Widget 3: Humedad -->
    <div v-if="sensor.tipo.Indice_widget == '3'" class="humedad">
      <div class="columns is-multiline">
        <!-- Gráfica de Línea -->
        <div class="column left has-text-centered is-one-quarter-desktop">
          <div class="cont_grafica">
            <div class="grafic">
              <line-chart v-if="datacollection" :chart-data="datacollection" :extra-options="options" />
            </div>
          </div>
        </div>
        <!-- Gráfica de Dona -->
        <div class="column right has-text-centered is-multiline">
          <div class="cont_grafica">
            <div class="grafic">
              <doughnut-chart :chart-data="doughnutData" :options="doughnutOptions" />
              <p class="leyenda">
                {{ valordona }}%
              </p>
              <p class="leyenda">
                Humedad min {{ rangoMin }}%, max {{ rangoMax }}%
              </p>
            </div>
          </div>
          <div class="cont_tabla">
            <h1>Tabla de datos</h1>
            <hr>
            <table class="table is-striped is-bordered">
              <thead>
                <tr>
                  <th>Fecha de Registro</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in lista_registros" :key="index">
                  <td>{{ getHora(row.created_at) }}</td>
                  <td>{{ row.Valor }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Tabla de Datos -->
        <!-- <div class="column right has-text-centered">

        </div> -->
      </div>
    </div>

    <!-- Widget 1: Temperatura -->
    <div v-if="sensor.tipo.Indice_widget == '1'" class="temperatura">
      <div class="columns is-multiline">
        <!-- Gráfica de Línea -->
        <div class="column left has-text-centered">
          <div class="cont_grafica">
            <div class="grafic">
              <line-chart v-if="datacollection" :chart-data="datacollection" :extra-options="options" />
            </div>
          </div>
        </div>
        <!-- Gráfica de Dona -->
        <div class="column has-text-centered">
          <div class="cont_grafica">
            <p class="leyenda">
              Temperatura min {{ rangoMin }}°C, max {{ rangoMax }}°C
            </p>
            <div
              v-if="rangoMax"
              class="grafic"
            >
              <GaugeChart
                :valor="valordona"
                :valormin="rangoMin"
                :valormax="rangoMax"
                :tipodato="tipo_dato"
              />
            </div>
          </div>
          <div class="cont_tabla">
            <h1>Tabla de datos</h1>
            <hr>
            <b-table
              :loading="isLoading"
              :paginated="paginated"
              :per-page="perPage"
              :striped="true"
              :hoverable="true"
              default-sort="created_at"
              :data="lista_registros"
            >
              <b-table-column v-slot="props" label="Valor" field="Valor" sortable>
                {{ getValor(props.row.Valor) }}{{ props.row.fk_IdSensor.fk_IdTipo.Tipo_dato }}
              </b-table-column>
              <b-table-column v-slot="props" label="Fecha de Registro" field="created_at" sortable>
                {{ getHora(props.row.created_at) }}
              </b-table-column>

              <section slot="empty" class="section">
                <div class="content has-text-grey has-text-centered">
                  <template v-if="isLoading">
                    <p>
                      <b-icon icon="dots-horizontal" size="is-large" />
                    </p>
                    <p>Fetching data...</p>
                  </template>
                  <template v-else>
                    <p>
                      <b-icon icon="emoticon-sad" size="is-large" />
                    </p>
                    <p>Nothing's here&hellip;</p>
                  </template>
                </div>
              </section>
            </b-table>
          </div>
        </div>
        <!-- Tabla de Datos -->
        <!-- <div class="column right has-text-centered">

        </div> -->
      </div>
    </div>

    <!-- Widget 2: Calendario -->
    <div v-if="sensor.tipo.Indice_widget == '2'" class="columns is-multiline">
      <div class="column left has-text-centered is-hidden-mobile">
        <FullCalendar :events="calendarEvents" :options="calendarConfig" />
      </div>
      <div class="column right has-text-centered is-hidden-mobile">
        <div v-if="lista_registros.length" class="sensor-status">
          <h2>Estado del Sensor: {{ sensorStatus(lista_registros) }}</h2>
        </div>
        <h1>Tabla de datos</h1>
        <table class="table is-striped is-bordered is-fullwidth">
          <thead>
            <tr>
              <th>Valor</th>
              <th>Fecha de Registro</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in lista_registros" :key="index">
              <td>{{ row.Valor }}</td>
              <td>{{ new Date(row.created_at).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import redirect from '@/mixins/redirect'
import LineChart from '@/components/Charts/LineChart.js'
import DoughnutChart from '@/components/Charts/DoughnutChart.js'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import GaugeChart from '@/components/GaugeCharts.vue'

export default {
  name: 'Graficass',
  components: {
    LineChart,
    DoughnutChart,
    FullCalendar,
    GaugeChart
  },
  mixins: [redirect],
  data () {
    return {
      isLoading: false,
      perPage: 10,
      paginated: false,
      checkedRows: [],
      sensor: [],
      lista_registros: [],
      tipo_dato: '',
      rangoMin: null,
      rangoMax: null,
      valordona: 0,
      valorcalendario: '',
      datacollection: null,
      options: null,
      calendarConfig: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        events: this.getCalendarEvents
      }
    }
  },
  created () {
    this.sensor = JSON.parse(localStorage.getItem('data'))
    this.getregisterbyrango()
  },
  methods: {
    getValor (valor) {
      return parseFloat(valor).toFixed(2)
    },
    sensorStatus (registros) {
      const lastRegistro = registros[registros.length - 1]
      return lastRegistro.Valor === '1.0' ? 'Abierto' : 'Cerrado'
    },
    getCalendarEvents (fetchInfo, successCallback, failureCallback) {
      const events = []
      let previousEvent = null
      let previousValue = null

      this.lista_registros.forEach((registro, index) => {
        if (previousValue !== null && previousValue !== registro.Valor) {
          if (previousEvent) {
            previousEvent.end = registro.created_at
            events.push(previousEvent)
          }

          const newEvent = {
            title: registro.Valor === '1.0' ? 'Abierto' : 'Cerrado',
            start: registro.created_at,
            classNames: registro.Valor === '1.0' ? 'event-abierto' : 'event-cerrado'
          }

          previousEvent = newEvent
        } else if (!previousValue) {
          previousEvent = {
            title: registro.Valor === '1.0' ? 'Abierto' : 'Cerrado',
            start: registro.created_at,
            classNames: registro.Valor === '1.0' ? 'event-abierto' : 'event-cerrado'
          }
        }

        previousValue = registro.Valor
      })

      if (previousEvent) {
        events.push(previousEvent)
      }

      successCallback(events)
    },
    obtenerUltimoRegistro (registroSensor) {
      if (registroSensor !== null) {
        return registroSensor[registroSensor.length - 1]
      }
      return ''
    },
    getfecha (fecha) {
      const opciones = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'America/Mexico_City',
        hour12: false // Esto asegura que la hora se muestre en formato de 24 horas
      }

      const fechaFormateada = new Date(fecha).toLocaleString('es-MX', opciones)
      return fechaFormateada
    },
    getHora (fecha) {
      const opciones = {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Mexico_City',
        hour12: false // Esto asegura que la hora se muestre en formato de 24 horas
      }

      const fechaFormateada = new Date(fecha).toLocaleString('es-MX', opciones)
      return fechaFormateada
    },
    updateTitleStack () {
      console.log(this.lista_registros)
      this.$store.commit('setTitleStack', ['Información del sensor del dia ' + this.getfecha(this.lista_registros[0].created_at)])
    },
    iniciagraficalineal (registroSensor) {
      if (!registroSensor || !registroSensor.length) {
        return
      }
      this.datacollection = {
        labels: registroSensor.map(reg => this.getHora(reg.created_at)),
        datasets: [
          {
            label: 'Valores del Sensor',
            borderColor: '#707070',
            pointBackgroundColor: this.getPointColors(registroSensor),
            pointBorderColor: this.getPointColors(registroSensor),
            pointRadius: 5,
            fill: false,
            data: registroSensor.map(reg => parseFloat(reg.Valor))
          },
          {
            label: 'Tendencia',
            data: this.calculateTrendLine(registroSensor),
            borderColor: '#50B2D1',
            fill: false,
            borderDash: [10, 5]
          }
        ]
      }

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    },
    iniciadona (registroSensor) {
      console.log(parseInt(registroSensor[registroSensor.length - 1].fk_IdSensor.fk_IdTipo.Rango_min))
      this.rangoMax = parseInt(registroSensor[registroSensor.length - 1].fk_IdSensor.fk_IdTipo.Rango_max)
      this.rangoMin = parseInt(registroSensor[registroSensor.length - 1].fk_IdSensor.fk_IdTipo.Rango_min)
      this.tipo_dato = registroSensor[registroSensor.length - 1].fk_IdSensor.fk_IdTipo.Tipo_dato
      this.valordona = parseInt(registroSensor[0].Valor)
    },
    async getregisterbyrango () {
      const data = {
        id: this.sensor.sensor,
        rango: this.sensor.tipo.Rango_registros
      }
      try {
        const response = await this.$store.dispatch('modules/sensors/getRegistersbySensorbyRango', data)
        this.lista_registros = response.Registros
        this.iniciadona(response.Registros)
        this.iniciagraficalineal(response.Registros)
        this.updateTitleStack()
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error al cargar las regiones',
          type: 'is-danger'
        })
      }
    },
    getPointColors (registroSensor) {
      return registroSensor.map(reg => (reg.Valor >= this.rangoMin && reg.Valor <= this.rangoMax) ? 'green' : 'red')
    },
    calculateTrendLine (registroSensor) {
      let sumX = 0; let sumY = 0; let sumXY = 0; let sumXX = 0
      const n = registroSensor.length
      const yValues = registroSensor.map(reg => reg.Valor)
      yValues.forEach((y, index) => {
        sumX += index
        sumY += y
        sumXY += index * y
        sumXX += index * index
      })
      const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
      const intercept = (sumY - slope * sumX) / n
      return yValues.map((_, index) => slope * index + intercept)
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}
.columns {
  display: flex;
  justify-content: space-between;
}
.column {
  width: 48%;
}
.cont_tabla {
  background-color: #ffffff;
}
.cont_grafica {
  background-color: #ffffff;
  border-radius: 17px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.grafic {
  background-color: #E1E4E0;
  border-radius: 17px;
  margin: 40px 0 40px 0;
  width: 90%;
}
hr {
  background-color: #d5d5d5;
  width: 95%;
  margin: auto;
}
.leyenda {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
}
element.style {
    display: block;
    width: 410px;
    height: 200px;
}
.event-abierto {
  background-color: #E6B282 !important;
  border: 1px solid #E6B282 !important;
}
.event-cerrado {
  background-color: #C3D692 !important;
  border: 1px solid #C3D692 !important;
}
</style>
