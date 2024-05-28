<template>
  <div>
    <b-dropdown
      v-if="!tableMode"
      aria-role="list"
      position="is-bottom-left"
      append-to-body
    >
      <template #trigger>
        <span class="but clickable" size="is-small" @click="$emit('toggle')">
          <b-icon icon="dots-vertical" />
        </span>
      </template>
      <template >
        <div v-if="canEdit" class="has-text-dark" @click="$emit('edit', item)">
          <b-dropdown-item aria-role="listitem">
            <b-icon pack="uil" icon="pen" />
            Editar usuario
          </b-dropdown-item>
        </div>
        <!-- <div @click="$emit('delete', item.id)">
          <b-dropdown-item aria-role="listitem" class="has-text-danger">
            <b-icon pack="uil" icon="trash-alt" />
            Archivar usuario
          </b-dropdown-item>
        </div> -->
      </template>
      <!-- <template v-else>
        <div @click="$emit('reactivate', item.id)">
          <b-dropdown-item aria-role="listitem" class="has-text-success">
            <b-icon pack="uil" icon="check" />
            Reactivar usuario
          </b-dropdown-item>
        </div>
        <div @click="$emit('supr', item.id)">
          <b-dropdown-item aria-role="listitem" class="has-text-danger">
            <b-icon pack="uil" icon="multiply" />
            Eliminar usuario
          </b-dropdown-item>
        </div>
      </template> -->
    </b-dropdown>
    <div v-else>
      <template>
        <span
          title="Editar usuario"
          class="but clickable"
          size="is-small"
          @click="$emit('edit', item)"
        >
          <b-icon pack="uil" icon="pen" />
        </span>
        <!-- <span
          title="Archivar usuario"
          class="but clickable has-text-danger"
          size="is-small"
          @click="$emit('delete', item.id)"
        >
          <b-icon pack="uil" icon="trash-alt" />
        </span> -->
      </template>
      <!-- <template v-else>
        <span
          title="Reactivar usuario"
          class="but clickable has-text-success"
          size="is-small"
          @click="$emit('reactivate', item.id)"
        >
          <b-icon pack="uil" icon="check" />
        </span>
        <span
          title="Eliminar usuario"
          class="but clickable has-text-danger"
          size="is-small"
          @click="$emit('supr', item.id)"
        >
          <b-icon pack="uil" icon="multiply" />
        </span>
      </template> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    canEdit: {
      type: Boolean,
      default: true
    },
    tableMode: {
      type: Boolean,
      default: false
    },
    active: Boolean
  }
}
</script>

<style scoped>
.but:hover {
  cursor: pointer;
}
</style>
