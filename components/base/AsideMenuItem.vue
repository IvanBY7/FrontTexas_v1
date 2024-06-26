<template>
  <li :class="{ 'is-active': isDropdownActive }">
    <component
      :is="componentIs"
      :to="itemTo"
      :href="itemHref"
      :title="componentTitle"
      :exact-active-class="componentActiveClass"
      :class="componentClass"
      @click="menuClick"
    >
      <b-icon
        v-if="item.icon"
        :icon="item.icon"
        :class="{
          'has-update-mark': item.updateMark
        }"
        custom-size="default"
        pack="uil"
      />
      <span v-if="item.label" :class="{ 'menu-item-label': !!item.icon }">{{
        item.label
      }}</span>
    </component>
    <aside-menu-list
      v-if="hasDropdown"
      :menu="item.menu"
      :is-submenu-list="true"
    />
  </li>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AsideMenuItem',
  props: {
    item: {
      type: Object,
      default: null
    },
    isSecondary: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isDropdownActive: false
    }
  },
  computed: {
    componentIs () {
      return this.item.to ? 'nuxt-link' : 'a'
    },
    hasSubmenuIcon () {
      return this.hasDropdown || this.item.menuSecondary
    },
    hasDropdown () {
      return !!this.item.menu
    },
    submenuIcon () {
      if (this.item.menuSecondary) {
        return 'chevron-right'
      }
      return this.isDropdownActive ? 'minus' : 'plus'
    },
    itemTo () {
      return this.item.to ? this.item.to : null
    },
    itemHref () {
      return this.item.href ? this.item.href : null
    },
    componentTitle () {
      return !this.isAsideExpanded && this.item.label ? this.item.label : null
    },
    componentClass () {
      const c = {
        'has-icon': !!this.item.icon,
        'has-submenu-icon': this.hasSubmenuIcon
      }

      if (this.item.state) {
        c['is-state-' + this.item.state] = true
        c['is-hoverable'] = true
      }

      if (
        this.asideActiveForcedKey &&
        this.item.menuSecondaryKey &&
        this.asideActiveForcedKey === this.item.menuSecondaryKey
      ) {
        c['is-active'] = true
      }

      return c
    },
    componentActiveClass () {
      if (this.asideActiveForcedKey) {
        return null
      }
      return 'is-active'
    },
    ...mapState(['asideActiveForcedKey', 'isAsideExpanded'])
  },
  watch: {
    isAsideExpanded (newValue) {
      if (!newValue) {
        this.isDropdownActive = false
      }
    }
  },
  methods: {
    menuClick () {
      this.$emit('menu-click', this.item)

      if (this.hasDropdown) {
        this.isDropdownActive = !this.isDropdownActive

        if (!this.isSecondary && !this.isAsideMobileExpanded) {
          this.$store.commit('asideStateToggle', true)
        }
      }
    }
  }
}
</script>
