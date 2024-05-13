<template>
  <section class="section is-title-bar">
    <!-- Iterar sobre cada elemento del array titleStack -->
    <ul>
      <li v-for="(title, index) in titleStack" :key="index">
        <!-- Imprimir cada elemento del array -->
        {{ title }}
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TitleBar',
  props: {
    titleStack: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapState(['isDarkModeActive'])
  }
}
</script>
