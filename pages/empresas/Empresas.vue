<template>
  <div class="container m-3">
    <div class="contenido">
      <div class="columns is-multiline">
        <div v-for="(empresa, index) in lista_empresas" :key="index" class="column is-one-quarter">
          <div class="card empresa-card is-hoverable" @click="verEmpresa(empresa)">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="baseUrl(empresa.Url_img)" :alt="baseUrl(empresa.Url_img)">
              </figure>
              <div class="empresa-name">
                <p>{{ empresa.Nombre_Empresa }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-one-quarter">
          <div class="card empresa-card is-hoverable" @click="AltaEmpresa(lista_empresas)">
            <div class="card-image">
              <figure class="image is-4by3">
                <div class="empresa-name2 box">
                  {{ '+' }}
                </div>
              </figure>
              <div class="empresa-name">
                <p>Agregar Empresa</p>
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
            <h1>Alta de empresa</h1>
          </div>
        </div>
        <div class="modal-card-body">
          <b-field label="Nombre de la Empresa">
            <b-input
              v-model="formEmpresa.Nombre_Empresa"
              type="text"
              placeholder="Empresa"
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
            @click="createEmpresas(formEmpresa)"
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
// import axios from 'axios' // Importa la biblioteca Axios
// import { getToken } from '../../utils/cookies'

export default {
  name: 'Empresas',
  mixins: [redirect],
  fetch () {
    this.$store.commit('setTitleStack', ['Empresas'])
  },
  data () {
    return {
      horaActual: '',
      lista_empresas: [],
      mostrarModal: false, // Variable para controlar la visibilidad del modal
      empresaSeleccionada: [],
      formEmpresa: {
        Nombre_Empresa: null,
        URL_img: '',
        email: ''
      },
      myDropzone: null,
      imagenSeleccionada: null // Variable para almacenar la imagen seleccionada
    }
  },
  computed: {
    ...mapState(['userName', 'userEmail', 'userFullName', 'user'])
  },
  mounted () {
    Dropzone.autoDiscover = false// Deshabilitar la inicialización automática de Dropzone
    this.getuseremail()
    this.getEmpresas()
  },
  methods: {
    baseUrl (url) {
      // Agrega la URL base de tu API aquí
      console.log('http://localhost:8000' + url)
      return 'http://localhost:8000/api/v1' + url // Reemplaza esto con la URL base de tu API
    },
    getuseremail () {
      this.formEmpresa.email = this.user.email
    },
    async getEmpresas () {
      try {
        const response = await this.$store.dispatch('modules/companys/getCompany', this.user.email)
        this.lista_empresas = response
        console.log(response)
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error al cargar las empresas',
          type: 'is-danger'
        })
      }
    },
    async createEmpresas (form) {
      if (form.Nombre_Empresa) {
        const formData = new FormData()
        formData.append('Nombre_Empresa', form.Nombre_Empresa)
        formData.append('email', form.email)
        formData.append('Url_img', form.URL_img) // Agrega el archivo al FormData, donde 'file' es el archivo seleccionado
        try {
          const response = await this.$store.dispatch('modules/companys/createCompany', formData)
          this.close()
          this.$buefy.snackbar.open({
            message: 'Empresa creada con exito',
            type: 'is-success'
          })
          this.getEmpresas()
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
    prueba () {
      this.$router.go(-1)
    },
    config () {
      console.log(this.user)
      alert('Aqui se redirige al modulo de configuración')
    },
    verEmpresa (empresa) {
      this.empresaSeleccionada = empresa
      console.log(empresa.URL_img)
      this.$router.push({ path: '/empresas/Regiones', query: empresa })
    },
    AltaEmpresa (lista) {
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
      this.formEmpresa.Nombre_Empresa = null
      this.formEmpresa.URL_img = ''
    },
    cancelForm () {
      this.close()
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
        vm.formEmpresa.URL_img = file
        console.log(vm.formEmpresa)
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
      // this.$dropzone('#myDropzone', {
      //   autoProcessQueue: false, // Desactiva la carga automática de archivos
      //   url: '/upload',
      //   maxFilesize: 356, // Tamaño máximo en KB
      //   acceptedFiles: 'image/jpeg', // Solo se permiten imágenes JPEG
      //   maxFiles: 1, // Solo se permite cargar una imagen
      //   dictDefaultMessage:
      //         'Arrastra aquí una imagen JPEG (max 356KB, 390x250px) o haz clic para seleccionarla',
      //   thumbnailWidth: 200, // Ancho de la imagen previa en píxeles
      //   thumbnailHeight: 200, // Alto de la imagen previa en píxeles
      //   // Habilitar la eliminación de archivos
      //   addRemoveLinks: true,

      //   init () {
      //     this.on('addedfile', function (file) {
      //       console.log('Archivo agregado:', file)
      //       // Guarda la imagen cargada en la variable
      //       self.imagenSeleccionada = `@/assets/imgEmpresas/${file.name}`
      //       console.log('Archivo agregado a la variable:', self.imagenSeleccionada)
      //     })
      //   }
      // })
    }
  },
  head () {
    return {
      title: 'Empresas - AgenteMonitor'
    }
  }
}
</script>
    <style scoped>
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
      padding: 0 5%;
      display: flex;
      justify-content: center;
      margin: auto;
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
.dropzone .dz-preview .dz-error-mark svg {
  fill: red; /* Cambia el color a rojo */
}
/* Cambiar el tamaño de la palomita de éxito */
.dropzone .dz-preview .dz-error-mark svg {
  width: 30px; /* Cambia el ancho */
  height: 30px; /* Cambia la altura */
}

/* Cambiar la posición de la palomita de éxito */
.dz-success-mark {
  /* Estilos personalizados aquí */
  display: none;
}

/* Personalizar la tacha de error */
.dz-error-mark {
  /* Estilos personalizados aquí */
}
/* Opcional: Estilos para el enlace "Eliminar archivo" */
.dropzone-remove-link {
  color: #cc0000;
  text-decoration: underline;
  cursor: pointer;
}

/* Opcional: Estilos para el botón de carga */
.dropzone-upload-button {
  background-color: #4caf50;
  color: #ffffff;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

/* Opcional: Estilos para el botón de carga al pasar el ratón */
.dropzone-upload-button:hover {
  background-color: #45a049;
}
</style>
