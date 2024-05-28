<template>
  <card-component title="Editar Perfil" icon="account-circle">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submit)">
        <!-- <BInputWithValidation
          v-model="form.name"
          rules="required"
          name="username"
          label="Usuario"
          horizontal
        />
        <br /> -->
        <b-field label="Nombre completo" horizontal>
          <BInputWithValidation
            v-model="form.first_name"
            rules="required"
            name="first_name"
            label="Nombre(s)"
            label-position="on-border"
            normal
          />
          <BInputWithValidation
            v-model="form.last_name"
            rules="required"
            name="last_name"
            label="Apellido(s)"
            label-position="on-border"
            normal
          />
        </b-field>
        <hr>
        <BInputWithValidation
          v-model="form.username"
          rules="required"
          name="username"
          label="Usuario"
          horizontal
          normal
        />
        <hr>
        <BInputWithValidation
          v-model="form.email"
          rules="required"
          name="email"
          label="E-mail"
          horizontal
          normal
        />
        <hr>
        <b-field horizontal>
          <div class="control">
            <button
              type="submit"
              class="button is-primary"
              :class="{ 'is-loading': isLoading }"
            >
              Guardar
            </button>
          </div>
        </b-field>
      </form>
    </ValidationObserver>
  </card-component>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProfileUpdateForm',
  data () {
    return {
      isFileUploaded: false,
      isLoading: false,
      form: {
        name: null,
        email: null
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    user (newVal) {
      this.form = newVal
    }
  },
  mounted () {
    this.form = this.user
  },
  methods: {
    async submit () {
      this.isLoading = true
      try {
        await this.$store.dispatch('modules/auth/updateAccount', this.form)
        this.$store.commit('user', this.form)
        this.$buefy.snackbar.open({
          message: 'Perfil actualizado',
          queue: false
        })
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'No sé puede actualizar en este momento',
          type: 'is-danger',
          queue: false
        })
      }
    }
  }
}
</script>
