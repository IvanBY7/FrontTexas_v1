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

    <!-- Navbar de Regiones -->
    <nav class="navbar is-transparent">
      <div class="menu">
        <div class="navbar">
          <a
            v-for="(region, index2) in lista_regiones"
            :key="index2"
            class="navbar-item"
            :class="{ 'is-active': selectedRegion === index2 }"
            @click="selectRegion(region)"
          >
            {{ region.Nombre_region }}
          </a>
        </div>
      </div>
    </nav>

    <!-- Navbar de Sucursales -->
    <nav class="navbar is-transparent">
      <div class="menu">
        <div class="navbar">
          <a
            v-for="(sucursal, index3) in lista_sucursal"
            :key="index3"
            class="navbar-item"
            :class="{ 'is-active': selectedSucursal === index3 }"
            @click="selectSucursal(index3)"
          >
            {{ sucursal.Nombre_sucursal }}
          </a>
        </div>
      </div>
    </nav>

    <!-- Detalles de la Sucursal -->
    <div v-if="selectedSucursal !== null" class="sucursal-details">
      <div class="card sucursal-card">
        <div class="card-content">
          <div class="sucursal-name">
            <p>{{ sucursalActual.Nombre_Sucursal }}</p>
          </div>
          <div v-for="sensor in sucursalActual.dispositivos" :key="sensor.IdDispositivo" class="sensor-item">
            <p>Sensor: {{ sensor.IdDispositivo }} - {{ sensor.Modelo }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import redirect from '@/mixins/redirect'

export default {
  name: 'Incidencias',
  mixins: [redirect],
  fetch () {
    this.$store.commit('setTitleStack', ['Dashboard'])
  },
  data () {
    return {
      lista_empresas: [],
      lista_regiones: [],
      lista_sucursal: [],
      selectedEmpresa: null,
      selectedRegion: null,
      selectedSucursal: null
    }
  },
  computed: {
    ...mapState(['userEmail'])
    // empresaActual () {
    //   return this.selectedEmpresa !== null ? this.lista_empresas[this.selectedEmpresa] : { regiones: [] }
    // },
    // regionActual () {
    //   return this.selectedRegion !== null ? this.empresaActual.regiones[this.selectedRegion] : { sucursales: [] }
    // },
    // sucursalActual () {
    //   return this.selectedSucursal !== null ? this.regionActual.sucursales[this.selectedSucursal] : {}
    // }
  },
  mounted () {
    this.getEmpresas()
  },
  methods: {
    async getEmpresas () {
      try {
        const response = await this.$store.dispatch('modules/companys/getCompany', this.userEmail)
        this.lista_empresas = response
        // if (this.lista_empresas.length > 0) {
        //   this.selectEmpresa(this.lista_empresas[0]) // Selecciona la primera empresa por defecto
        // }
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
        const response = await this.$store.dispatch('modules/regiones/getRegion', empresa.IdEmpresa)
        this.lista_regiones = response
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error al cargar las regiones',
          type: 'is-danger'
        })
      }
      this.selectedRegion = null // Resetear región seleccionada
      this.selectedSucursal = null // Resetear sucursal seleccionada
      if (this.lista_regiones.length > 0) {
        this.selectRegion(this.lista_regiones[0].IdRegion) // Seleccionar la primera región por defecto
      }
    },
    async selectRegion (IdRegion) {
      this.selectedRegion = IdRegion
      try {
        const response = await this.$store.dispatch('modules/sucursales/getSucursal', IdRegion)
        this.lista_sucursal = response
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error al cargar las regiones',
          type: 'is-danger'
        })
      }
      this.selectedSucursal = null // Resetear sucursal seleccionada
      if (this.regionActual.sucursales.length > 0) {
        this.selectSucursal(this.lista_sucursal[0].IdSucursal)// Seleccionar la primera sucursal por defecto
      }
    },
    selectSucursal (index) {
      this.selectedSucursal = index
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
  .sucursal-details {
    padding: 1rem;
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
  </style>
