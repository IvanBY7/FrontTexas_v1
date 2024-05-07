<template>
  <nuxt />
</template>

<script>
export default {
  name: 'FullPage',
  mounted () {
    this.$store.commit('fullPage', true)
    this.$store.commit('asideRightToggle', false)
    const elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = 'hidden'
  },
  beforeDestroy () {
    this.$store.commit('fullPage', false)
    const elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = null
  }
}
</script>
