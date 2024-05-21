<template>
  <div class="container m-3 is-fullheight">
    <div class="contenido">
      <div class="columns is-multiline">
        <div v-for="(region, index) in lista_regiones" :key="index" class="column is-one-quarter">
          <div class="card empresa-card">
            <div class="card-image">
              <figure class="image is-4by3 card-access">
                <img :src="baseUrl(region.ImagenEmpresa)" alt="Imagen de region" @click="mostrarDetalles(region)">
              </figure>
              <div class="empresa-name">
                <p>{{ region.Nombre_region }}</p>
              </div>
              <b-dropdown aria-role="menu" class="menu">
                <button slot="trigger" class="button">
                  <b-icon icon="menu-down" />
                </button>
                <b-dropdown-item v-if="(checkrol(1))" @click="eliminar(region)">
                  Eliminar
                </b-dropdown-item>
                <b-dropdown-item>
                  Configurar
                </b-dropdown-item>
                <b-dropdown-item @click="info(region)">
                  Obtener info
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
        <div v-if="(checkrol(1))" class="column is-one-quarter">
          <div class="card empresa-card card-access is-hoverable" @click="AltaRegion()">
            <div class="card-image">
              <figure class="image is-4by3">
                <div class="empresa-name2 box">
                  <p>+</p>
                </div>
              </figure>
              <div class="empresa-name">
                <p>Agregar Región</p>
              </div>
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
          <b-field label="Nombre de la región">
            <b-input
              v-model="formRegion.Nombre_Region"
              type="text"
              placeholder="Empresa"
              required
            />
          </b-field>
          <b-field label="Ubicación de la región">
            <b-input
              v-model="formRegion.Ubicacion"
              type="text"
              placeholder="Ubicación"
              required
            />
          </b-field>
          <b-field label="Teléfono de la región">
            <b-input
              v-model="formRegion.Telefono"
              type="text"
              placeholder="Teléfono"
              required
            />
          </b-field>
          <b-field label="Correo electrónico de la región">
            <b-input
              v-model="formRegion.Correo"
              type="text"
              placeholder="Correo"
              required
            />
          </b-field>
          <div id="myDropzone" class="dropzone dz-preview">
            <div class="dz-message" data-dz-message>
              Arrastra aquí una imagen JPEG (max 500KB, 390x250px) o haz clic para
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
            @click="createRegiones(formRegion)"
          />
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import redirect from '@/mixins/redirect'
import { mapState } from 'vuex'
import Dropzone from 'dropzone'

