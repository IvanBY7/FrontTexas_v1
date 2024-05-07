<template>
  <ul :class="{'menu-list':!isSubmenuList, 'ml-4': isSubmenuList}">
    <aside-menu-item
      v-for="(item,index) in menu"
      :key="index"
      :is-secondary="isSecondary"
      :item="item"
      @menu-click="menuClick"
    />
  </ul>
</template>

<script>

export default {
  name: 'AsideMenuList',
  props: {
    isSubmenuList: {
      type: Boolean,
      default: false
    },
    isSecondary: {
      type: Boolean,
      default: false
    },
    menu: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    menuClick (item) {
      this.$emit('menu-click', item)
    }
  }
}
</script>
