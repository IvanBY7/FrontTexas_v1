<template>
  <section class="section hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-fifths">
            <div class="has-text-centered">
              <card-component
                v-if="isInCard"
                title="Cuenta Activada"
                icon="check-circle"
                :has-button-slot="true"
                :has-card-header-background="true"
                class="tarjeta"
              >
                <succes-content title="Cuenta Activada" @go-back="goBack" />
              </card-component>

              <error-content v-else title="Error" @go-back="goBack" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Exito',
  layout: 'full-page',
  props: {
    isInCard: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack () {
      this.$router.push('/auth/login')
    }
  },
  head () {
    return {
      title: 'Registro exitoso —AgenteMonitor'
    }
  }
}
</script>
<style>
  .tarjeta{
    background-color: rgb(255, 255, 255);
  }
</style>