export default {
  name: 'Regiones',
  mixins: [redirect],
  fetch () {
    this.$store.commit('setTitleStack', ['Regiones de la empresa ' + this.$route.query.Nombre_Empresa])
  },
  data () {
    return {
      horaActual: '',
      lista_regiones: [],
      mostrarModal: false, // Variable para controlar la visibilidad del modal
      regionseleccionado: [],
      formRegion: {
        Nombre_Region: '',
        ImagenRegion: '',
        Ubicacion: '',
        Telefono: '',
        Correo: '',
        fk_IdEmpresa: this.$route.query.IdEmpresa,
        is_active: true
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
    Dropzone.autoDiscover = false// Deshabilitar la inicialización automática de Dropzone
    this.getfkEmpresa()
    this.getRegiones()
  },
  methods: {
    checkrol (rol) {
      if (this.$store.state.user.groups[0] === rol) {
        return true
      } else {
        return false
      }
    },
    info (region) {
      this.$buefy.dialog.alert({
        title: 'Información de la Región',
        message: `<b>Nombre: </b>${region.Nombre_region}<br>
                  <b>Ubicación: </b> ${region.Ubicacion} <br>
                  <b>Teléfono: </b> ${region.Telefono} <br>
                  <b>Correo: </b> ${region.Correo} <br>
                  `,
        confirmText: 'Aceptar'
      })
    },
    eliminar (region) {
      this.$buefy.dialog.confirm({
        title: 'Eliminación de Región',
        message: `¿Estás seguro de que deseas eliminar la región ${region.Nombre_region}?`,
        type: 'is-danger',
        hasIcon: true,
        iconPack: 'fas',
        icon: 'exclamation-circle',
        cancelText: 'Cancelar',
        confirmText: 'Eliminar',
        canCancel: true,
        onConfirm: async () => {
          try {
            await this.$store.dispatch('modules/regiones/delRegion', region.IdRegion)
            this.getRegiones()
            this.$buefy.snackbar.open({
              message: 'Region eliminado correctamente',
              type: 'is-success'
            })
          } catch {
            this.$buefy.snackbar.open({
              message: 'Error al eliminar la region',
              type: 'is-danger'
            })
          }
        }
      })
    },
    baseUrl (url) {
      return process.env.baseUrl + url // Reemplaza esto con la URL base de tu API
    },
    async getRegiones () {
      try {
        const response = await this.$store.dispatch('modules/regiones/getRegion', this.$route.query.IdEmpresa)
        console.log(response)
        this.lista_regiones = response
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error al cargar las regiones',
          type: 'is-danger'
        })
      }
    },
    async createRegiones (form) {
      if (form.Nombre_Region) {
        const formData = new FormData()
        formData.append('Nombre_region', form.Nombre_Region)
        formData.append('ImagenEmpresa', form.ImagenRegion)
        formData.append('Ubicacion', form.Ubicacion) // Agrega el archivo al FormData, donde 'file' es el archivo seleccionado
        formData.append('Telefono', form.Telefono)
        formData.append('Correo', form.Correo)
        formData.append('fk_IdEmpresa', form.fk_IdEmpresa)
        formData.append('is_active', form.is_active)
        try {
          const response = await this.$store.dispatch('modules/regiones/createRegion', formData)
          this.close()
          this.$buefy.snackbar.open({
            message: 'Región creada con éxito',
            type: 'is-success'
          })
          this.getRegiones()
          return response.data
        } catch {
          this.$buefy.snackbar.open({
            message: 'Error al crear la empresa',
            type: 'is-danger'
          })
        }
      } else {
        this.$buefy.snackbar.open({
          message: 'Por favor ingresa un nombre',
          type: 'is-danger'
        })
      }
    },
    DatosEmpresa () {
      this.formEmpresa.Nombre_Empresa = this.$route.query.Nombre_Empresa
      return this.formEmpresa.Nombre_Empresa
    },
    getfkEmpresa () {
      this.formRegion.fk_IdEmpresa = this.$route.query.IdEmpresa
    },
    prueba () {
      this.$router.go(-1)
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
      this.formEmpresa.URL_img = this.imagenSeleccionada
      // this.lista_empresas.push(this.formEmpresa)
    },
    initDropzone () {
      const vm = this
      const myDropzone = new Dropzone('#myDropzone', {
        autoProcessQueue: false, // Desactiva la carga automática de archivos
        url: '/upload',
        maxFilesize: 0.5, // Tamaño máximo del archivo en MB
        maxFiles: 1, // Número máximo de archivos permitidos
        acceptedFiles: 'image/jpeg', // Tipos de archivos aceptados (solo imágenes JPEG)
        dictDefaultMessage: 'Arrastra archivos aquí o haz clic para cargar',
        dictInvalidFileType: 'Solo se permiten archivos JPG',
        dictFileTooBig: 'El archivo es demasiado grande (máximo 0.5 MB)',
        thumbnailWidth: 200, // Ancho de la imagen previa en píxeles
        thumbnailHeight: 200, // Alto de la imagen previa en píxeles
        // Habilitar la eliminación de archivos
        addRemoveLinks: true
      })

      myDropzone.on('addedfile', function (file) {
        vm.formRegion.ImagenRegion = file
      })
      // Manejar eventos de Drag and Drop
      myDropzone.on('dragover', function () {
        document.querySelector('#my-modal-dropzone').classList.add('dragover')
      })

      myDropzone.on('dragleave', function () {
        document.querySelector('#my-modal-dropzone').classList.remove('dragover')
      })

      // Manejar eventos de carga de archivos
      myDropzone.on('processing', function (file) {
        // Acciones antes de cargar el archivo
      })

      myDropzone.on('error', function (file, errorMessage) {
        this.removeFile(file)
        vm.$buefy.snackbar.open({
          message: 'El peso de la imagen excede el limite',
          type: 'is-danger'
        })
      })
    }
  },
  head () {
    return {
      title: 'Regiones - AgenteMonitor'
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
    position: relative;
  }
  .card-access{
      cursor: pointer;
    }
  .empresa-name {
    width: 100%;
    height: 100%;
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
  .dropzone {
    border: 2px dashed #cccccc;
    border-radius: 10px;
    min-height: 150px;
    padding: 20px;
    margin-bottom: 20px;
    text-align: center;
    cursor: pointer;
  }

  .dropzone:hover {
    background-color: #f0f0f0;
  }

  /* Opcional: Estilos para resaltar el área al arrastrar archivos */
  .dropzone.dragover {
    background-color: #e0e0e0;
  }

  /* Opcional: Estilos para el mensaje de texto dentro del Dropzone */
  .dropzone-text {
    font-size: 16px;
    color: #070707;
  }

  /* Opcional: Estilos para los mensajes de error */
  .dropzone-error {
    color: #ff0000;
  }
  .menu{
    position: absolute;
    top: .5rem;
    right: .5rem;
    z-index: 50;
  }
</style>
