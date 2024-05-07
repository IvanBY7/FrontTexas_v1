<template>
  <section class="hero is-fullheight">
    <div class="hero-body" style="justify-content: center;">
      <!-- <div class="container is-max-desktop register">
        <div class="box">
          <div class="columns mt-1">
            <div class="column left has-text-centered is-hidden-mobile">
              <h1 class="title is-3">ParamQ ParamQ</h1>
              <h2 class="subtitle colored is-5">
                Gestión para aseguradoras.
              </h2>
              <p>
                Administrar tus clientes nunca había sido tan fácil, desde
                mandar un simple correo, hasta realizar reporteo de todas las
                pólizas de tu compañía.
              </p>
              <br />
              <img
                class="logo"
                tag="img"
                src="../../assets/logo.png"
                width="200px"
                alt="Logo"
              />
            </div>
            <div class="column right">
              <div class="has-text-centered mb-5">
                <h1 class="title is-4">Regístrate ahora!</h1>
                <p class="description">
                  Al crear una cuenta aceptas nuestros términos y condiciones.
                </p>
              </div>

              <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                <form @submit="false" class="has-text-left">
                  <BInputWithValidation
                    :normal="true"
                    margin="mb-4"
                    label-position="on-border"
                    label="Nombre(s)"
                    rules="required"
                    type="text"
                    name="first_name"
                    placeholder="John"
                    v-model="form.first_name"
                  />
                  <BInputWithValidation
                    :normal="true"
                    margin="mb-4"
                    label-position="on-border"
                    label="Apellido(s)"
                    rules="required"
                    type="text"
                    name="lastname"
                    placeholder="Doe"
                    v-model="form.last_name"
                  />
                  <BInputWithValidation
                    :normal="true"
                    margin="mb-4"
                    label-position="on-border"
                    label="Email"
                    rules="required|email"
                    type="email"
                    name="email"
                    v-model="form.email"
                    placeholder="johndoe@paramq.com"
                  />
                  <BInputWithValidation
                    :normal="true"
                    margin="mb-4"
                    label-position="on-border"
                    label="Empresa"
                    rules="required"
                    type="text"
                    name="company"
                    placeholder="Seguros example"
                    v-model="form.company"
                  />
                  <BInputWithValidation
                    :normal="true"
                    margin="mb-4"
                    label-position="on-border"
                    label="Contraseña"
                    rules="required|password"
                    data-vv-as="field"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    password-reveal
                    vid="password"
                    v-model="form.password"
                  />
                  <BInputWithValidation
                    :normal="true"
                    margin="mb-4"
                    label-position="on-border"
                    label="Confirmar contraseña"
                    rules="required|confirmed:password"
                    name="Password"
                    type="password"
                    placeholder="Confirmar contraseña"
                    password-reveal
                    v-model="form.password_confirm"
                  />
                  <hr />
                  <b-field>
                    <button
                      class="button is-block is-primary is-fullwidth"
                      :class="{ 'is-loading': isLoading }"
                      @click.prevent="handleSubmit(signup)"
                    >
                      Registrarse
                    </button>
                  </b-field>
                  <small class="has-text-dark">
                    ¿Ya tienes una cuenta?&nbsp;·&nbsp;
                    <strong>
                      <nuxt-link class="link" to="/auth/login">
                        Iniciar sesión
                      </nuxt-link>
                    </strong>
                  </small>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div> -->
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
</template>

<script>
import redirect from '@/mixins/redirect'
export default {
  name: 'Login',
  layout: 'full-page',
  mixins: [redirect],
  fetch () {
    this.$router.push('/')
  },
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
    submit () {
      this.isLoading = true
      try {
        // await this.$store.dispatch('modules/auth/login', this.form)
        this.$router.push('/')
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

.register {
  max-width: 700px;
  position: fixed;
}

.hero-body {
  padding-top: 0%;
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
  background-color: white;
}
</style>
