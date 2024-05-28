<template>
  <div class="container">
    <div class="column has-text-centered">
      <b-table
        :loading="isLoading"
        :hoverable="true"
        default-sort="created_at"
        default-sort-direction="desc"
        :data="recursos"
      >
        <b-table-column v-slot="props" label="Elemento" field="Archivo" sortable header-class="has-text-centered">
          <td>
            {{ props.row.Archivo }}
          </td>
        </b-table-column>
        <b-table-column v-slot="props" label="Version" field="Version" sortable header-class="has-text-centered">
          <td>
            {{ props.row.Version }}
          </td>
        </b-table-column>
        <b-table-column label="Descargar" field="Descargar" sortable header-class="has-text-centered">
          <b-button size="sm" icon-left="download" class="is-success" @click="info(row.item, row.index, $event.target)">
            Descargar Aquí
          </b-button>
        </b-table-column>

        <section slot="empty" class="section">
          <div class="content has-text-grey has-text-centered">
            <template v-if="isLoading">
              <p>
                <b-icon icon="dots-horizontal" size="is-large" />
              </p>
              <p>Fetching data...</p>
            </template>
            <template v-else>
              <p>
                <b-icon icon="emoticon-sad" size="is-large" />
              </p>
              <p>Nothing's here&hellip;</p>
            </template>
          </div>
        </section>
      </b-table>
    </div>
  </div>
</template>

<script>
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  fetch () {
    this.$store.commit('setTitleStack', ['Configuración de Empleados'])
  },
  data () {
    return {
      isLoading: false,
      perPage: 6,
      paginated: true,
      recursos: [
        {
          IdRegistro: 272,
          Archivo: 'AgenteMonitor',
          Version: '1.0.0',
          is_active: true,
          Valor: '1.0',
          fk_IdSensor: 6
        }
      ],
      calendarConfig: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        events: this.getCalendarEvents
      }
    }
  },
  computed: {
    sensorStatus () {
      const lastRegistro = this.registros[this.registros.length - 1]
      return lastRegistro.Valor === '1.0' ? 'Abierto' : 'Cerrado'
    }
  },
  methods: {
    getCalendarEvents (fetchInfo, successCallback, failureCallback) {
      const events = this.registros.map(registro => ({
        title: registro.Valor === '1.0' ? 'Abierto' : 'Cerrado',
        start: registro.created_at,
        end: registro.updated_at,
        classNames: registro.Valor === '1.0' ? 'event-abierto' : 'event-cerrado'
      }))
      successCallback(events)
    }
  },
  head () {
    return {
      title: 'Empleados - Sistema de Monitoreo'
    }
  }
}
</script>

    <style scoped>
    .container {
      width: 100%;
      display: flex;
    }
    .columns {
      display: flex;
      justify-content: space-between;
    }
    .column {
      width: 48%;
    }
    .has-text-centered {
    text-align: center;
  }
    </style>
