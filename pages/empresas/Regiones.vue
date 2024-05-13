<template>
  <div class="container m-3 is-fullheight">
    <div class="contenido">
      <div class="columns is-multiline">
        <div v-for="(region, index) in lista_regiones" :key="index" class="column is-one-quarter">
          <div class="card empresa-card" @click="mostrarDetalles(region)">
            <div class="card-image">
              <figure class="image is-4by3">
                <div class="empresa-name">
                  <p>{{ region.Nombre_Region }}</p>
                </div>
              </figure>
            </div>
          </div>
        </div>
        <div class="column is-one-quarter">
          <div class="card empresa-card is-hoverable" @click="AltaRegion()">
            <div class="card-image">
              <figure class="image is-4by3">
                <div class="empresa-name2 box">
                  <font-awesome-icon icon="plus" class="agregarempresa" />
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal de Buefy -->
    <b-modal ref="myModal" v-model="mostrarModal" :width="640" scroll="keep">
      <div class="modal-card card">
        <div class="modal-card-head">
          <div class="title">
            <h1>Alta de region</h1>
          </div>
        </div>
        <div class="modal-card-body">
          <b-field label="Nombre de la region">
            <b-input
              type="text"
              :value="formRegion.Nombre_Region"
              placeholder="Empresa"
              required
            />
          </b-field>
          <b-field label="Ubicación de la region">
            <b-input
              type="text"
              :value="formRegion.Ubicacion"
              placeholder="Ubicación"
              required
            />
          </b-field>
          <b-field label="Telefono de la region">
            <b-input
              type="text"
              :value="formRegion.telefono"
              placeholder="Teléfono"
              required
            />
          </b-field>
          <b-field label="Correo electrónico de la region">
            <b-input
              type="text"
              :value="formRegion.email"
              placeholder="Correo"
              required
            />
          </b-field>

          <!-- <div id="myDropzone" class="dropzone">
                            <div class="dz-message" data-dz-message>
                              Arrastra aquí una imagen JPEG (max 356KB, 390x250px) o haz clic para
                              seleccionarla.
                            </div>
                          </div> -->
        </div>
        <footer class="modal-card-foot">
          <b-button
            label="Close"
            @click="close"
          />
          <b-button
            label="Dar Alta"
            type="is-primary"
            @click="guardar"
          />
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import redirect from '@/mixins/redirect'
import { mapState } from 'vuex'

export default {
  name: 'Regiones',
  mixins: [redirect],
  fetch () {
    this.$store.push('setTitleStack', ['Regiones'])
  },
  data () {
    return {
      horaActual: '',
      lista_regiones: [
        {
          IdRegion: 1,
          Nombre_Region: 'Mexico',
          Ubicacion: '08-05-2024',
          telefono: '1234567891',
          email: '',
          fk_IdEmpresa: ''
        },
        {
          IdRegion: 2,
          Nombre_Region: 'Mérida',
          Ubicacion: '08-05-2024',
          telefono: '1234567891',
          email: '',
          fk_IdEmpresa: ''
        },
        {
          IdRegion: 3,
          Nombre_Region: 'Campeche',
          Ubicacion: '08-05-2024',
          telefono: '1234567891',
          email: '',
          fk_IdEmpresa: ''
        }
      ],
      mostrarModal: false, // Variable para controlar la visibilidad del modal
      regionseleccionado: [],
      formRegion: {
        IdRegion: 3,
        Nombre_Region: '',
        Ubicacion: '',
        telefono: '',
        email: '',
        fk_IdEmpresa: ''
      },
      formEmpresa: {
        IdEmpresa: 'id',
        Nombre_Empresa: '',
        Fecha_Registro: '',
        URL_img: ''
      },
      myDropzone: null,
      imagenSeleccionada: null // Variable para almacenar la imagen seleccionada
    }
  },
  computed: {
    ...mapState(['isDarkModeActive'])
  },

  mounted () {
    this.obtenerHoraActual()
    // Actualizar la hora cada segundo
    setInterval(() => {
      this.obtenerHoraActual()
    }, 1000)
  },
  methods: {
    DatosEmpresa () {
      this.formEmpresa.IdEmpresa = this.$route.query.IdRegion
      this.formEmpresa.Nombre_Empresa = this.$route.query.Nombre_Empresa

      const rutaImagen = this.$route.query.URL_img
      console.log(rutaImagen.replace(/^.*?(\bassets\/.*)$/, '/$1'))
      return this.formEmpresa.Nombre_Empresa
    },
    rutaimg () {

    },
    prueba () {
      this.$router.go(-1)
    },
    obtenerHoraActual () {
      const fecha = new Date()
      const horas = fecha.getHours()
      const minutos = fecha.getMinutes()
      this.horaActual = `${this.agregarCero(horas)}:${this.agregarCero(minutos)}`
    },
    agregarCero (numero) {
      return numero < 10 ? '0' + numero : numero
    },
    config () {
      alert('Aqui se redirige al modulo de configuración')
    },
    mostrarDetalles (region) {
      this.regionseleccionado = region
      console.log(region)
      this.$router.push({ path: '/empresas/sucursales', query: region })
    },
    AltaRegion (lista) {
      this.regionseleccionado = lista
      this.mostrarModal = true
      // setTimeout(() => {
      //   this.initDropzone();
      // }, 100);
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
      this.formEmpresa.URL_img = this.imagenSeleccionada
      console.log(this.formEmpresa)
      // this.lista_empresas.push(this.formEmpresa)
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
      title: 'Login - AgenteMonitor'
    }
  }
}
</script>

    <style scoped>
      .full_page {
        width: 100%;
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

    .empresa-card {
    cursor: pointer;
    position: relative;
  }
  .empresa-name {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    color: white;
    background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
    padding: 5px 10px; /* Añade espacio alrededor del texto */
    border-radius: 5px; /* Añade bordes redondeados */
    font-size: 30px; /* Tamaño del texto */
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
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
  .agregarempresa{
    height: 35px;
    width: 35px;
    color: rgb(255, 255, 255);
  }
    </style>
