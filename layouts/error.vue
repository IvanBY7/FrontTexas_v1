<template>
  <section class="section hero is-fullheight is-error-section">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-fifths">
            <div class="has-text-centered">
              <card-component
                v-if="isInCard"
                title="404 Not Found"
                icon="alert"
                :has-button-slot="true"
                :has-card-header-background="true"
              >
                <nuxt-link slot="button" to="/" class="button is-small">
                  <b-icon icon="desktop-mac" custom-size="default" />
                </nuxt-link>

                <error-content title="404 No Encontrado" @go-back="goBack" />
              </card-component>

              <error-content v-else title="Sample Error" @go-back="goBack" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Error',
  layout: 'full-page',
  props: {
    isInCard: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  },
  head () {
    return {
      title: 'Error #1 — ParamQ'
    }
  }
}
</script>
