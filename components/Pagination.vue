<template>
  <div class="columns m-1 is-mobile">
    <div class="column is-flex is-justify-content-flex-end">
      <b-pagination
        v-model="listQuery.page"
        :total="total"
        :simple="true"
        :rounded="false"
        order="is-centered"
        size="is-small"
        :per-page="listQuery.limit"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      />
    </div>
    <div class="column is-flex is-justify-content-flex-end">
      <b-dropdown
        v-model="listQuery.limit"
        append-to-body
        position="is-top-right"
        aria-role="list"
      >
        <button
          slot="trigger"
          slot-scope="{ active }"
          class="button is-secondary is-small"
        >
          <span>Por página: {{ listQuery.limit }}</span>
          <b-icon :icon="active ? 'menu-up' : 'menu-down'" />
        </button>
        <b-dropdown-item
          v-for="count in counters"
          :key="count"
          :value="count"
          aria-role="listitem"
          :class="listQuery.limit === count ? 'has-text-info' : ''"
        >
          <span>{{ count }}</span>
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="column is-1 is-hidden-desktop" />
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    listQuery: {
      type: Object
    },
    counters: {
      type: Array,
      default: () => [5, 10, 25, 50, 100]
    }
  }
}
</script>
