<template>
  <div class="container m-3">
    <div class="contenido">
      <div class="columns is-multiline">
        <div v-for="(sensor, index) in lista_sensores" :key="index" class="column is-one-quarter">
          <div class="card empresa-card" @click="mostrarDetalles(sensor)">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="@/assets/recursos/sensor.png" alt="Imagen de empresa">
              </figure>
              <div class="empresa-name">
                <p>Sensor: {{ sensor.IdSensor }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import redirect from '@/mixins/redirect'

export default {
  name: 'Sensores',
  mixins: [redirect],
  fetch () {
    this.$store.commit('setTitleStack', ['Sensores'])
  },
  data () {
    return {
      horaActual: '',
      lista_sensores: [],
      mostrarModal: false, // Variable para controlar la visibilidad del modal
      sucursalSeleccionada: [],
      myDropzone: null,
      imagenSeleccionada: null, // Variable para almacenar la imagen seleccionada
      IdDispositivo: null
    }
  },
  computed: {

  },

  mounted () {
    this.DatosSucursal()
    this.getSensores()
  },
  methods: {
    async getSensores () {
      const id = this.DatosSucursal()
      try {
        const response = await this.$store.dispatch('modules/sensors/getSensors', id)
        this.lista_sensores = response.sensores
      } catch {
        this.$buefy.snackbar.open({
          message: 'Eror al cargar sensores',
          type: 'is-danger'
        })
      }
    },
    DatosSucursal () {
      this.IdDispositivo = this.$route.query.IdDispositivo
      return this.IdDispositivo
    },
    rutaimg () {

    },
    prueba () {
      this.$router.go(-1)
    },
    config () {
      alert('Aqui se redirige al modulo de configuración')
    },
    mostrarDetalles (sensor) {
      this.sucursalSeleccionada = sensor
      this.$router.push({ path: '/sensors/Registros', query: { IdSensor: sensor.IdSensor } })
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
      .full_page {
        width: 100vw;
        height: 100vh;

      display: grid;
      grid:
        "barra" 15%
        "contenido" 1fr
        / 1fr;
      gap: 0px;

    }
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
      grid-area: contenido;
      padding: 3% 7%;
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
