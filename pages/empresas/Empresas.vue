<template>
  <div class="container m-3">
    <div class="contenido">
      <div class="columns is-multiline">
        <div v-for="(empresa, index) in lista_empresas" :key="index" class="column is-one-quarter">
          <div class="card empresa-card is-hoverable" @click="verEmpresa(empresa)">
            <div class="card-image">
              <figure class="image is-4by3">
                <img :src="empresa.URL_img" alt="Imagen de empresa">
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
              type="text"
              :value="formEmpresa.Nombre_Empresa"
              placeholder="Empresa"
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
            @click="createEmpresas"
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
  name: 'Empresas',
  mixins: [redirect],
  fetch () {
    this.$store.commit('setTitleStack', ['Empresas'])
  },
  data () {
    return {
      horaActual: '',
      lista_empresas: [
        {
          IdEmpresa: 1,
          Nombre_Empresa: 'Texas RoadHouse',
          Fecha_Registro: '08-05-2024',
          URL_img: require('@/assets/imgEmpresas/texasroadhouse.png')
        },
        {
          IdEmpresa: 2,
          Nombre_Empresa: 'Maricos de Chichi',
          Fecha_Registro: '08-05-2024',
          URL_img: require('@/assets/imgEmpresas/mariscos.png')
        },
        {
          IdEmpresa: 3,
          Nombre_Empresa: 'Texas RoadHouse',
          Fecha_Registro: '08-05-2024',
          URL_img: require('@/assets/imgEmpresas/texasroadhouse.png')
        },
        {
          IdEmpresa: 4,
          Nombre_Empresa: 'Texas RoadHouse',
          Fecha_Registro: '08-05-2024',
          URL_img: require('@/assets/imgEmpresas/texasroadhouse.png')
        }
      ],
      mostrarModal: false, // Variable para controlar la visibilidad del modal
      empresaSeleccionada: [],
      formEmpresa: {
        Nombre_Empresa: '',
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
    this.getuseremail()
  },
  methods: {
    getuseremail () {
      this.formEmpresa.email = this.user.email
    },
    async createEmpresas (form) {
      try {
        const response = await this.$store.dispatch('/modules/companys/createCompany', form)
        return response.data
      } catch {
        this.$buefy.snackbar.open({
          message: 'Error al crear la empresa',
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
</style>
