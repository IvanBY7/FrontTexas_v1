<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="login">
          <div class="card box">
            <div class="has-text-centered">
              <figure class="avatar">
                <img
                  class="logo"
                  tag="img"
                  src="../../assets/logo.png"
                  width="200px"
                  alt="Logo"
                >
              </figure>
            </div>
            <form @submit="false">
              <BInputWithValidation
                v-model="form.username"
                label="Usuario"
                placeholder="Usuario"
                message="Ingresa tu nombre de usuario"
                name="username"
                icon="account"
                rules="required"
                expanded
                autofocus
                :normal="true"
              />
              <BInputWithValidation
                v-model="form.password"
                label="Contraseña"
                placeholder="Contraseña"
                message="Ingresa tu contraseña"
                expanded
                type="password"
                name="password"
                icon="lock"
                rules="required"
                password-reveal
                :normal="true"
              />
              <small class="has-text-dark">
                ¿Has olvidado tu contraseña?&nbsp;·&nbsp;
                <strong>
                  <nuxt-link class="link" to="/auth/password-recovery">
                    Recuperala
                  </nuxt-link>
                </strong>
              </small>
              <hr>
              <b-field>
                <b-button
                  expanded
                  native-type="submit"
                  type="is-primary"
                  :class="{ 'is-loading': isLoading }"
                  @click.prevent="handleSubmit(submit)"
                >
                  Ingresar
                </b-button>
              </b-field>
              <small class="has-text-dark">
                ¿No tienes cuenta?&nbsp;·&nbsp;
                <strong>
                  <nuxt-link class="link" to="/auth/register">
                    Regístrate
                  </nuxt-link>
                </strong>
              </small>
            </form>
          </div>
        </div>
        <vue-particles
          class="particles"
          color="#aaaaaa"
          :particle-opacity="0.9"
          :particles-number="120"
          shape-type="circle"
          :particle-size="3"
          lines-color="#aaaaaa"
          :lines-width="1"
          :line-linked="true"
          :line-opacity="0.4"
          :lines-distance="150"
          :move-speed="0.4"
          :hover-effect="true"
          hover-mode="grab"
          :click-effect="true"
          click-mode="push"
        />
      </div>
    </section>
  </ValidationObserver>
</template>

<script>
import redirect from '@/mixins/redirect'
export default {
  name: 'Login',
  layout: 'full-page',
  mixins: [redirect],
  data () {
    return {
      isLoading: false,
      form: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    async submit () {
      this.alert = null
      this.isLoading = true
      try {
        await this.$store.dispatch('modules/auth/login', this.form)
        this.$router.push({
          path: this.redirect || '/sensors/dashboard',
          query: this.otherQuery
        })
      } catch (error) {
        this.$buefy.snackbar.open({
          message: 'Credenciales incorrectas',
          type: 'is-danger'
        })
      } finally {
        this.isLoading = false
      }
    }
  },
  head () {
    return {
      title: 'Login — Sistema de Monitoreo'
    }
  }
}
</script>

<style scoped>
.button {
  transition: 0.6s;
  background-color: #828787;
}

.button:hover {
  background: rgba(158, 155, 155, 0.8);
  transition: 0.6s;
  color: black;
}

.link {
  color: rgb(63, 61, 154);
}

.link:hover {
  color: rgb(77, 77, 77);
}

.login {
  max-width: 700px;
  position: fixed;
}

.hero-body {
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
}

.particles {
  width: 100%;
  height: 100vh;
}

.hero {
  background: linear-gradient(
    50deg,
    #e8e8e8 5%, /* gris oscuro */
    #eeeeee 9.87%, /* gris */
    #f2f2f2 30.04%, /* gris medio */
    #f4f4f4 36.71%, /* gris */
    #f6f6f6 64.41%, /* gris */
    #f8f8f8 76.96%, /* gris */
    #ffffff 99.96% /* gris */
  );
}
.box {
  max-width: 400px;
  background-color: #b4beb6;
}
@media screen and (min-width: 769px), print {
    .hero-body {
        padding: 0;
    }
}
</style>
