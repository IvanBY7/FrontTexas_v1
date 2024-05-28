<template>
  <div class="container m-3">
    <!-- Widget 3: Humedad -->
    <div v-if="sensor.tipo.Indice_widget == '3'" class="humedad">
      <div class="columns is-multiline">
        <!-- Gráfica de Línea -->
        <div class="column left has-text-centered">
          <div class="cont_grafica">
            <div class="grafico">
              <line-chart v-if="datacollection" id="myChart" class="grafico_linea" :chart-data="datacollection" :extra-options="options" />
            </div>
          </div>
        </div>
        <!-- Gráfica de Dona y Tabla -->
        <div class="column2 has-text-centered is-multiline">
          <div class="cont_grafica">
            <p class="leyenda">
              Humedad minima {{ rangoMin }}%, maxima {{ rangoMax }}%
            </p>
            <div v-if="valordona" class="grafic">
              <LiquidFillChart
                :data="valordona"
                :maximo="rangoMax"
                :minimo="rangoMin"
                @chart-click="handleChartClick(sensor)"
              />
            </div>
          </div>
          <!-- Tabla -->
          <b-table
            :loading="isLoading"
            :paginated="paginated"
            :per-page="perPage"
            :hoverable="true"
            default-sort="created_at"
            default-sort-direction="desc"
            :data="lista_registros_tabla"
            :row-variant="customRowClass"
          >
            <b-table-column v-slot="props" label="Hora de Registro" field="created_at" sortable>
              <td :style="{ color: customRowClass(props.row, 'created_at') }">
                {{ getHora(props.row.created_at) }}
              </td>
            </b-table-column>
            <b-table-column v-slot="props" label="Valor" field="Valor" sortable>
              <td :style="{ color: customRowClass(props.row, 'Valor') }">
                {{ getValor(props.row.Valor) }}
              </td>
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
          <div class="level-item">
            <b-button
              size="default"
              class="button"
              icon-left="clock"
              :disabled="isLoading"
              @click="verhistorico"
            >
              Historial
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Widget 1: Temperatura -->
    <div v-if="sensor.tipo.Indice_widget == '1'" class="temperatura">
      <div class="columns is-multiline">
        <!-- Gráfica de Línea -->
        <div class="column left has-text-centered">
          <div class="cont_grafica">
            <div class="grafico">
              <line-chart v-if="datacollection" class="grafico_linea" :chart-data="datacollection" :extra-options="options" />
            </div>
          </div>
        </div>
        <!-- Gráfica de Dona y Tabla -->
        <div class="column2 rigth has-text-centered">
          <!-- Gráfica de Dona -->
          <div class="cont_grafica">
            <p class="leyenda">
              Temperatura min {{ rangoMin }}°C, max {{ rangoMax }}°C
            </p>
            <div
              v-if="rangoMax"
              class="grafic"
            >
              <GaugeChart
                :fontsize="9"
                :valorsize="22"
                :valor="valordona"
                :valormin="rangoMin"
                :valormax="rangoMax"
                :tipodato="tipo_dato"
              />
            </div>
          </div>
          <!-- Tabla -->
          <b-table
            :loading="isLoading"
            :paginated="paginated"
            :per-page="perPage"
            :hoverable="true"
            default-sort="created_at"
            default-sort-direction="desc"
            :data="lista_registros_tabla"
            :row-variant="customRowClass"
          >
            <b-table-column v-slot="props" label="Hora de Registro" field="created_at" sortable>
              <td :style="{ color: customRowClass(props.row, 'created_at') }">
                {{ getHora(props.row.created_at) }}
              </td>
            </b-table-column>
            <b-table-column v-slot="props" label="Valor" field="Valor" sortable>
              <td :style="{ color: customRowClass(props.row, 'Valor') }">
                {{ getValor(props.row.Valor) }}
              </td>
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
          <div class="level-item">
            <b-button
              size="default"
              class="button"
              icon-left="clock"
              :disabled="isLoading"
              @click="verhistorico"
            >
              Historial
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Widget 2: Puerta -->
    <div v-if="sensor.tipo.Indice_widget == '2'" class="columns is-multiline puerta">
      <div class="column left has-text-centered">
        <div class="fondocalendario">
          <FullCalendar :events="calendarEvents" :options="calendarConfig" />
        </div>
      </div>
      <div class="column2 right has-text-centered">
        <!-- Gráfica de estado -->
        <div :class="['card-content', getEstadoSensor()]">
          <div class="cont_grafica">
            <p class="leyenda">
              Puerta
            </p>
            <br>
            <div class="fondopuerta">
              <div :class="[getestado(), 'pointer']">
                <transition name="fade" mode="out-in">
                  <svg
                    v-if="valordona == '0'"
                    key="svg-0"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="100px"
                    height="100px"
                  >
                    <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z" />
                  </svg>
                  <svg
                    v-else-if="valordona == '1'"
                    key="svg-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 50 50"
                    width="100px"
                    height="100px"
                  >
                    <path d="M 22.78125 0 C 21.605469 -0.00390625 20.40625 0.164063 19.21875 0.53125 C 12.902344 2.492188 9.289063 9.269531 11.25 15.59375 L 11.25 15.65625 C 11.507813 16.367188 12.199219 18.617188 12.625 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 14.75 20 C 14.441406 19.007813 13.511719 16.074219 13.125 15 L 13.15625 15 C 11.519531 9.722656 14.5 4.109375 19.78125 2.46875 C 25.050781 0.832031 30.695313 3.796875 32.34375 9.0625 C 32.34375 9.066406 32.34375 9.089844 32.34375 9.09375 C 32.570313 9.886719 33.65625 13.40625 33.65625 13.40625 C 33.746094 13.765625 34.027344 14.050781 34.386719 14.136719 C 34.75 14.226563 35.128906 14.109375 35.375 13.832031 C 35.621094 13.550781 35.695313 13.160156 35.5625 12.8125 C 35.5625 12.8125 34.433594 9.171875 34.25 8.53125 L 34.25 8.5 C 32.78125 3.761719 28.601563 0.542969 23.9375 0.0625 C 23.550781 0.0234375 23.171875 0 22.78125 0 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z" />
                  </svg>
                </transition>
              </div>
            </div>
          </div>
        </div>
        <!-- Tabla -->
        <b-table
          :loading="isLoading"
          :paginated="paginated"
          :per-page="perPage"
          :hoverable="true"
          default-sort="created_at"
          default-sort-direction="desc"
          :data="lista_registros_tabla"
          :row-variant="customRowClass"
        >
          <b-table-column v-slot="props" label="Hora de Registro" field="created_at" sortable>
            <td :style="{ color: customRowClass(props.row, 'created_at') }">
              {{ getHora(props.row.created_at) }}
            </td>
          </b-table-column>
          <b-table-column v-slot="props" label="Valor" field="Valor" sortable>
            <td :style="{ color: customRowClass(props.row, 'Valor') }">
              {{ getValorpuerta(props.row.Valor) }}
            </td>
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
        <div class="level-item">
          <b-button
            size="default"
            class="button"
            icon-left="clock"
            :disabled="isLoading"
            @click="verhistorico"
          >
            Historial
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import redirect from '@/mixins/redirect'
import LineChart from '@/components/Charts/LineChart.js'
import 'chartjs-plugin-annotation'

