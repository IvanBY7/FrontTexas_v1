<template>
  <section class="hero is-fullheight">
    <div class="hero-body" style="justify-content: center;">
      <div class="container is-max-desktop register">
        <div class="box">
          <div class="columns mt-1">
            <div class="column left has-text-centered is-hidden-mobile">
              <h1 class="title is-3">
                Agente Monitor
              </h1>
              <h2 class="subtitle colored is-5">
                Gestión para aseguradoras.
              </h2>
              <br>
              <img
                class="logo"
                tag="img"
                src="../../assets/logo.png"
                width="200px"
                alt="Logo"
              >
              <br><br>
              <b-field>
                <b-switch
                  v-model="is_ceo"
                  :value="true"
                  type="is-success"
                >
                  Soy dueño de una empresa
                </b-switch>
              </b-field>
            </div>
            <div class="column right">
              <div class="has-text-centered mb-5">
                <h1 class="title is-4">
                  Regístrate ahora!
                </h1>
                <p class="description">
                  Al crear una cuenta aceptas nuestros términos y condiciones.
                </p>
              </div>

              <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                <form class="has-text-left">
                  <BInputWithValidation
                    v-model="form.username"
                    :normal="true"
                    margin="mb-4"
                    label-position="on-border"
                    label="Nombre de usuario"
                    rules="required"
                    type="text"
                    name="nombre de usuario"
                    placeholder="JohnMendez"
                  />
                  <BInputWithValidation
                    v-model="form.first_name"
                    :normal="true"
                    margin="mb-4"
                    label-position="on-border"
                    label="Nombre(s)"
                    rules="required"
                    type="text"
                    name="first_name"
                    placeholder="John"
                  />
                  <BInputWithValidation
                    v-model="form.last_name"
                    :normal="true"
                    margin="mb-4"
                    label-position="on-border"
                    label="Apellido(s)"
                    rules="required"
                    type="text"
                    name="lastname"
                    placeholder="Doe"
                  />
                  <BInputWithValidation
                    v-model="form.email"
                    :normal="true"
                    margin="mb-4"
                    label-position="on-border"
                    label="Email"
                    rules="required|email"
                    type="email"
                    name="email"
                    placeholder=""
                  />
                  <BInputWithValidation
                    v-if="!is_ceo"
                    v-model="form.company"
                    :normal="true"
                    margin="mb-4"
                    label-position="on-border"
                    label="Clave de empresa"
                    rules="required"
                    type="text"
                    name="clave"
                    placeholder="clave"
                  />
                  <BInputWithValidation
                    v-model="form.password"
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
                  />
                  <BInputWithValidation
                    v-model="form.password_confirm"
                    :normal="true"
                    margin="mb-4"
                    label-position="on-border"
                    label="Confirmar contraseña"
                    rules="required|confirmed:password"
                    name="Password"
                    type="password"
                    placeholder="Confirmar contraseña"
                    password-reveal
                  />
                  <hr>
                  <b-field>
                    <button
                      class="button is-block is-fullwidth"
                      :class="{ 'is-loading': isLoading }"
                      @click.prevent="handleSubmit(submit)"
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
</template>

<script>
import redirect from '@/mixins/redirect'
export default {
  name: 'Login',
  layout: 'full-page',
  mixins: [redirect],
  data () {
    return {
      is_ceo: true,
      isLoading: false,
      form: {
        username: null,
        password: null,
        groups: []
      }
    }
  },
  methods: {
    async submit () {
      this.isLoading = true
      console.log(this.form)
      if (this.is_ceo) {
        this.form.groups.push(1)
      } else {
        this.form.groups.push(2)
      }
      try {
        await this.$store.dispatch('modules/users/createOrUpdate', this.form)
        this.$buefy.dialog.alert({
          title: 'Cuenta registrada',
          message: `Tu cuenta ha sido registrada<br>
                    revisa tu correo para activar tu cuenta<br>`,
          confirmText: 'Aceptar',
          onConfirm: () => {
            window.location.reload()
          }
        })
      } catch (error) {
        this.$buefy.snackbar.open({
          message: 'Eror al registrarse',
          type: 'is-danger'
        })
      } finally {
        this.isLoading = false
      }
    }
  },
  head () {
    return {
      title: 'Registro — AgenteMonitor'
    }
  }
}
</script>

<style scoped>
.button {
  background-color: #828787;
  transition: 0.6s;
  color: white;
  border: none;
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

.register {
  max-width: 700px;
  position: fixed;
  max-height: 100vh;
  overflow-y: scroll;
}

.hero-body {
  max-height: 100vh;
  padding: 0%;
}

.particles {
  width: 100%;
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
  background-color: #b4beb6;
}
</style>
