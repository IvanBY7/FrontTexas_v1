<template>
  <div>
    <section class="container m-3">
      <tiles>
        <card-component
          :title="formCardTitle"
          icon="account-edit"
          class="tile is-child"
        >
          <b-steps v-model="activeStep" :has-navigation="false">
            <b-step-item
              :clickable="activeStep > 0"
              label="Datos generales"
              icon="account"
            >
              <h1 class="title is-4">
                Información general
              </h1>
              <ClientForm
                :form="form"
                @save="saveForm"
                @cancel="cancelForm"
                @next="nextStep"
                @previous="previousStep"
              />
            </b-step-item>
            <b-step-item
              :clickable="activeStep > 1"
              label="Dirección"
              icon="map-marker"
            >
              <h1 class="title is-4">
                Dirección
              </h1>
              <ClientAddressForm
                :form="form"
                @save="saveForm"
                @cancel="cancelForm"
                @next="nextStep"
                @previous="previousStep"
              />
            </b-step-item>
            <b-step-item
              :clickable="false"
              label="Datos familiares"
              icon="account-group"
            >
              <h1 class="title is-4">
                Información familiar
              </h1>
              <ClientFamiliarForm
                :form="form"
                @save="saveForm"
                @cancel="cancelForm"
              />
            </b-step-item>
          </b-steps>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'ClientDetail',
  meta: {
    titleStack: ['Clientes', 'Detalle']
  },
  async fetch () {
    await this.getData()
  },
  data () {
    return {
      id: null,
      isLoading: false,
      form: this.getClearFormObject(),
      createdReadable: null,
      isEdit: false,
      activeStep: 0
    }
  },
  computed: {
    getFullName () {
      return `${this.form.nombre_persona} ${this.form.apellido_persona}`
    },
    titleStack () {
      let lastCrumb

      if (this.isEdit) {
        lastCrumb = this.getFullName
      } else {
        lastCrumb = 'Nuevo cliente'
      }

      return ['Admin', 'Clientes', lastCrumb]
    },
    heroTitle () {
      if (this.isEdit) {
        return this.getFullName
      } else {
        return 'Crear Cliente'
      }
    },
    heroRouterLinkTo () {
      if (this.isEdit) {
        return '/client'
      } else {
        return '/'
      }
    },
    heroRouterLinkLabel () {
      if (this.isEdit) {
        return 'Nuevo cliente'
      } else {
        return 'Dashboard'
      }
    },
    formCardTitle () {
      if (this.isEdit) {
        return 'Editar Cliente'
      } else {
        return 'Nuevo Cliente'
      }
    }
  },
  methods: {
    nextStep () {
      this.activeStep = this.activeStep + 1
    },
    previousStep () {
      this.activeStep -= this.activeStep
    },
    async saveForm (form) {
      try {
        console.log(form)
        this.$store.commit('buttonLoadingToggle')
        await this.$store.dispatch('modules/clients/createOrUpdate', form)
        this.$buefy.snackbar.open({
          message: 'Cliente guardado',
          type: 'is-success',
          queue: false
        })
        this.$router.push('/clients')
      } catch (error) {
        console.log(error)
      } finally {
        this.$store.commit('buttonLoadingToggle')
      }
    },
    cancelForm () {
      console.log(this.activeStep)
    },
    async getData () {
      if (this.$route.params.id) {
        this.$store.commit('loadingToggle')
        try {
          const res = await this.$store.dispatch(
            'modules/clients/getById',
            this.$route.params.id
          )
          console.log(res)

          if (res) {
            this.isEdit = true
            this.form = res
          } else {
            this.$router.push({ name: 'clients' })
          }
        } catch (e) {
          console.log(e)
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger',
            queue: false
          })
        } finally {
          this.$store.commit('loadingToggle')
        }
      }
    },
    getClearFormObject () {
      return {}
    },

    input (v) {
      this.createdReadable = dayjs(v).format('MMM D, YYYY')
    },
    submit () {
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false

        this.$buefy.snackbar.open({
          message: 'Demo only',
          queue: false
        })
      }, 500)
    }
  },
  head () {
    return {
      title: 'Client — ParamQ'
    }
  }
}
</script>
