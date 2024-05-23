<template>
  <div class="container m-3">
    <div class="contenido">
      <div class="columns is-multiline">
        <div v-for="(sucursal, index) in lista_sucursales" :key="index" class="column is-one-quarter">
          <div class="card empresa-card is-hoverable">
            <div class="card-image">
              <figure class="image is-4by3 card-access">
                <img :src="baseUrl(sucursal.ImagenSucursal)" alt="Imagen de empresa" @click="mostrarDetalles(sucursal)">
              </figure>
              <div class="empresa-name">
                <p>{{ sucursal.Nombre_sucursal }}</p>
              </div>
              <b-dropdown aria-role="menu" class="menu">
                <button slot="trigger" class="button">
                  <b-icon icon="menu-down" />
                </button>
                <b-dropdown-item v-if="(checkrol(1))" @click="eliminar(sucursal)">
                  Eliminar
                </b-dropdown-item>
                <b-dropdown-item>
                  Configurar
                </b-dropdown-item>
                <b-dropdown-item @click="info(sucursal)">
                  Obtener info
                </b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>
        <div v-if="(checkrol(1))" class="column is-one-quarter">
          <div class="card empresa-card is-hoverable" @click="AltaRegion()">
            <div class="card-image">
              <figure class="image is-4by3 card-access">
                <div class="empresa-name2 box">
                  <p>+</p>
                </div>
              </figure>
              <div class="empresa-name">
                <p>Agregar Sucursal</p>
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
            <h1>Alta de sucursal</h1>
          </div>
        </div>
        <div class="modal-card-body">
          <b-field label="Nombre de la sucursal">
            <b-input
              v-model="formSucursal.Nombre_sucursal"
              type="text"
              placeholder="Empresa"
              required
            />
          </b-field>
          <b-field label="Teléfono">
            <b-input
              v-model="formSucursal.Telefono"
              type="text"
              placeholder="Teléfono"
              required
            />
          </b-field>
          <b-field label="Correo electrónico">
            <b-input
              v-model="formSucursal.Correo"
              type="text"
              placeholder="Correo"
              required
            />
          </b-field>
          <b-field label="Ubicación">
            <b-input
              v-model="formSucursal.Ubicacion"
              type="text"
              placeholder="Ubicación"
              required
            />
          </b-field>
          <b-field label="Encargado de la sucursal">
            <b-select
              v-model="formSucursal.Encargado"
              placeholder="Encargado"
              icon="user"
              icon-pack="fas"
              expanded
            >
              <option
                v-for="(empleado, index) in listaUsuarios"
                :key="index"
                :value="empleado.fk_IdUsuario.id"
              >
                {{ empleado.fk_IdUsuario.first_name }} {{ empleado.fk_IdUsuario.last_name }}
              </option>
            </b-select>
          </b-field>
          <b-field label="Licencia">
            <b-input
              v-model="formSucursal.Licencia"
              type="text"
              placeholder="Licencia"
              required
            />
          </b-field>
          <small class="has-text-grey">En caso de que no ingrese una licencia, se le asignará una licencia de prueba</small>
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
            @click="createSucursal(formSucursal)"
          />
        </footer>
      </div>
    </b-modal>
  </div>
</template>

<script>
import redirect from '@/mixins/redirect'
import Dropzone from 'dropzone'
import { mapState } from 'vuex'

