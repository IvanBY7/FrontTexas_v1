<template>
  <div class="container m-3">
    <!-- Navbar de Empresas -->
    <nav class="navbar is-transparent">
      <div class="menu">
        <div class="navbar">
          <a
            v-for="empresa in lista_empresas"
            :key="empresa.IdEmpresa"
            class="navbar-item "
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
        <div class="box">
          <h3 class="title is-5">
            {{ area.Nombre_zona }}
          </h3>
          <div v-for="(sensor, idsensor) in area.sensores" :key="idsensor" class="card empresa-card is-hoverable">
            <div v-if="sensor.config.Indice_widget == '2'" class="card-content">
              {{ sensor.config.Indice_widget }} - Puerta
            </div>
            <div v-else class="card-content">
              <div class="cont_grafica">
                <p v-if="sensor.config.Indice_widget == '1'" class="leyenda">
                  Humedad
                </p>
                <p v-if="sensor.config.Indice_widget == '3'" class="leyenda">
                  Temperatura
                </p>
                <div v-if="sensor.config.Rango_max" class="grafic">
                  <GaugeChart
                    :fontsize="9"
                    :valorsize="15"
                    :valor="getvalor(sensor.registro.valor)"
                    :valormin="getvalor(sensor.config.Rango_min)"
                    :valormax="getvalor(sensor.config.Rango_max)"
                    :tipodato="sensor.config.Tipo_dato"
                  />
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

export default {
  name: 'Incidencias',
  components: {
    GaugeChart
  },
  mixins: [redirect],
  fetch () {
    this.$store.commit('setTitleStack', ['Dashboard'])
  },
  data () {
    return {
      lista_empresas: [],
      selectedEmpresa: null,
      lista_areas: []
    }
  },
  computed: {
    ...mapState(['userEmail'])
  },
  mounted () {
    this.getEmpresas()
  },
  methods: {
    getvalor (valor) {
      return parseInt(valor)
    },
    async getEmpresas () {
      try {
        const response = await this.$store.dispatch('modules/companys/getCompany', this.userEmail)
        this.lista_empresas = response
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error al cargar las empresas',
          type: 'is-danger'
        })
      }
    },
    async selectEmpresa (empresa) {
      this.selectedEmpresa = empresa
      try {
        const response = await this.$store.dispatch('modules/companys/getSensorbyCompany', empresa.IdEmpresa)
        this.lista_areas = response
        console.log(this.lista_areas.areas)
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error al cargar las regiones',
          type: 'is-danger'
        })
      }
    }
  },
  head () {
    return {
      title: 'Dashboard - AgenteMonitor'
    }
  }
}
</script>

  <style scoped>
  .navbar {
    background-color: transparent !important;
    border-bottom: 1px solid #dbdbdb;
    display: flex;
  }
  .menu{
    display: flex;
    flex-direction: row;
  }
  .navbar-item.is-active {
    border-bottom: 2px solid #3273dc;
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
  .navbar {
    background-color: white;
    min-height: 3.25rem;
    position: relative;
    z-index: 1;
  }
  .cont_grafica {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.cont_grafica {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.leyenda {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.grafic {
  width: 100%;
  height: 200px;
}

  </style>
