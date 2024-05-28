<template>
  <div
    class="is-card-toolbar"
    :class="{ notification: !isDarkModeActive, 'm-4': isDarkModeActive }"
  >
    <div class="level" :class="{ 'is-mobile': isMobile }">
      <div class="level-left">
        <div class="level-item">
          <slot name="left" />
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <slot name="right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'CardToolbar',
  props: {
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['isDarkModeActive'])
  }
}
</script>