import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import GaugeChart from '@/components/GaugeCharts.vue'
import LiquidFillChart from '@/components/LiquidFillChart.vue'
export default {
  name: 'Graficass',
  components: {
    LineChart,
    FullCalendar,
    GaugeChart,
    LiquidFillChart
  },
  mixins: [redirect],
  data () {
    return {
      isLoading: false,
      perPage: 6,
      paginated: true,
      checkedRows: [],
      sensor: [],
      lista_registros: [],
      lista_registros_tabla: [],
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
        events: ''
      }
    }
  },
  created () {
    this.sensor = JSON.parse(localStorage.getItem('sensor'))
  },
  beforeDestroy () {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  },
  mounted () {
    this.getregisterbyrango()
    this.intervalId = setInterval(() => {
      this.getregisterbyrango()
    }, 5000)
  },
  methods: {
    verhistorico () {
      console.log(this.sensor)
      localStorage.setItem('idsensor', JSON.stringify(this.sensor.sensor))
      this.$router.push('/sensors/Registros')
    },
    customRowClass (row, key) {
      if (row.fk_IdSensor.fk_IdTipo.Indice_widget === '2') {
        if (row.Valor === '1.0') {
          return 'red'
        } else {
          return '#294D99'
        }
      } else if (parseFloat(row.Valor) < parseInt(row.fk_IdSensor.fk_IdTipo.Rango_min) || parseFloat(row.Valor) > parseInt(row.fk_IdSensor.fk_IdTipo.Rango_max)) {
        return 'red'
      } else {
        return '#294D99'
      }
    },
    getEstadoSensor () {
      if (this.sensor.tipo.Indice_widget === '2') {
        if (this.valordona === '1.0') {
          return 'fondoEmergencia'
        } else {
          return 'fondoEstable'
        }
      } else if (this.valordona < this.rangoMin || this.valordona > this.rangoMax) {
        return 'fondoEmergencia'
      } else {
        return 'fondoEstable'
      }
    },
    handleChartClick () {
      // Aquí puedes llamar cualquier método que necesites
    },
    getestado () {
      // Estado abierto
      if (this.valordona === 1) {
        return 'puerta-abierta-urgencia'
      } else {
        return 'puerta-optima'
      }
    },
    getvalor (valor) {
      return parseInt(valor)
    },
    getValorpuerta (valor) {
      if (valor === '1.0') {
        return 'ABIERTO'
      } else {
        return 'CERRADO'
      }
    },
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
            classNames: registro.Valor === '1.0' ? 'puerta-abierta-urgencia' : 'puerta-optima'
          }

          previousEvent = newEvent
        } else if (!previousValue) {
          previousEvent = {
            title: registro.Valor === '1.0' ? 'Abierto' : 'Cerrado',
            start: registro.created_at,
            classNames: registro.Valor === '1.0' ? 'puerta-abierta-urgencia' : 'puerta-optima'
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
      this.$store.commit('setTitleStack', ['Información del sensor del dia ' + this.getfecha(this.lista_registros[0].created_at)])
    },
    iniciagraficalineal (registroSensor) {
      if (!registroSensor || !registroSensor.length) {
        return
      }

      this.datacollection = {
        labels: registroSensor.reverse().map(reg => this.getHora(reg.created_at)),
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
          },
          {
            label: 'Fuera de Rango',
            data: registroSensor.map(reg => parseInt(reg.fk_IdSensor.fk_IdTipo.Rango_max) + 0.1),
            borderColor: '#cf2d2d',
            backgroundColor: '#c785856c',
            fill: 'end',
            pointRadius: 0,
            borderWidth: 0 // Sin borde
          },
          {
            label: 'Fuera de Rango',
            data: registroSensor.map(reg => parseInt(reg.fk_IdSensor.fk_IdTipo.Rango_min) - 0.1),
            borderColor: '#cf2d2d',
            backgroundColor: '#c785856c',
            fill: true,
            pointRadius: 0,
            borderWidth: 0 // Sin borde
          }
        ]
      }

      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.3
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              min: parseInt(registroSensor[0].fk_IdSensor.fk_IdTipo.Rango_min) - 5,
              max: parseInt(registroSensor[0].fk_IdSensor.fk_IdTipo.Rango_max) + 5,
              stepSize: 1
            }
          }]
        }
      }
    },
    iniciadona (registroSensor) {
      this.rangoMax = parseInt(registroSensor[registroSensor.length - 1].fk_IdSensor.fk_IdTipo.Rango_max)
      this.rangoMin = parseInt(registroSensor[registroSensor.length - 1].fk_IdSensor.fk_IdTipo.Rango_min)
      this.tipo_dato = registroSensor[registroSensor.length - 1].fk_IdSensor.fk_IdTipo.Tipo_dato
      this.valordona = parseInt(registroSensor[0].Valor)
      console.log(this.valordona)
    },
    async getregisterbyrango () {
      let data = {}
      if (this.sensor.id) {
        data = {
          id: this.sensor.id,
          rango: this.sensor.config.Rango_registros
        }
      } else {
        data = {
          id: this.sensor.sensor,
          rango: this.sensor.tipo.Rango_registros
        }
      }
      try {
        const response = await this.$store.dispatch('modules/sensors/getRegistersbySensorbyRango', data)
        this.lista_registros = response.Registros
        console.log(this.lista_registros)
        this.iniciadona(response.Registros)
        this.iniciagraficalineal(response.Registros)
        this.analisarfilas()
        this.calendarConfig = {
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
          initialView: 'timeGridWeek',
          events: this.getCalendarEvents
        }
        this.updateTitleStack()
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error al cargar las regiones',
          type: 'is-danger'
        })
      }
    },
    getPointColors (registroSensor) {
      return registroSensor.map(reg => (parseFloat(reg.Valor) >= parseInt(this.rangoMin) && parseFloat(reg.Valor) <= parseInt(this.rangoMax)) ? 'blue' : 'red')
    },
    calculateTrendLine (registroSensor) {
      let sumX = 0; let sumY = 0; let sumXY = 0; let sumXX = 0
      const n = registroSensor.length
      const yValues = registroSensor.map(reg => parseFloat(reg.Valor))
      yValues.forEach((y, index) => {
        sumX += index
        sumY += y
        sumXY += index * y
        sumXX += index * index
      })
      const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
      const intercept = (sumY - slope * sumX) / n
      return yValues.map((_, index) => slope * index + intercept)
    },
    analisarfilas () {
      this.lista_registros_tabla = this.lista_registros.map(reg => ({
        ...reg,
        _rowVariant: this.getstatus(reg)
      }))
      console.log(this.lista_registros_tabla)
    },
    getstatus (row) {
      if (row.fk_IdSensor.fk_IdTipo.Indice_widget === '2') {
        if (row.Valor === '1.0') {
          return 'danger'
        } else {
          return 'success'
        }
      } else if (row.Valor > row.fk_IdSensor.fk_IdTipo.Rango_max || row.Valor < row.fk_IdSensor.fk_IdTipo.Rango_min) {
        return 'danger'
      } else {
        return 'success'
      }
    }
  }
}
</script>

