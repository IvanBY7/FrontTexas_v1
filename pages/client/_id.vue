<template>
  <div>
    <ClientModal
      :is-active="isClientModalActive"
      :active-client="activeClient"
      @refresh="getData()"
      @close="isClientModalActive = false"
    />
    <section class="container m-3">
      <div class="card">
        <div class="card-content">
          <div class="title">
            Cliente #{{ form.number }}
          </div>
          <client-card :item="form" @edit="createOrEditClient" />
          <div class="content">
            <client-details :client="form" />
          </div>
          <hr>
          <div class="content">
            <base-table
              v-if="form.id"
              list-text="Familiares"
              sticky-header
              narrowed
              striped
              view-mode="table"
              :actions-enabled="['update']"
              :total="form.family.length"
              :list-query="{}"
              :data="form.family"
            >
              <b-table-column
                v-slot="props"
                field="id"
                cell-class="has-no-head-mobile is-image-cell"
              >
                <figure class="image is-32x32">
                  <img
                    :src="
                      `https:\/\/avatars.dicebear.com\/v2\/initials\/${props.row.first_name}-${props.row.last_name}.svg`
                    "
                    class="is-rounded"
                  >
                </figure>
              </b-table-column>
              <b-table-column
                v-slot="props"
                sortable
                field="name"
                label="Nombre"
              >
                {{ props.row.first_name }}
              </b-table-column>
              <b-table-column
                v-slot="props"
                sortable
                field="last_name"
                label="Apellido"
              >
                {{ props.row.last_name }}
              </b-table-column>
              <b-table-column
                v-slot="props"
                sortable
                field="relationship"
                label="Parentezco"
              >
                {{ props.row.relationship }}
              </b-table-column>
              <b-table-column
                v-slot="props"
                sortable
                field="birthday"
                label="Cumpleaños"
              >
                {{ props.row.birthday | birthdate }}
              </b-table-column>
              <b-table-column custom-key="actions" centered label="Acciones">
                <b-icon icon="dots-vertical" />
              </b-table-column>
            </base-table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'ClientDetail',
  async fetch () {
    await this.getData()
    this.$store.commit('setTitleStack', ['Clientes', 'Detalle'])
  },
  data () {
    return {
      id: null,
      isClientModalActive: false,
      isLoading: false,
      form: this.getClearFormObject(),
      createdReadable: null,
      isEdit: false,
      activeStep: 0,
      activeClient: {
        person: {},
        family: [{}]
      }
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
    createOrEditClient (item) {
      if (item) {
        this.activeClient = item
      } else {
        this.activeClient = {
          person: {},
          family: [{}]
        }
      }
      this.isClientModalActive = true
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
            'modules/clients/getDetailsById',
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
