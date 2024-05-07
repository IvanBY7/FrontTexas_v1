<template>
  <card-component title="Password Recovery" icon="lock-open" :has-card-header-background="true" :has-button-slot="true">
    <nuxt-link slot="button" to="/" class="button is-small">
      Dashboard
    </nuxt-link>

    <form method="POST" @submit.prevent="submit">
      <b-field label="E-mail Address" message="E-mail used for registration">
        <b-input v-model="form.email" type="email" name="email" required autofocus />
      </b-field>

      <hr>

      <b-field grouped>
        <div class="control">
          <button type="submit" class="button is-black" :class="{'is-loading':isLoading}">
            Send Reset Link
          </button>
        </div>
        <div class="control">
          <nuxt-link to="/full-page/login" class="button is-black is-outlined">
            Back
          </nuxt-link>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      isLoading: false,
      isSuccess: false,
      form: {
        email: null
      }
    }
  },
  methods: {
    submit () {
      this.isLoading = true

      setTimeout(() => {
        this.form.email = null
        this.isLoading = false
        this.isSuccess = true

        this.$buefy.snackbar.open({
          message: 'Link sent',
          duration: 1000,
          queue: false
        })
      }, 750)
    }
  },
  head () {
    return {
      title: 'Password Recovery — ParamQ'
    }
  }
}
</script>
