<template>
  <ValidationObserver v-slot="{ handleSubmit }">
    <section class="hero is-fullheight">
      <div class="hero-body" >
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
                />
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
              <hr />
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
              <!-- <small class="has-text-dark">
                ¿No tienes cuenta?&nbsp;·&nbsp;
                <strong>
                  <nuxt-link class="link" to="/auth/register">
                    Regístrate
                  </nuxt-link>
                </strong>
              </small> -->
            </form>
          </div>
        </div>
        <vue-particles
          class="particles"
          color="#dedede"
          :particle-opacity="0.7"
          :particles-number="80"
          shape-type="circle"
          :particle-size="3"
          lines-color="#dedede"
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
          path: this.redirect || '/',
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
      title: 'Login — ParamQ'
    }
  }
}
</script>

<style scoped>
.button {
  transition: 0.6s;
}

.button:hover {
  background: rgba(82, 30, 135, 0.8);
  transition: 0.6s;
}

.link {
  color: rgb(104, 103, 103);
}

.link:hover {
  color: rgb(240, 184, 94);
}

.login {
  max-width: 700px;
  position: fixed;
}

.hero-body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.particles {
  width: 100%;
}

.hero {
  background: linear-gradient(
    50deg,
    #361066 5%,
    #441480 9.87%,
    rgb(113, 33, 211) 30.04%,
    #7322d6 36.71%,
    #e94e1b 64.41%,
    #ed5410 76.96%,
    #ED5410.4%,
    #ff9503 99.97%
  );
}
.box {
  max-width: 400px;
  background-color: white;
}
</style>
