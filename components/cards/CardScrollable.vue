<template>
  <card-component
    :title="title"
    :icon="icon"
    :is-scrollable="true"
    :has-button-slot="true"
    :has-footer-slot="true"
  >
    <div slot="button" class="buttons">
      <b-button
        v-if="newLabel"
        outlined
        type="is-success"
        size="is-small"
        @click="$emit('new')"
      >
        <b-icon :icon="newIcon" custom-size="default" />
        <span>{{ newLabel }}</span>
      </b-button>
      <!-- <refresh-button class="is-hidden-mobile" label="Actualizar" @button-click="$emit('refresh')" /> -->
    </div>
    <card-toolbar
      v-if="hasToolbar"
      slot="toolbar"
      class="is-upper"
      :class="status.toolbarClass ? status.toolbarClass : null"
    >
      <div slot="left">
        <slot name="left" />
      </div>
      <span slot="right">
        <slot name="right" />
      </span>
    </card-toolbar>
    <div class="media-list">
      <slot v-if="!isLoading" />
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <b-loading
            v-model="isLoading"
            :is-full-page="false"
            :can-cancel="false"
          />
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Cargando registros...</p>
          </template>
          <template v-else-if="!data.length">
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>No se encontaron registros&hellip;</p>
          </template>
        </div>
      </section>
    </div>

    <a slot="footer" class="card-footer-item">
      <slot name="footer">
        <b-icon icon="autorenew" custom-size="default" />
        <span>Ver más</span>
      </slot>
    </a>
  </card-component>
</template>

<script>
export default {
  name: 'CardScrollable',
  props: {
    title: {
      type: String,
      default: null
    },
    newLabel: {
      type: String,
      default: null
    },
    newIcon: {
      type: String,
      default: 'plus'
    },
    icon: {
      type: String,
      default: null
    },
    data: {
      type: Array,
      default: () => []
    },
    hasToolbar: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      items: [],
      status: {}
    }
  },
  methods: {
    loadMore () {
      this.$emit('loadMore')
      this.$buefy.toast.open({
        message: 'Cargando datos...',
        type: 'is-info',
        queue: false
      })
    }
  }
}
</script>
