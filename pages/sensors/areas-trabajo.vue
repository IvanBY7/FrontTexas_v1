<template>
  <div class="container m-3">
    <div class="contenido">
      <div class="columns is-multiline">
        <div v-for="(area, index) in lista_areas" :key="index" class="column is-one-quarter">
          <div class="card empresa-card is-hoverable">
            <div class="card-content">
              <strong class="empresa-name">
                <p>{{ area.Nombre_zona }}</p>
              </strong>
              <div class="columns is-multiline">
                <div v-for="(sensor,index2) in area.sensores" :key="index2" :class="['column']">
                  <div :class="['card-access', estadoSensor(sensor)]" @click="mostrarDetalles(sensor)">
                    <p>
                      <b-icon :icon="sensor.tipo.Icono" class="custom-icon-size" />
                    </p>
                    <strong v-if="sensor.tipo.Indice_widget==1">
                      {{ getvalor(sensor.valor) }}{{ sensor.tipo.Tipo_dato }}
                    </strong>
                    <strong v-else-if="sensor.tipo.Indice_widget==2">
                      {{ estadoPuerta(sensor) }}
                    </strong>
                    <strong v-else-if="sensor.tipo.Indice_widget==3">
                      {{ getvalor(sensor.valor) }}{{ sensor.tipo.Tipo_dato }}
                    </strong>
                  </div>
                  <small class="textoligh">
                    Ultimo registro: <br> {{ getfecha(sensor.Fecha_registro) }}
                  </small>
                </div>
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
                <!-- <b-dropdown-item @click="info(sensor)">
                  Obtener info
                </b-dropdown-item> -->
              </b-dropdown>
            </div>
          </div>
        </div>
        <div v-if="(checkrol(1))" class="column is-one-quarter">
          <div class="card empresa-card is-hoverable" @click="AltaRegion()">
            <div class="card-image">
              <div class="empresa-name">
                <p>Agregar Sucursal</p>
              </div>
              <figure class="image is-4by3 card-access">
                <div class="empresa-name2 box">
                  <p>+</p>
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
            <h1>Alta de Zona</h1>
          </div>
        </div>
        <div class="modal-card-body">
          <b-field label="Nombre de la sucursal">
            <b-input
              v-model="formRegion.Nombre_zona"
              type="text"
              placeholder="Empresa"
              required
            />
          </b-field>
        </div>
        <footer class="modal-card-foot">
          <b-button
            label="Close"
            @click="close"
          />
          <b-button
            label="Dar Alta"
            type="is-primary"
            @click="createZona(formRegion)"
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
    this.$store.commit('setTitleStack', ['Zonas de la sucursal ' + this.$route.query.Nombre_sucursal])
  },
  data () {
    return {
      horaActual: '',
      lista_areas: [],
      listaUsuarios: {},
      mostrarModal: false, // Variable para controlar la visibilidad del modal
      sensorseleccionado: [],
      formRegion: {
        Nombre_zona: '',
        Is_active: true,
        fk_IdSucursal: this.$route.query.IdSucursal
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
  beforeDestroy () {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  },
  mounted () {
    this.getArea()
    this.intervalId = setInterval(() => {
      this.getArea()
    }, 15000)
  },
  methods: {
    info (sensor) {
      this.$buefy.dialog.alert({
        title: 'Empresa creada',
        message: `<b>Que zona pertenece?: </b>${sensor.Nombre_zona}<br>
                      <b>Rango: </b> ${sensor.Ubicacion} <br>
                      <b>Telefono: </b> ${sensor.Telefono} <br>
                      <b>Correo: </b> ${sensor.Correo} <br>`,
        confirmText: 'Aceptar'
      })
    },
    checkrol (rol) {
      if (this.$store.state.user.groups[0] === rol) {
        return true
      } else {
        return false
      }
    },
    getfecha (fecha) {
      const opciones = {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Mexico_City',
        hour12: false // Esto asegura que la hora se muestre en formato de 24 horas
      }

      const fechaFormateada = new Date(fecha).toLocaleString('es-MX', opciones)
      return fechaFormateada
    },
    getvalor (valor) {
      const valornum = parseInt(valor)
      return valornum
    },
    estadoPuerta (sensor) {
      if (sensor.valor === '1.0') {
        return 'ABIERTO'
      } else {
        return 'CERRADO'
      }
    },
    estadoSensor (sensor) {
      if (sensor.tipo.Indice_widget === '1') {
        const valornum = parseFloat(sensor.valor)
        const valormax = parseFloat(sensor.tipo.Rango_max)
        const valoromin = parseFloat(sensor.tipo.Rango_min)

        if (valornum > valormax || valornum < valoromin) {
          return 'borde-peligro'
        } else {
          return 'borde-estable'
        }
      } else if (sensor.tipo.Indice_widget === '2') {
        if (sensor.valor === '1.0') {
          return 'borde-peligro'
        } else {
          return 'borde-estable'
        }
      } else if (sensor.tipo.Indice_widget === '3') {
        const valornum = parseFloat(sensor.valor)
        const valormax = parseFloat(sensor.tipo.Rango_max)
        const valoromin = parseFloat(sensor.tipo.Rango_min)

        if (valornum > valormax || valornum < valoromin) {
          return 'borde-peligro'
        } else {
          return 'borde-estable'
        }
      }
    },
    baseUrl (url) {
      return process.env.baseUrl + url // Reemplaza esto con la URL base de tu API
    },
    async getArea () {
      try {
        const response = await this.$store.dispatch('modules/areas/getArea', this.$route.query.IdSucursal)
        this.lista_areas = response
        console.log(this.lista_areas)
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
    mostrarDetalles (sensor) {
      this.sensorseleccionado = sensor
      localStorage.setItem('data', JSON.stringify(sensor))
      this.$router.push({ path: '/sensors/graficas' })
    },
    async createZona (form) {
      console.log(form)
      const formData = new FormData()
      formData.append('Nombre_zona', form.Nombre_zona)
      formData.append('Is_active', form.Is_active)
      formData.append('fk_IdSucursal', form.fk_IdSucursal)
      if (form.Nombre_zona) {
        try {
          const response = await this.$store.dispatch('modules/areas/createArea', formData)
          this.close()
          console.log(response)
          this.getArea()
          this.$buefy.dialog.alert({
            title: 'Sucursal creada',
            message: `<b>Nombre de la sucursal: </b>${response}<br>`,
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
    AltaRegion (lista) {
      this.empresaSeleccionada = lista
      this.mostrarModal = true
      this.formEmpleado.username = this.user.username
      this.formEmpleado.IdEmpresa = this.$route.query.fk_IdEmpresa
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
      title: 'Sucursales - AgenteMonitor'
    }
  }
}
</script>

<style scoped>
.textoligh{
  font-weight: bolder;
  font-size: .8rem;
}
.mdi-24px.mdi-set, .mdi-24px.mdi:before {
    font-size: 50px;
}
.custom-icon-size {
  font-size: 48px;
}
.borde-estable {
   border: 5px solid green;
   border-radius: 15px; /* Cambia el color del borde para el estado activo */
  }

  .borde-peligro {
   border: 5px solid red;
   border-radius: 15px;/* Cambia el color del borde para el estado inactivo */
  }
  .borde-amarillo {
   border: 5px solid yellow;
   border-radius: 15px;/* Define el color de borde amarillo */
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
    .card-access{
      cursor: pointer;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      padding: inherit;
      background-color: rgb(255, 255, 255);
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
    display: flex;
    justify-content: center;
    min-height: 25vh;
    background-color: white;
  }
  .empresa-name {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .empresa-name2 {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    min-height: 15vh;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 30px;
    background-color: rgba(161, 159, 159, 0.55686);
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
@media screen and (min-width: 769px), print {
    .column.is-one-quarter, .column.is-one-quarter-tablet {
        flex: none;
        width: 40%;
    }
  }
  @media screen and (min-width: 769px), print {
    .column.sensor-is-one-quarter, .column.is-one-quarter-tablet {
        flex: none;
        width: 50%;
    }
  }
.menu{
  position: absolute;
  top: .5rem;
  right: .5rem;
}
.card-header:last-child, .card-content:last-child, .card-footer:last-child {
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
}
@media screen and (min-width: 769px), print {
    .columns:not(.is-desktop) {
        display: flex;
        justify-content: center;
    }
}
.button {
    background-color: transparent;
    border-color: transparent;
    border-width: 1px;
    color: #363636;
    cursor: pointer;
    justify-content: center;
    /* padding-bottom: calc(0.5em - 1px); */
    /* padding-left: 1em; */
    /* padding-right: 1em; */
    /* padding-top: calc(0.5em - 1px); */
    text-align: center;
    white-space: nowrap;
}
.column {
    display: block;
    -ms-flex-preferred-size: 0;
    flex-basis: auto;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -ms-flex-negative: 1;
    flex-shrink: 1;
    padding: 0.75rem;
}
</style>
