<template>
  <div class="columns">
    <div class="column buttons">
      <b-field v-if="saving" position="is-right">
        <b-button
          v-if="cancel"
          type="is-danger"
          native-type="submit"
          outlined
          @click="$emit('cancel')"
        >
          Cancelar
        </b-button>
        <b-button
          :type="saveType"
          native-type="submit"
          outlined
          :loading="buttonLoading"
          @click.prevent="handleSubmit(save)"
        >
          {{ saveLabel }}
        </b-button>
      </b-field>
      <b-field v-else position="is-right">
        <b-button
          :disabled="firstStep"
          type="is-dark"
          native-type="submit"
          outlined
          @click="previous"
        >
          Anterior
        </b-button>
        <b-button
          type="is-info"
          native-type="submit"
          outlined
          @click="handleSubmit(next)"
        >
          Siguiente
        </b-button>
      </b-field>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    handleSubmit: Function,
    saving: Boolean,
    firstStep: Boolean,
    saveLabel: {
      type: String,
      default: 'Guardar'
    },
    saveType: {
      type: String,
      default: 'is-success'
    },
    cancel: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState(['buttonLoading'])
  },
  methods: {
    save () {
      this.$emit('save')
    },
    previous () {
      this.$emit('previous')
    },
    next () {
      this.$emit('next')
    }
  }
}
</script>
