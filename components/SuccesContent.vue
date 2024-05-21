<template>
  <div>
    <div class="error-page-icon">
      <b-icon icon="check-circle" custom-size="default" />
    </div>
    <div class="error-page-caption">
      <h1>Cuenta Activada</h1>
    </div>
    <div class="error-page-action">
      <div class="buttons is-centered">
        <button type="button" class="button is-black" @click="emitGoBack">
          Iniciar sesión
        </button>
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorContent',
  props: {
    icon: {
      type: String,
      default: 'power-plug'
    },
    title: {
      type: String,
      default: 'Error'
    }
  },
  methods: {
    emitGoBack () {
      this.$emit('go-back')
    }
  }
}
</script>
