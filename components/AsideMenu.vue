<template>
  <aside
    v-show="isAsideVisible"
    class="aside is-placed-left"
    :class="{'is-expanded':isAsideExpanded || isSecondary, 'is-secondary':isSecondary}"
  >
    <aside-tools :has-close="isSecondary" :icon="icon" @close="close">
      <span v-if="!isSecondary">
        <template v-if="isAsideExpanded || isAsideMobileExpanded">
          <b>Admin</b> Null Nuxt.js
        </template>
        <template v-else>
          <b>JB</b>
        </template>
      </span>
      <span v-else-if="label">{{ label }}</span>
    </aside-tools>
    <div ref="menuContainer" class="menu-container" @mouseenter="psUpdate">
      <div class="menu is-menu-main">
        <template v-for="(menuGroup, index) in menu">
          <p v-if="typeof menuGroup === 'string'" :key="index" class="menu-label">
            {{ menuGroup }}
          </p>
          <aside-menu-list
            v-else
            :key="index"
            :is-secondary="isSecondary"
            :menu="menuGroup"
            @menu-click="menuClick"
          />
        </template>
      </div>
    </div>
    <div class="menu is-menu-bottom">
      <aside-menu-list :menu="menuBottom" @menu-click="menuClick" />
    </div>
  </aside>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'
import { mapState } from 'vuex'
import AsideTools from '@/components/AsideTools'
import AsideMenuList from '@/components/AsideMenuList'

export default {
  name: 'AsideMenu',
  components: { AsideTools, AsideMenuList },
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    menuBottom: {
      type: Array,
      default: () => []
    },
    isSecondary: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapState([
      'isAsideVisible',
      'isAsideExpanded',
      'isAsideMobileExpanded'
    ])
  },
  mounted () {
    this.ps = new PerfectScrollbar(this.$refs.menuContainer)
  },
  methods: {
    menuClick (item) {
      this.$emit('menu-click', item)
    },
    psUpdate () {
      if (this.ps) {
        this.ps.update()
      }
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
