<template>
  <div
    class="card"
    :class="{ 'has-card-header-background': hasCardHeaderBackground }"
  >
    <header v-if="title || hasTitleSlot" class="card-header">
      <p class="card-header-title">
        <b-icon v-if="icon" :icon="icon" :pack="pack" custom-size="default" />
        <slot v-if="hasTitleSlot" name="title" />
        <nuxt-link
          v-else-if="link && title"
          class="link"
          :to="'/policy/' + link"
        >
          <span>{{ title }}</span>
        </nuxt-link>
        <span v-else-if="title">{{ title }}</span>
      </p>
      <slot v-if="hasButtonSlot" name="button" />
      <a
        v-else-if="headerIcon"
        href="#"
        class="card-header-icon"
        aria-label="more options"
        @click.prevent="headerIconClick"
      >
        <b-icon :icon="headerIcon" custom-size="default" />
      </a>
    </header>
    <slot name="toolbar" />
    <div ref="cardContent" class="card-content">
      <slot />
    </div>
    <footer v-if="hasFooterSlot" class="card-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'
export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    pack: {
      type: String,
      default: null
    },
    headerIcon: {
      type: String,
      default: null
    },
    hasTitleSlot: {
      type: Boolean,
      default: false
    },
    hasButtonSlot: {
      type: Boolean,
      default: false
    },
    hasFooterSlot: {
      type: Boolean,
      default: false
    },
    hasCardHeaderBackground: {
      type: Boolean,
      default: false
    },
    isScrollable: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.isScrollable) {
      this.ps = new PerfectScrollbar(this.$refs.cardContent)
      this.$emit('ps-ready', this.ps)
    }
  },
  methods: {
    headerIconClick () {
      this.$emit('header-icon-click')
    }
  }
}
</script>

<style scoped>
.link {
  color: gray;
}
.link:hover {
  color: #ffc845;
}
</style>
