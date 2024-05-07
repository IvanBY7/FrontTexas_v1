<template>
  <div id="app">
    <div class="float-button">
      <float-action-button />
    </div>
    <nav-bar />
    <b-loading v-model="isLoading" :is-full-page="true" :can-cancel="false" />
    <aside-menu
      :menu="menu"
      :menu-bottom="menuBottom"
      :class="{ 'has-secondary': !!menuSecondary }"
      @menu-click="menuClick"
    />
    <aside-menu
      v-if="menuSecondary"
      :menu="menuSecondary"
      :is-secondary="true"
      :label="menuSecondaryLabel"
      :icon="menuSecondaryIcon"
      @menu-click="menuClick"
      @close="menuSecondaryCloseClick"
    />
    <title-bar :title-stack="titleStack" />
    <nuxt />
    <aside-right />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { customIconConfig } from '../utils/icons'
import { getValue } from '~/utils/cookies'

export default {
  name: 'App',
  data () {
    return {
      menuSecondary: null,
      menuSecondaryLabel: null,
      menuSecondaryIcon: null
    }
  },
  computed: {
    titleStack () {
      return this.$store.state.titleStack
    },
    menu () {
      if (this.$store.state.user.groups[0] === 2) {
        return [
          'GENERAL',
          [
            {
              to: '/',
              state: '1primary',
              icon: 'home',
              label: 'Inicio'
            }
          ]
        ]
      } else {
        return [
          'GENERAL',
          [
            {
              to: '/',
              state: '1primary',
              icon: 'home',
              label: 'Inicio'
            },
            {
              to: '/policies',
              label: 'Pólizas',
              state: '1warning',
              icon: 'shield-plus'
            },
            {
              to: '/clients',
              label: 'Clientes',
              state: '1success',
              icon: 'users-alt'
            },
            {
              to: '/employees',
              label: 'Vendedores',
              state: '1orange',
              icon: 'user-md'
            },
            {
              to: '/insurances',
              label: 'Aseguradoras',
              state: '1info',
              icon: 'university'
            },
            {
              to: '/products',
              label: 'Productos',
              state: '1white',
              icon: 'archive'
            }
          ],
          'ADMINISTRACIÓN',
          [
            // {
            //   to: '/roles',
            //   label: 'Roles',
            //   state: '1warning',
            //   icon: 'lock'
            // },
            {
              to: '/reporting',
              label: 'Reportes',
              state: '1primary',
              icon: 'file-download-alt'
            },
            {
              label: 'Mensajería',
              state: '1success',
              icon: 'envelopes',
              menu: [
                {
                  to: '/templates',
                  label: 'Plantillas',
                  state: '1dark',
                  icon: 'fast-mail-alt'
                },
                {
                  to: '/messages',
                  label: 'Envíos',
                  state: '1dark',
                  icon: 'envelope-send'
                }
              ]
            }
          ]
        ]
      }
    },
    menuBottom () {
      return [
        {
          action: 'logout',
          icon: 'signout',
          label: 'Salir',
          state: 'danger'
        }
      ]
    },
    ...mapState(['isOverlayVisible', 'isLoading'])
  },
  watch: {
    isOverlayVisible (newValue) {
      if (!newValue) {
        this.menuSecondaryClose()
      }
    }
  },
  created () {
    const hasDarkModePreference = getValue('darkModeActive')

    if (hasDarkModePreference) {
      this.$store.commit('darkModeToggle', true)
    }
    this.$buefy.config.setOptions(customIconConfig)
  },
  mounted () {
    document.documentElement.classList.add('has-aside-left')
    document.documentElement.classList.add('has-aside-mobile-transition')
    document.documentElement.classList.add('has-navbar-fixed-top')
  },
  methods: {
    clickItem (idx) {
      window.alert(idx)
    },
    menuClick (item) {
      if (item.menuSecondary) {
        this.menuSecondary = item.menuSecondary
        this.menuSecondaryLabel = item.menuSecondaryLabel
          ? item.menuSecondaryLabel
          : null
        this.menuSecondaryIcon = item.menuSecondaryIcon
          ? item.menuSecondaryIcon
          : null

        this.$store.commit('asideActiveForcedKeyToggle', item)
        this.$store.commit('overlayToggle', true)
      } else if (item.action) {
        if (item.action === 'logout') {
          this.$buefy.toast.open({
            message: 'Cerrando sesión...',
            type: 'is-danger',
            queue: false
          })
          this.$store.dispatch('modules/auth/logout').then(() => {
            window.location.reload()
          })
        } else if (item.action === 'dark-mode-toggle') {
          this.$store.commit('darkModeToggle')
        }
      }
    },
    menuSecondaryCloseClick () {
      this.$store.commit('overlayToggle', false)
    },
    menuSecondaryClose () {
      this.menuSecondary = this.menuSecondaryLabel = this.menuSecondaryIcon = null
      this.$store.commit('asideActiveForcedKeyToggle', null)
    }
  }
}
</script>

<style>
.fab-main-container {
  right: 10vh !important;
  z-index: 5 !important;
}
/* nav.navbar {
  border-top: 4px solid #7957d5;
  margin-bottom: 1rem;
}
.navbar-item.brand-text {
  font-weight: 300;
}
.navbar-item,
.navbar-link {
  font-size: 14px;
  font-weight: 700;
} */
.columns {
  width: 100%;
  height: 100%;
  margin-left: 0;
}
.card {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  margin-bottom: 2rem;
}
.card-header-title {
  color: #8f99a3;
  font-weight: 400;
}
.info-tiles {
  margin: 1rem 0;
}
.hero.welcome.is-info {
  background: #36d1dc;
  background: -webkit-linear-gradient(to right, #5b86e5, #36d1dc);
  background: linear-gradient(to right, #5b86e5, #36d1dc);
}
.hero.welcome .title,
.hero.welcome .subtitle {
  color: hsl(192, 17%, 99%);
}
.card .content {
  font-size: 14px;
}
.card-footer-item {
  font-size: 14px;
  font-weight: 700;
  color: #8f99a3;
}
.card-footer-item:hover {
}
.card-table .table {
  margin-bottom: 0;
}
.events-card .card-table {
  max-height: 250px;
  overflow-y: scroll;
}
</style>
