<template>
  <div class="container m-3">
    <div class="contenido">
      <div class="columns is-multiline">
        <div v-for="(sucursal, index) in lista_sucursales" :key="index" class="column is-one-quarter">
          <div class="card empresa-card" @click="mostrarDetalles(sucursal)">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="sucursal.URL_img" alt="Imagen de empresa">
                <div class="empresa-name">
                  <p>{{ sucursal.Nombre_Sucursal }}</p>
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
          <b-field label="Nombre de la sucursal">
            <b-input
              type="text"
              :value="formSucursal.Nombre_Sucursal"
              placeholder="Empresa"
              required
            />
          </b-field>
          <b-field label="Encargado de la sucursal">
            <b-input
              type="text"
              :value="formSucursal.Encargado"
              placeholder="Encargado"
              required
            />
          </b-field>

          <div id="myDropzone" class="dropzone">
            <div class="dz-message" data-dz-message>
              Arrastra aquí una imagen JPEG (max 356KB, 390x250px) o haz clic para
              seleccionarla.
            </div>
          </div>
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

export default {
  name: 'Sucursales',
  mixins: [redirect],
  fetch () {
    this.$store.commit('setTitleStack', ['Sucursales'])
  },
  data () {
    return {
      horaActual: '',
      lista_sucursales: [
        {
          IdSucursal: 1,
          Nombre_Sucursal: 'Texas Francisco de Montejo',
          Encargado: 'Geovany',
          URL_img: require('@/assets/imgEmpresas/merida_montejo.jpg')
        },
        {
          IdSucursal: 2,
          Nombre_Sucursal: 'Texas Caucel',
          Encargado: 'Lugo',
          URL_img: require('@/assets/imgEmpresas/merida_caucel.jpg')
        }
      ],
      mostrarModal: false, // Variable para controlar la visibilidad del modal
      sucursalSeleccionada: [],
      formRegion: {
        IdRegion: '',
        Nombre_Region: '',
        Ubicacion: '',
        telefono: '',
        email: '',
        fk_IdEmpresa: ''
      },
      formSucursal: {
        IdSucursal: '',
        Nombre_Sucursal: '',
        Encargado: '',
        URL_img: ''
      },
      myDropzone: null,
      imagenSeleccionada: null // Variable para almacenar la imagen seleccionada
    }
  },
  computed: {

  },

  mounted () {
    this.obtenerHoraActual()
    // Actualizar la hora cada segundo
    setInterval(() => {
      this.obtenerHoraActual()
    }, 1000)
  },
  methods: {
    DatosRegion () {
      this.formRegion.IdRegion = this.$route.query.IdRegion
      this.formRegion.Nombre_Region = this.$route.query.Nombre_Region
      return this.formRegion.Nombre_Region
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
    mostrarDetalles (sucursal) {
      this.sucursalSeleccionada = sucursal
      this.$router.push({ path: '/sensors/areas-trabajo', query: sucursal })
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
      title: 'Login - AgenteMonitor'
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
      background-color: rgb(255, 255, 255);
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
  .agregarempresa{
    height: 35px;
    width: 35px;
    color: rgb(255, 255, 255);
  }
    </style>
