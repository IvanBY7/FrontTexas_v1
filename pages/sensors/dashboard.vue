<template>
  <div class="container m-3">
    <!-- Navbar de Empresas -->
    <nav class="navbar is-transparent">
      <div class="menu">
        <div class="navbar">
          <a
            v-for="empresa in lista_empresas"
            :key="empresa.IdEmpresa"
            class="navbar-item"
            :class="{ 'is-active': selectedEmpresa === empresa.IdEmpresa }"
            @click="selectEmpresa(empresa)"
          >
            {{ empresa.Nombre_Empresa }}
          </a>
        </div>
      </div>
    </nav>
    <div class="columns is-multiline">
      <div v-for="(area, index) in lista_areas.areas" :key="index" class="column is-one-third">
        <div v-if="area.sensores" class="box">
          <h3 class="title is-5">
            {{ area.Nombre_zona }}
          </h3>
          <div class="distribuidor">
            <div v-for="(sensor, idsensor) in area.sensores" :key="idsensor" class="card empresa-card is-hoverable">
              <div v-if="sensor.config.Indice_widget == '2'" :class="['card-content', getEstadoSensor(sensor)]" @click="handleChartClick(sensor)">
                <div class="cont_grafica">
                  <p class="leyenda">
                    Puerta
                  </p>
                  <div :class="[getestado(sensor), 'pointer']">
                    <transition name="fade" mode="out-in">
                      <svg
                        v-if="sensor.registro.valor == '0.0'"
                        key="svg-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        width="100px"
                        height="100px"
                      >
                        <path d="M 25 3 C 18.363281 3 13 8.363281 13 15 L 13 20 L 9 20 C 7.355469 20 6 21.355469 6 23 L 6 47 C 6 48.644531 7.355469 50 9 50 L 41 50 C 42.644531 50 44 48.644531 44 47 L 44 23 C 44 21.355469 42.644531 20 41 20 L 37 20 L 37 15 C 37 8.363281 31.636719 3 25 3 Z M 25 5 C 30.566406 5 35 9.433594 35 15 L 35 20 L 15 20 L 15 15 C 15 9.433594 19.433594 5 25 5 Z M 9 22 L 41 22 C 41.554688 22 42 22.445313 42 23 L 42 47 C 42 47.554688 41.554688 48 41 48 L 9 48 C 8.445313 48 8 47.554688 8 47 L 8 23 C 8 22.445313 8.445313 22 9 22 Z M 25 30 C 23.300781 30 22 31.300781 22 33 C 22 33.898438 22.398438 34.6875 23 35.1875 L 23 38 C 23 39.101563 23.898438 40 25 40 C 26.101563 40 27 39.101563 27 38 L 27 35.1875 C 27.601563 34.6875 28 33.898438 28 33 C 28 31.300781 26.699219 30 25 30 Z" />
                      </svg>
                      <svg
                        v-else-if="sensor.registro.valor == '1.0'"
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
              <!-- Humedad -->
              <div v-else-if="sensor.config.Indice_widget == '3'" :class="['card-content', getEstadoSensor(sensor)]">
                <div class="cont_grafica">
                  <p class="leyenda">
                    Humedad
                  </p>
                  <div v-if="sensor.config.Rango_max" class="grafic">
                    <LiquidFillChart
                      :data="getvalor(sensor.registro.valor)"
                      :maximo="getvalor(sensor.config.Rango_max)"
                      :minimo="getvalor(sensor.config.Rango_min)"
                      @chart-click="handleChartClick(sensor)"
                    />
                  </div>
                </div>
              </div>
              <!-- Temperatura -->
              <div v-else-if="sensor.config.Indice_widget == '1'" :class="['card-content', getEstadoSensor(sensor)]">
                <div class="cont_grafica">
                  <p class="leyenda">
                    Temperatura
                  </p>
                  <div v-if="sensor.config.Rango_max" class="grafic">
                    <GaugeChart
                      :fontsize="9"
                      :valorsize="22"
                      :valor="getvalor(sensor.registro.valor)"
                      :valormin="getvalor(sensor.config.Rango_min)"
                      :valormax="getvalor(sensor.config.Rango_max)"
                      :tipodato="sensor.config.Tipo_dato"
                      @chart-click="handleChartClick(sensor)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import redirect from '@/mixins/redirect'
import GaugeChart from '@/components/GaugeCharts.vue'
import LiquidFillChart from '@/components/LiquidFillChart.vue'

