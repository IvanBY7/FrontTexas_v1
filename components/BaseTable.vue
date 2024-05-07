<template>
  <div>
    <!-- Main container -->
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="subtitle is-6">
            <strong>{{ total }}</strong> {{ $attrs['list-text'] || 'items' }}
          </p>
        </div>
        <div v-if="listQuery.is_active != null" class="level-item">
          <div class="buttons has-addons">
            <b-button
              size="is-small"
              class="button"
              icon-left="check"
              :class="{ 'is-success': listQuery.is_active === 1 }"
              :disabled="isLoading"
              @click="listQuery.is_active = 1"
            >
              {{ activeLabel }}
            </b-button>
            <slot name="extraTab" />
            <b-button
              size="is-small"
              class="button"
              icon-left="delete"
              :class="{ 'is-danger': listQuery.is_active === 0 }"
              :disabled="isLoading"
              @click="listQuery.is_active = 0"
            >
              {{ deleteLabel }}
            </b-button>
          </div>
        </div>
        <p class="level-item">
          <slot name="new-actions" />
        </p>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <b-input
                v-model="search"
                type="search"
                placeholder="Buscar..."
                size="is-small"
                @change.native="listQuery.search = search"
              />
            </p>
            <p class="control">
              <b-button
                type="is-primary"
                size="is-small"
                icon-left="magnify"
                :disabled="isLoading"
              />
            </p>
          </div>
        </div>
        <p v-if="actionsEnabled.includes('update')" class="level-item">
          <a
            class="has-text-primary"
            title="Actualizar"
            @click="$emit('update')"
          >
            <b-icon icon="autorenew" />
            <span class="is-hidden-desktop">
              Actualizar
            </span>
          </a>
        </p>
        <p v-if="actionsEnabled.includes('export')" class="level-item">
          <b-dropdown ref="export" append-to-body aria-role="menu" trap-focus>
            <template #trigger>
              <a
                class="has-text-primary"
                title="Descargar reporte"
                @click="$emit('export')"
              >
                <b-icon icon="download" />
                <span class="is-hidden-desktop">Descargar reporte</span>
              </a>
            </template>

            <slot name="export-actions" />
          </b-dropdown>
        </p>
        <p v-if="actionsEnabled.includes('filters')" class="level-item">
          <b-dropdown
            position="is-bottom-left"
            append-to-body
            aria-role="menu"
            trap-focus
          >
            <template #trigger>
              <a
                class="has-text-primary"
                title="Filtros"
                @click="$emit('filters')"
                ><b-icon icon="filter" />
                <span class="is-hidden-desktop">Filtros</span>
              </a>
            </template>

            <b-dropdown-item
              aria-role="menu-item"
              :focusable="false"
              custom
              paddingless
            >
              <div style="width:300px;">
                <section class="card-content">
                  <slot name="filter-form" />
                </section>
                <footer class="card-footer">
                  <a class="card-footer-item">
                    <b-button
                      icon-left="close"
                      label="Limpiar filtros"
                      size="is-small"
                      type="is-warning"
                      @click="$emit('clearFilters')"
                  /></a>
                </footer>
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </p>
        <p v-if="actionsEnabled.includes('cards')" class="level-item">
          <a
            v-if="viewMode === 'grid'"
            class="has-text-primary"
            title="Vista de tabla"
            @click="
              ;(viewMode = 'table'),
                onChecked([]),
                $emit('change-view', 'table')
            "
            ><b-icon icon="table-large" />
            <span class="is-hidden-desktop">Vista de tabla</span>
          </a>
          <a
            v-if="viewMode === 'table'"
            class="has-text-primary"
            title="Vista de tarjetas"
            @click="
              ;(viewMode = 'grid'), onChecked([]), $emit('change-view', 'grid')
            "
            ><b-icon icon="view-grid" />
            <span class="is-hidden-desktop">Vista de tarjetas</span>
          </a>
        </p>
        <p class="level-item">
          <slot name="extra-actions" />
        </p>
        <p class="level-item">
          <b-button
            v-if="$attrs['create-text']"
            tag="button"
            class="button"
            type="is-success"
            size="is-small"
            outlined
            @click="$emit('create')"
          >
            <b-icon icon="plus" size="is-small" /><span>{{
              $attrs['create-text']
            }}</span>
          </b-button>
        </p>
        <p class="level item" />
      </div>
    </nav>
    <nav v-if="slotPassed" class="level">
      <div class="level-left">
        <div class="level-item">
          <slot name="filters" />
        </div>
        <p class="level item" />
      </div>
      <div class="level-right">
        <slot name="actions" />
      </div>
    </nav>
    <slot name="toolbars" />
    <b-table
      v-if="viewMode === 'table'"
      narrowed
      sticky-header
      checkable
      striped
      show-detail-icon
      backend-filtering
      backend-sorting
      backend-pagination
      :loading="isLoading"
      :data="data"
      :checked-rows.sync="checkedRows"
      v-bind="$attrs"
      @check="onChecked"
      @details-open="onOpenDetails"
    >
      <slot />
      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Cargando registros...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>No se encontraron resultados&hellip;</p>
          </template>
        </div>
      </section>
      <template #detail="props">
        <slot name="detail" :row="props.row" />
      </template>
    </b-table>
    <template v-else>
      <b-loading v-model="isLoading" :can-cancel="false" />
      <slot name="cardView" />
    </template>
    <div class="columns mt-1 is-mobile">
      <Pagination :list-query="listQuery" :total="total" v-bind="$attrs" />
      <div class="column" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    listQuery: {
      type: Object,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    viewMode: {
      type: String,
      default: 'grid'
    },
    deleteLabel: {
      type: String,
      default: 'Archivados'
    },
    activeLabel: {
      type: String,
      default: 'Activos'
    },
    actionsEnabled: {
      type: Array,
      default: () => ['update', 'cards']
    },
    onOpenDetails: {
      type: Function,
      default: row => console.log(row)
    },
    checkedRows: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    slotPassed () {
      return !!this.$slots.filters || !!this.$slots.actions
    }
  },
  methods: {
    onChecked (rows) {
      this.$emit('checked', rows)
      this.checkedRows = rows
    }
  }
}
</script>
