<template>
  <section class="section is-title-bar">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <ul>
            <li>
              <img
                v-if="!isDarkModeActive"
                style="width: 40px;"
                src="@/assets/logo.png"
                alt="ParamQ logo"
              />
              <img
                v-else
                style="width: 40px;"
                src="@/assets/logo.png"
                alt="ParamQ logo"
              />
            </li>
            <li v-for="(title, index) in titleStack" :key="index">
              {{ title }}
            </li>
          </ul>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <div class="buttons is-right">
            <slot name="right">
              <nuxt-link to="/" class="button is-light">
                <b-icon icon="home" custom-size="default" />
                <span>Dashboard</span>
              </nuxt-link>
            </slot>
          </div>
        </div>
      </div>
    </div>
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