<style scoped>
.fondopuerta{
  background-color: #E1E4E0;
  padding: 2rem 35%;
  border-radius: 5px;
}

.grafico_linea{
  width: 100%;
}
.estado-estable{
  background-color: #294D99 !important;
  /* background-color: #29992959 !important; */
}
.estado-urgente{
  background-color: #cf2d2d !important;
  background-color: #c785856c !important;
}
.estado-abierto{
  background-color: #ffcc00 !important;
}
.container {
  width: 100vw;
}
.columns {
  display: flex;
  justify-content: space-between;
}
.column {
  max-width: 50%;
  max-height: 50vh;
}
.column2 {
  width: 35%;
}
.cont_tabla {
  background-color: #ffffff;
}
.cont_tabla h1 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.cont_grafica {
  background-color: #ffffff;
  border-radius: 17px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  min-height: 20rem;
  padding: 1.5rem;
}
.grafic {
  background-color: #E1E4E0;
  border-radius: 17px;
  width: 100%;
  max-height: 32vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.grafico{
  background-color: #E1E4E0;
  border-radius: 17px;
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
hr {
  background-color: #d5d5d5;
  width: 95%;
  margin: auto;
}
.leyenda {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
element.style {
    display: block;
    width: 410px;
    height: 200px;
}
.rigth{
  width: 40%;
}
.event-abierto {
  background-color: #E6B282 !important;
  border: 1px solid #E6B282 !important;
}
.event-cerrado {
  background-color: #C3D692 !important;
  border: 1px solid #C3D692 !important;
}
@media screen and (max-width: 769px), print {
    .columns{
        display: flex;
        flex-direction: column;
        gap: 200px;
    }
    .column[data-v-09a5942a] {
        width: 95%;
        max-width: 100%;
    }
    .column2[data-v-09a5942a] {
        width: 91vw;
    }
    .cont_grafica {
      background-color: #ffffff;
      border-radius: 17px;
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;
      margin: 1rem 0;
      min-height: 15rem;
      padding: 1.5rem;
      width: 90vw;
    }
    .grafico_linea{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cont_tabla{
      width: 100%;
    }
}
@media screen and (min-width: 1216px) {
    .container:not(.is-max-desktop) {
        max-width: 92vw;
    }
}
@media screen and (max-width: 1516px) {
  .fondopuerta{
    background-color: #E1E4E0;
    padding: 2rem 25%;
    border-radius: 5px;
  }
}
@media screen and (max-width: 980px) {
  .fondopuerta{
    background-color: #E1E4E0;
    padding: 2rem 20%;
    border-radius: 5px;
  }
}
.puerta-optima path{
  fill: #294D99;
  cursor: pointer;
}
.puerta-optima{
  border: solid #294D99 8px;
  background-color: #E1F5FD;
  border-radius: 50%;
  padding: 1rem;
}
.puerta-abierta-advertencia path{
  fill: #ffcc00;
  margin: 10%;
  cursor: pointer;
}
.puerta-abierta-advertencia{
  border: solid #ffcc00 8px;
  border-radius: 50%;
  padding: 1rem;
}
.puerta-abierta-urgencia path{
  fill: #cf2d2d;
  cursor: pointer;
}
.puerta-abierta-urgencia{
  border: solid #cf2d2d 8px;
  background-color: #f5d0d0;
  border-radius: 50%;
  padding: 1rem;
}
.margin{
  margin: 1rem 0;
}
.level-item{
  margin-top: 2rem;
}
.table{
  border-radius: 15px 15px  0 0;
}
.button{
  border: none;
  border-radius: 15px;
  margin-bottom: 1rem;
  background-color: #806c1f;
  color: white;
}
.fondocalendario{
  background-color: white;
}
</style>