export default {
  name: 'Incidencias',
  components: {
    GaugeChart,
    LiquidFillChart
  },
  mixins: [redirect],
  fetch () {
    this.$store.commit('setTitleStack', ['¡Bienvenido al Sistema de Monitoreo de Sensores!'])
  },
  data () {
    return {
      lista_empresas: [],
      selectedEmpresa: null,
      lista_areas: [],
      intervalId: null
    }
  },
  computed: {
    ...mapState(['userEmail'])
  },
  mounted () {
    this.getEmpresas()
    if (this.selectedEmpresa) {
      this.startAutoUpdate(this.selectedEmpresa)
    }
  },
  beforeDestroy () {
    this.clearAutoUpdate()
  },
  methods: {
    handleChartClick (sensor) {
      console.log(sensor)
      const data = {
        Fecha_registro: sensor.registro.fecha_registro,
        sensor: sensor.id,
        tipo: sensor.config,
        valor: sensor.registro.valor,
        valor_maximo: '#',
        valor_minimo: '#'
      }
      localStorage.setItem('sensor', JSON.stringify(data))
      this.$router.push('/sensors/graficas')
      // Aquí puedes llamar cualquier método que necesites
    },
    getEstadoSensor (sensor) {
      if (sensor.config.Indice_widget === '2') {
        if (sensor.registro.valor === '1.0') {
          return 'fondoEmergencia'
        } else {
          return 'fondoEstable'
        }
      } else if (sensor.registro.valor < sensor.config.Rango_min || sensor.registro.valor > sensor.config.Rango_max) {
        return 'fondoEmergencia'
      } else {
        return 'fondoEstable'
      }
    },
    getestado (sensor) {
      // Estado abierto
      if (sensor.registro.valor === '1.0') {
        return 'puerta-abierta-urgencia'
      } else {
        return 'puerta-optima'
      }
    },
    getvalor (valor) {
      return parseInt(valor)
    },
    async getEmpresas () {
      try {
        const response = await this.$store.dispatch('modules/companys/getCompany', this.userEmail)
        this.lista_empresas = response
        if (this.lista_empresas.length === 1) {
          this.selectEmpresa(this.lista_empresas[0])
        }
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error al cargar las empresas',
          type: 'is-danger'
        })
      }
    },
    async selectEmpresa (empresa) {
      this.selectedEmpresa = empresa.IdEmpresa
      this.clearAutoUpdate() // Clear any existing interval
      await this.updateEmpresaData(empresa)
      this.startAutoUpdate(empresa)
    },
    async updateEmpresaData (empresa) {
      console.log('ejecutando')
      try {
        const response = await this.$store.dispatch('modules/companys/getSensorbyCompany', empresa.IdEmpresa)
        this.lista_areas = response
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error al cargar las regiones',
          type: 'is-danger'
        })
      }
    },
    startAutoUpdate (empresa) {
      this.intervalId = setInterval(() => {
        this.updateEmpresaData(empresa)
      }, 5000) // 5000 ms = 5 seconds
    },
    clearAutoUpdate () {
      if (this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
      }
    }
  },
  head () {
    return {
      title: 'Dashboard - Sistema de Monitoreo'
    }
  }
}
</script>

<style scoped>
.fondoEstable{
  /* background-color: #e9effa; */
  border: solid #b2caf5 15px;
  box-shadow: 0px 2px 4px rgba(0, 153, 255, 0.521);
}
.fondoEmergencia{
  /* background-color: #fcecec; */
  border: solid #f7c1c1 15px;
  box-shadow: 0px 2px 4px rgba(255, 0, 0, 0.644);
}
.box {
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
    color: #4a4a4a;
    display: flex;
    padding: 1.25rem;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    text-align: center;
}
.distribuidor{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.navbar {
  background-color: transparent;
  border-bottom: 1px solid #dbdbdb;
  display: flex;
  z-index: 0;
}
.menu {
  display: flex;
  flex-direction: row;
}
.navbar-item {
  padding: 10px 15px;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.navbar-item.is-active {
  border-bottom: 4px solid #3273dc !important;
  background-color: #f2f2f2 !important;
}
.navbar-item:hover {
  background-color: #3273dc !important; /* Color de fondo al pasar el ratón por encima */
  color: #f2f2f2; /* Color del texto al pasar el ratón por encima */
}
.sucursal-card {
  margin-top: 1rem;
}
.sucursal-name {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.sensor-item {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}
.cont_grafica {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: 40rem;
  height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in versions below Vue 2.1.8 */ {
  opacity: 0;
}
.leyenda {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.grafic {
  width: 50%;
  height: 200px; /* Ajusta esta altura según tus necesidades */
  display: flex;
  justify-content: center;
  align-items: center;
}
.card{
  width: 30%;
}
@media screen and (min-width: 769px), print {
  .columns:not(.is-desktop) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 92vw;
  }
}
@media screen and (max-width: 769px), print {
  .distribuidor{
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .card{
    width: 100%;
    min-height: 14rem;
  }
}
.card-header:last-child, .card-content:last-child, .card-footer:last-child {
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    overflow: hidden;
}
.pointer{
  cursor: pointer;
}
.puerta-optima path{
  fill: #294D99;
  cursor: pointer;
}
.puerta-optima{
  border: solid #294D99 8px;
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
  border-radius: 50%;
  padding: 1rem;
}
@media screen and (min-width: 769px), print {
    .column.is-one-third, .column.is-one-third-tablet {
        flex: none;
        width: 100%;
    }
}
@media screen and (min-width: 1024px) {
    .navbar.is-transparent .menu .navbar .navbar-item:focus,
    .navbar.is-transparent .menu .navbar .navbar-item:hover {
      border-bottom: 4px solid #3273dc !important;
      background-color: #3273dc !important;
    }
    .navbar.is-transparent .menu .navbar .navbar-item.is-active{
      border-bottom: 4px solid #3273dc !important;
      background-color: #f2f2f2 !important;
    }
    .navbar.is-transparent .menu .navbar .navbar-link:focus,
    .navbar.is-transparent .menu .navbar .navbar-link:hover,
    .navbar.is-transparent .menu .navbar .navbar-link.is-active {
        background-color: #f0f0f0; /* El color que prefieras */
        color: #000; /* El color de texto que prefieras */
    }
}
</style>
