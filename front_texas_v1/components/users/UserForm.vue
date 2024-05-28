<template>
  <ValidationObserver ref="form" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit">
      <div class="columns">
        <div class="column">
          <BInputWithValidation
            v-model="form.first_name"
            label="Nombre"
            name="first_name"
            label-position="on-border"
            rules="required"
            normal
          />
          <br />
          <BInputWithValidation
            v-model="form.username"
            label="Usuario"
            name="username"
            label-position="on-border"
            rules="required"
            normal
          />
          <br />
          <BInputWithValidation
            v-model="form.password"
            rules="min:8"
            label-position="on-border"
            password-reveal
            type="password"
            name="password"
            vid="password"
            label="Contraseña"
            normal
          />
        </div>
        <div class="column">
          <BInputWithValidation
            v-model="form.last_name"
            label="Apellido"
            name="last_name"
            label-position="on-border"
            rules="required"
            normal
          />
          <br />
          <BInputWithValidation
            v-model="form.email"
            label-position="on-border"
            name="e-mail"
            label="E-mail"
            rules="required"
            normal
          />
          <br />
          <BInputWithValidation
            v-model="form.password_confirm"
            rules="confirmed:password"
            label-position="on-border"
            password-reveal
            type="password"
            name="password_confirm"
            label="Confirmar contraseña"
            normal
          />
        </div>
      </div>
      <ButtonGroup
        :handle-submit="handleSubmit"
        saving
        @save="save"
        @cancel="cancel"
      />
    </form>
  </ValidationObserver>
</template>

<script>
export default {
  name: 'UserForm',
  props: {
    form: Object
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    save () {
      this.$emit('save', this.form)
    },
    cancel () {
      this.$emit('cancel')
    },
    next () {
      this.$emit('next')
    },
    previous () {
      this.$emit('previous')
    }
  }
}
</script>
