<template>
  <article class="card media box">
    <figure class="media-left image is-32x32">
      <img
        :src=" item.first_name && item.last_name ?
          `https:\/\/avatars.dicebear.com\/v2\/initials\/${item.first_name}-${item.last_name}.svg` :
          `https:\/\/avatars.dicebear.com\/v2\/initials\/${item.username}.svg`
        "
        class="is-rounded"
      >
    </figure>
    <div class="media-content">
      <div class="content has-text-left">
        <a class="title is-7">
          {{ item.first_name }}
          {{ item.last_name }}
        </a>
        <small class="has-text-weight-light">({{ item.username }})</small>
        <small v-if="item.groups[0] === 1" class="has-text-weight-light"><b-tag type="is-dark">Agente</b-tag></small>
        <small v-else-if="item.groups[0] === 2" class="has-text-weight-light"><b-tag type="is-primary">Administrador</b-tag></small>
        <br>
        <small class="has-text-weight-light has-text-info">{{
          item.email
        }}</small>
        <br>
        <small class="has-text-weight-light">Registrado el: {{ item.date_joined | shortDate }}</small>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <!-- <a class="level-item" title="Ver ubicación">
            <b-icon icon="map-marker" type="is-info" />
          </a> -->
          <a
            v-if="item.email"
            :title="'Correo a ' + item.email"
            class="level-item"
            @click="openPopupWindow('mailto:' + item.email)"
          >
            <b-icon icon="email" type="is-info" />
          </a>
          <a title="Editar" class="level-item" @click="$emit('edit', item)">
            <b-icon icon="pencil" type="is-primary" />
          </a>
        </div>
      </nav>
    </div>
    <div class="media-right">
      <UserActions
        :item="item"
        :can-edit="false"
        :active="active"
        class="media-right"
        @delete="$emit('delete', item.id)"
      />
    </div>
  </article>
</template>

<style scoped>
.media {
  margin-bottom: 0%;
}
</style>

<script>
import UserActions from '~/components/users/UserActions.vue'
export default {
  components: {
    UserActions
  },
  props: {
    item: Object,
    active: Boolean
  },
  methods: {
    openPopupWindow (url) {
      window.open(url, 'popup', 'width=800,height=600')
      return false
    }
  }
}
</script>
