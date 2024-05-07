<template>
  <div>
    <section class="container m-3">
      <tiles>
        <profile-update-form class="tile is-child" />
        <card-component title="Perfil" icon="account" class="tile is-child">
          <user-avatar class="has-max-width is-aligned-center" />
          <hr>
          <div class="columns">
            <div class="column">
              <b-field label="Nombre">
                <b-input
                  :value="userFullName"
                  custom-class="is-static"
                  readonly
                />
              </b-field>
              <hr>
              <b-field label="Correo electrónico">
                <b-input :value="userEmail" custom-class="is-static" readonly />
              </b-field>
              <hr>
              <b-field label="Empresa">
                <figure class="media-left image is-48x48">
                  <img v-if="isDarkModeActive" src="~/assets/logo.png">
                  <img v-else src="~/assets/logo.png">
                </figure>
                <div class="media-content">
                  <div class="content has-text-left">
                    <span class="title is-7">
                      {{ user.license.business_name }}
                    </span>
                    <br />
                    <small class="has-text-weight-light">ParamQ</small>
                  </div>
                </div>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Usuario">
                <b-input :value="userName" custom-class="is-static" readonly />
              </b-field>
              <hr>
              <b-field label="Rol">
                <b-input :value="getRol" custom-class="is-static" readonly />
              </b-field>
              <hr>
              <b-field label="Licencia">
                <b-icon
                  v-if="user.license.plan === 'PREMIUM'"
                  class="has-text-primary"
                  icon="license"
                />
                <b-icon
                  v-else-if="user.license.plan === 'BASIC'"
                  class="has-text-grey"
                  icon="license"
                />
                <b-icon
                  v-else-if="user.license.plan === 'FREE'"
                  class="has-text-success"
                  icon="license"
                />
                &nbsp;
                <div class="media-content">
                  <div class="content has-text-left">
                    <span class="title is-7">
                      Plan {{ user.license.plan }}
                    </span>
                    <b-collapse
                      :open="false"
                      position="is-bottom"
                      aria-id="contentIdForA11y1"
                    >
                      <template #trigger="props">
                        <a
                          class="has-text-info"
                          aria-controls="contentIdForA11y1"
                        >
                          <small>{{
                            !props.open ? 'Ver detalles' : 'Ocultar detalles'
                          }}</small>
                          <b-icon
                            size="is-small"
                            :icon="!props.open ? 'menu-down' : 'menu-up'"
                          />
                        </a>
                      </template>
                      <small class="has-text-weight-light">
                        Finalización: {{ user.license.end_date | shortDate }}
                      </small>
                      <br>
                      <small class="has-text-weight-light">
                        No. {{ user.license.id.toUpperCase() }}
                      </small>
                    </b-collapse>
                  </div>
                </div>
              </b-field>
            </div>
          </div>
        </card-component>
      </tiles>
      <password-update-form />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Profile',
  fetch () {
    this.$store.commit('setTitleStack', ['Mi cuenta'])
  },
  data () {
    return {
      plan: 'BASIC'
    }
  },
  computed: {
    ...mapState(['userName', 'userEmail', 'userFullName', 'user']),
    ...mapState(['isDarkModeActive']),
    getRol () {
      if (this.$store.state.user.groups[0] === 1) {
        return 'Agente'
      } else if (this.$store.state.user.groups[0] === 2) {
        return 'Administrador'
      }
      return ''
    }
  },
  head () {
    return {
      title: 'Mi cuenta — ParamQ'
    }
  }
}
</script>
