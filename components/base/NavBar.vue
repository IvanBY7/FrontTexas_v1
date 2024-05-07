<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar is-fixed-top">
    <div class="navbar-brand">
      <p
        :title="toggleTooltip"
        style="cursor:pointer"
        class="navbar-item is-desktop-icon-only is-hidden-touch"
        @click.prevent="menuToggle"
      >
        <b-icon :icon="menuToggleIcon" />
      </p>
      <p
        class="navbar-item is-hidden-desktop"
        @click.prevent="menuToggleMobile"
      >
        <b-icon :icon="menuToggleMobileIcon" />
      </p>
    </div>
    <div class="navbar-brand is-right">
      <p
        style="cursor:pointer"
        class="navbar-item navbar-item-menu-toggle is-hidden-desktop"
        @click.prevent="updatesToggle"
      >
        <b-icon icon="bell" custom-size="default" />
      </p>
      <p
        style="cursor:pointer"
        class="navbar-item navbar-item-menu-toggle is-hidden-desktop"
        @click.prevent="menuNavBarToggle"
      >
        <b-icon :icon="menuNavBarToggleIcon" custom-size="default" />
      </p>
    </div>
    <div
      class="navbar-menu fadeIn animated faster"
      :class="{ 'is-active': isMenuNavBarActive }"
    >
      <div class="navbar-end">
        <nav-bar-menu class="has-divider has-user-avatar">
          <user-avatar />
          <div class="is-user-name">
            <span>{{ userFullName || userName }}</span>
          </div>

          <div slot="dropdown" class="navbar-dropdown">
            <nuxt-link
              to="/profile"
              class="navbar-item"
              exact-active-class="is-active"
            >
              <b-icon icon="account" custom-size="default" />
              <span>Mi Cuenta</span>
            </nuxt-link>
            <hr class="navbar-divider">
            <a class="navbar-item has-text-danger" @click="logout">
              <b-icon icon="logout" custom-size="default" />
              <span>Cerrar Sesión</span>
            </a>
          </div>
        </nav-bar-menu>
        <a
          class="navbar-item has-divider is-desktop-icon-only"
          title="Dark mode"
          @click="darkModeToggle"
        >
          <b-icon :icon="darkModeToggleIcon" custom-size="default" />
          <span>Dark mode</span>
        </a>
        <a
          class="navbar-item has-divider is-desktop-icon-only"
          title="Mensajes del sistema"
          @click.prevent="updatesToggle"
        >
          <b-icon
            icon="bell"
            custom-size="default"
            :class="{ 'has-update-mark': hasUpdates }"
          />
          <span>Mensajes del sistema</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NavBar',
  data () {
    return {
      isMenuNavBarActive: false
    }
  },
  computed: {
    menuNavBarToggleIcon () {
      return this.isMenuNavBarActive ? 'close' : 'dots-vertical'
    },
    menuToggleMobileIcon () {
      return this.isAsideMobileExpanded ? 'backburger' : 'forwardburger'
    },
    menuToggleIcon () {
      return this.isAsideExpanded ? 'backburger' : 'forwardburger'
    },
    toggleTooltip () {
      return this.isAsideExpanded ? 'Collapse' : 'Expand'
    },
    darkModeToggleIcon () {
      return this.isDarkModeActive ? 'white-balance-sunny' : 'weather-night'
    },
    ...mapState([
      'isNavBarVisible',
      'isAsideExpanded',
      'isAsideMobileExpanded',
      'isAsideRightVisible',
      'isDarkModeActive',
      'userName',
      'userFullName',
      'hasUpdates'
    ])
  },
  methods: {
    menuToggle () {
      this.$store.commit('asideStateToggle')
    },
    menuToggleMobile () {
      this.$store.commit('asideMobileStateToggle')
    },
    menuNavBarToggle () {
      this.isMenuNavBarActive = !this.isMenuNavBarActive
    },
    updatesToggle () {
      this.$store.commit('asideRightToggle')
    },
    darkModeToggle () {
      this.$store.commit('darkModeToggle')
    },
    logout () {
      this.$buefy.toast.open({
        message: 'Cerrando sesión...',
        type: 'is-danger',
        queue: false
      })
      this.$store.dispatch('modules/auth/logout').then(() => {
        window.location.reload()
      })
    }
  }
}
</script>
