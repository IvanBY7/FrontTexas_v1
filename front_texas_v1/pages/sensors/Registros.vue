<template>
  <div class="container m-3">
    <div class="contenido">
      <b-table
        :loading="isLoading"
        :paginated="paginated"
        :per-page="perPage"
        :striped="true"
        default-sort="created_at"
        default-sort-direction="desc"
        :data="registros"
      >
        <b-table-column v-slot="props" label="ID Registro" field="IdRegistro" sortable>
          {{ props.row.IdRegistro }}
        </b-table-column>
        <b-table-column v-slot="props" label="Sensor" field="fk_IdSensor" sortable>
          {{ props.row.fk_IdSensor.IdSensor }}
        </b-table-column>
        <b-table-column v-slot="props" label="Valor" field="Valor" sortable>
          <td :style="{ color: customRowClass(props.row, 'created_at') }">
            {{ getestado(props.row) }}
          </td>
        </b-table-column>
        <b-table-column v-slot="props" label="Hora de Registro" field="created_at" sortable>
          {{ getfecha(props.row.created_at) }}
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
</template>

<script>
import redirect from '@/mixins/redirect'

export default {
  name: 'Historico',
  mixins: [redirect],
  fetch () {
    this.$store.commit('setTitleStack', ['Historico'])
  },
  data () {
    return {
      idsensor: null,
      horaActual: '',
      registros: [],
      isLoading: false,
      mostrarModal: false, // Variable para controlar la visibilidad del modal
      sucursalSeleccionada: [],
      myDropzone: null,
      imagenSeleccionada: null, // Variable para almacenar la imagen seleccionada
      IdSensor: null,
      perPage: 15,
      paginated: false,
      checkedRows: []
    }
  },
  computed: {

  },
  created () {
    this.idsensor = JSON.parse(localStorage.getItem('idsensor'))
    console.log(this.idsensor)
    this.getRegistros()
  },
  methods: {
    customRowClass (row, key) {
      if (row.fk_IdSensor.fk_IdTipo.Indice_widget === '2') {
        if (row.Valor === '1.0') {
          return 'red'
        } else {
          return 'green'
        }
      } else if (parseFloat(row.Valor) < parseInt(row.fk_IdSensor.fk_IdTipo.Rango_min) || parseFloat(row.Valor) > parseInt(row.fk_IdSensor.fk_IdTipo.Rango_max)) {
        return 'red'
      } else {
        return 'green'
      }
    },
    getestado (row) {
      if (row.fk_IdSensor.fk_IdTipo.Indice_widget === '2') {
        if (row.Valor === '1.0') {
          return 'ABIERTO'
        } else {
          return 'CERRADO'
        }
      } else {
        return row.Valor
      }
    },
    getfecha (fecha) {
      const opciones = {
        hour: '2-digit',
        minute: '2-digit',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'America/Mexico_City',
        hour12: false // Esto asegura que la hora se muestre en formato de 24 horas
      }

      const fechaFormateada = new Date(fecha).toLocaleString('es-MX', opciones)
      return fechaFormateada
    },
    formateofecha (fechaHora) {
      const fechaFormateada = new Date(fechaHora).toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })
      return fechaFormateada
    },
    async getRegistros () {
      this.isLoading = true
      try {
        const response = await this.$store.dispatch('modules/sensors/getRegistersbySensor', this.idsensor)
        this.registros = response.Registros.reverse()
        console.log(this.registros)
        this.isLoading = false
        if (this.registros) {
          if (this.registros.length > this.perPage) {
            this.paginated = true
          }
        }
      } catch {
        this.$buefy.snackbar.open({
          message: 'Eror al cargar sensores',
          type: 'is-danger'
        })
      }
    },
    DatosRegistros () {
      this.IdSensor = this.$route.query.IdSensor
      return this.IdSensor
    },
    rutaimg () {

    },
    prueba () {
      this.$router.go(-1)
    },
    agregarCero (numero) {
      return numero < 10 ? '0' + numero : numero
    },
    config () {
      alert('Aqui se redirige al modulo de configuración')
    },
    mostrarDetalles (dispositivo) {
      this.sucursalSeleccionada = dispositivo
      this.$router.push({ path: '/sensors/areasTrabajo', query: dispositivo })
    },
    AltaRegion (lista) {
      this.empresaSeleccionada = lista
      this.mostrarModal = true
      setTimeout(() => {
        this.initDropzone()
      }, 100)
    },
    // Método para cerrar el modal
    close () {
      this.mostrarModal = false
      this.empresaSeleccionada = null
    },
    cancelForm () {
      this.close()
    },
    guardar () {
      this.formSucursal.URL_img = this.imagenSeleccionada
      console.log(this.formSucursal)
      // this.lista_empresas.push(this.formSucursal)
    },
    guardarArchivos () {
      // Procesa la cola de archivos cuando se presiona el botón de guardar
      console.log(this.myDropzone)
    },
    initDropzone () {
      const self = this
      this.$dropzone('#myDropzone', {
        autoProcessQueue: false, // Desactiva la carga automática de archivos
        url: '/upload',
        maxFilesize: 356, // Tamaño máximo en KB
        acceptedFiles: 'image/jpeg', // Solo se permiten imágenes JPEG
        maxFiles: 1, // Solo se permite cargar una imagen
        dictDefaultMessage:
                'Arrastra aquí una imagen JPEG (max 356KB, 390x250px) o haz clic para seleccionarla',
        thumbnailWidth: 200, // Ancho de la imagen previa en píxeles
        thumbnailHeight: 200, // Alto de la imagen previa en píxeles
        // Habilitar la eliminación de archivos
        addRemoveLinks: true,

        init () {
          this.on('addedfile', function (file) {
            console.log('Archivo agregado:', file)
            // Guarda la imagen cargada en la variable
            self.imagenSeleccionada = `@/assets/imgEmpresas/${file.name}`
            console.log('Archivo agregado a la variable:', self.imagenSeleccionada)
          })
        }
      })
    }
  },
  head () {
    return {
      title: 'Areas de Trabajo - Sistema de Monitoreo'
    }
  }
}
</script>

      <style scoped>
      .barra{
        background-color: rgb(255, 255, 255);
        grid-area: barra;
        display: flex;
      }
      .gris{
        background-color: rgb(194, 192, 192);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20%;
        clip-path: polygon(0 0, 100% 0, 71% 100%, 0 100%);
      }
      .white{
        display: flex;
        width: 80%;
        margin: auto 0;
      }
      .title{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
      }
      .config{
        width: 20%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;

      }
      .config p{
        font-weight: bold;
      }
      .contenido {
        margin: 0;
        display: flex;
        justify-content: center;
        width: 100vw;
      }

      .fotusu{
        height: 35px;
        width: 35px;
        color: rgb(3, 3, 3);
      }
      .configicon{
        height: 35px;
        width: 35px;
        color: rgb(3, 3, 3);
      }
      .empresa-name2 {
      position: absolute;
      top: 0%;
      left: 0%;
      width: 100%;
      height: 100%;
      color: white;
      padding: 5px 10px; /* Añade espacio alrededor del texto */
      border-radius: 5px; /* Añade bordes redondeados */
      font-size: 30px; /* Tamaño del texto */
      background-color: #a19f9f8e;
      z-index: 20;
      display: flex;
      justify-content: center;
      align-items: center;
    }
      .empresa-card {
      cursor: pointer;
      position: relative;
    }
    .empresa-name {
      width: 100%;
      height: 100%;
      padding: 5px 10px; /* Añade espacio alrededor del texto */
      border-radius: 5px; /* Añade bordes redondeados */
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .agregarempresa{
      height: 35px;
      width: 35px;
      color: rgb(255, 255, 255);
    }
  </style>
