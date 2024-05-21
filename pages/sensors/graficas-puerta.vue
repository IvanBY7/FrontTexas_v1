<template>
  <div class="container m-3">
    <div class="columns mt-1">
      <div class="column left has-text-centered is-hidden-mobile">
        <FullCalendar :events="calendarEvents" :options="calendarConfig" />
      </div>
      <div class="column right has-text-centered is-hidden-mobile">
        <div class="sensor-status">
          <h2>Estado del Sensor: {{ sensorStatus }}</h2>
        </div>
        <h1>Tabla de datos</h1>
        <table class="table is-striped is-bordered is-fullwidth">
          <thead>
            <tr>
              <th>IdRegistro</th>
              <th>Fecha de Creación</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in registros" :key="index">
              <td>{{ row.IdRegistro }}</td>
              <td>{{ new Date(row.created_at).toLocaleString() }}</td>
              <td>{{ row.Valor }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar
  },
  data () {
    return {
      registros: [
        {
          IdRegistro: 272,
          created_at: '2024-05-10T11:47:54.730217-05:00',
          updated_at: '2024-05-10T11:47:54.730217-05:00',
          is_active: true,
          Valor: '1.0',
          fk_IdSensor: 6
        },
        {
          IdRegistro: 275,
          created_at: '2024-05-10T11:47:57.852416-05:00',
          updated_at: '2024-05-10T11:47:57.852416-05:00',
          is_active: true,
          Valor: '1.0',
          fk_IdSensor: 6
        },
        {
          IdRegistro: 278,
          created_at: '2024-05-10T11:48:01.107953-05:00',
          updated_at: '2024-05-10T11:48:01.107953-05:00',
          is_active: true,
          Valor: '1.0',
          fk_IdSensor: 6
        },
        {
          IdRegistro: 281,
          created_at: '2024-05-10T11:48:07.104984-05:00',
          updated_at: '2024-05-10T11:48:07.104984-05:00',
          is_active: true,
          Valor: '1.0',
          fk_IdSensor: 6
        },
        {
          IdRegistro: 284,
          created_at: '2024-05-19T15:48:07.441549-05:00',
          updated_at: '2024-05-19T16:48:07.441549-05:00',
          is_active: true,
          Valor: '0.0',
          fk_IdSensor: 6
        },
        {
          IdRegistro: 287,
          created_at: '2024-05-19T16:48:10.690451-05:00',
          updated_at: '2024-05-19T04:48:10.690451-05:00',
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
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}
.columns {
  display: flex;
  justify-content: space-between;
}
.column {
  width: 48%;
}
.sensor-status {
  margin-bottom: 20px;
}
.fc-event.event-abierto {
  background-color: #E6B282 !important;
  border: 1px solid #E6B282 !important;
}
.fc-event.event-cerrado {
  background-color: #C3D692 !important;
  border: 1px solid #C3D692 !important;
}
</style>
