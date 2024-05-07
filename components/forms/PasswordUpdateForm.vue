<template>
  <card-component title="Cambiar contraseña" icon="lock">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submit)">
        <BInputWithValidation
          v-model="form.old_password"
          rules="required"
          name="old_password"
          type="password"
          label="Contraseña actual"
          horizontal
          normal
        />
        <hr>
        <BInputWithValidation
          v-model="form.password"
          rules="required|min:8"
          name="password"
          type="password"
          vid="password"
          label="Nueva contraseña"
          horizontal
          normal
        />
        <br>
        <BInputWithValidation
          v-model="form.password_confirm"
          rules="required|confirmed:password"
          name="password_confirm"
          type="password"
          label="Confirmar contraseña"
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
export default {
  name: 'PasswordUpdateForm',
  data () {
    return {
      isLoading: false,
      form: {
        old_password: null,
        password: null,
        password_confirm: null
      }
    }
  },
  methods: {
    async submit () {
      this.isLoading = true
      try {
        await this.$store.dispatch('modules/auth/changePassword', this.form)
        this.$buefy.snackbar.open({
          message: 'Contraseña actualizada',
          queue: false
        })
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        this.form = {
          old_password: null,
          password: null,
          password_confirm: null
        }
        if (error.data.old_password) {
          this.$buefy.snackbar.open({
            message: 'La contraseña actual es incorrecta',
            type: 'is-danger',
            queue: false
          })
        } else if (error.data.password) {
          for (const index in error.data.password) {
            if (error.data.password[index] === 'This password is too common.') {
              this.$buefy.snackbar.open({
                message: 'La contraseña es muy común.',
                type: 'is-danger',
                queue: false
              })
            } else if (
              error.data.password[index] ===
              'This password is entirely numeric.'
            ) {
              this.$buefy.snackbar.open({
                message:
                  'La nueva contraseña no puede ser completamente numérica.',
                type: 'is-danger',
                queue: false
              })
            } else if (
              error.data.password[index] ===
              'The password is too similar to the username.'
            ) {
              this.$buefy.snackbar.open({
                message:
                  'La nueva contraseña no puede ser similar al nombre de usuario.',
                type: 'is-danger',
                queue: false
              })
            } else {
              this.$buefy.snackbar.open({
                message: error.data.password[index],
                type: 'is-danger',
                queue: false
              })
            }
          }
        } else {
          this.$buefy.snackbar.open({
            message: 'No sé puede actualizar en este momento',
            type: 'is-danger',
            queue: false
          })
        }
      }
    }
  }
}
</script>