export default {
  name: 'Sucursales',
  mixins: [redirect],
  fetch () {
    this.$store.commit('setTitleStack', ['Sucursales de la región ' + this.$route.query.Nombre_region])
  },
  data () {
    return {
      horaActual: '',
      lista_sucursales: [],
      listaUsuarios: {},
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
        Nombre_sucursal: '',
        Ubicacion: '',
        Telefono: '',
        Correo: '',
        is_active: true,
        ImagenSucursal: '',
        fk_IdRegion: this.$route.query.IdRegion,
        Licencia: 'demo',
        Encargado: ''
      },
      formEmpleado: {
        username: '',
        IdEmpresa: ''
      },
      myDropzone: null,
      imagenSeleccionada: null // Variable para almacenar la imagen seleccionada
    }
  },
  computed: {
    ...mapState(['userName', 'userEmail', 'userFullName', 'user'])
  },

  mounted () {
    this.getSucursal()
  },
  methods: {
    checkrol (rol) {
      if (this.$store.state.user.groups[0] === rol) {
        return true
      } else {
        return false
      }
    },
    info (sucursal) {
      console.log(sucursal)
      this.$buefy.dialog.alert({
        title: 'Empresa creada',
        message: `<b>Nombrea: </b>${sucursal.Nombre_sucursal}<br>
                      <b>Ubicación: </b> ${sucursal.Ubicacion} <br>
                      <b>Telefono: </b> ${sucursal.Telefono} <br>
                      <b>Correo: </b> ${sucursal.Correo} <br>`,
        confirmText: 'Aceptar'
      })
    },
    baseUrl (url) {
      return process.env.baseUrl + url // Reemplaza esto con la URL base de tu API
    },
    async getSucursal () {
      try {
        const response = await this.$store.dispatch('modules/sucursales/getSucursal', this.$route.query.IdRegion)
        this.lista_sucursales = response
        console.log(response)
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error al cargar las regiones',
          type: 'is-danger'
        })
      }
    },
    DatosRegion () {
      this.formRegion.IdRegion = this.$route.query.IdRegion
      this.formRegion.Nombre_Region = this.$route.query.Nombre_Region
      return this.formRegion.Nombre_Region
    },
    prueba () {
      this.$router.go(-1)
    },
    mostrarDetalles (sucursal) {
      this.sucursalSeleccionada = sucursal
      console.log(sucursal)
      this.$router.push({ path: '/sensors/areas-trabajo', query: sucursal })
    },
    async createSucursal (form) {
      console.log(form)
      if (form.Nombre_sucursal) {
        const formData = new FormData()
        formData.append('Nombre_sucursal', form.Nombre_sucursal)
        formData.append('Ubicacion', form.Ubicacion)
        formData.append('Telefono', form.Telefono)
        formData.append('Correo', form.Correo)
        formData.append('is_active', form.is_active)
        formData.append('ImagenSucursal', form.ImagenSucursal)
        formData.append('fk_IdRegion', form.fk_IdRegion)
        formData.append('Licencia', form.Licencia)
        formData.append('Encargado', form.Encargado) // Agrega el archivo al FormData, donde 'file' es el archivo seleccionado
        try {
          const response = await this.$store.dispatch('modules/sucursales/createSucursal', formData)
          this.close()
          console.log(response)
          this.getSucursal()
          this.$buefy.dialog.alert({
            title: 'Sucursal creada',
            message: `<b>Nombre de la sucursal: </b>${response.sucursal.Nombre_sucursal}<br>
                      <b>Ubicación: </b>${response.sucursal.Ubicacion}<br>
                      <b>Teléfono: </b>${response.sucursal.Telefono}<br>
                      <b>Correo: </b> ${response.sucursal.Correo} <br>
                      <b>Fecha de vencimiento: </b> ${response.fecha_vencimiento} <br>`,
            confirmText: 'Aceptar'
          })
          return response.data
        } catch {
          this.$buefy.snackbar.open({
            message: 'Error al crear la sucursal',
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
    async AltaRegion (lista) {
      this.empresaSeleccionada = lista
      this.mostrarModal = true
      this.formEmpleado.username = this.user.username
      this.formEmpleado.IdEmpresa = this.$route.query.fk_IdEmpresa
      try {
        const response = await this.$store.dispatch('modules/users/getUserbyCompany', this.formEmpleado)
        this.listaUsuarios = response
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error al cargar los usuarios',
          type: 'is-danger'
        })
      }
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
      // this.lista_empresas.push(this.formSucursal)
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
        vm.formSucursal.ImagenSucursal = file
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
      title: 'Sucursales - Sistema de Monitoreo'
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
    .card-access{
      cursor: pointer;
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

/* Opcional: Estilos para el enlace "Eliminar archivo" */
.dropzone-remove-link {
  color: #cf2d2d;
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
.menu{
  position: absolute;
  top: .5rem;
  right: .5rem;
}
</style>
