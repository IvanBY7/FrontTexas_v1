<template>
  <b-modal
    :active.sync="isModalActive"
    :full-screen="isFullpage"
    has-modal-card
  >
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <b> {{ title }}</b>
        </p>
      </header>
      <section class="modal-card-body">
        <slot>
          <p>
            Se borrar permanentemente el registro <b>{{ trashObjectName }}</b>
          </p>
          <p>Esta acción es irreversible.</p>
        </slot>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="cancel">
          Cancelar
        </button>
        <button class="button is-danger" @click="confirm">
          Eliminar
        </button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'ModalBox',
  props: {
    title: {
      type: String,
      default: 'Confirmación de acción'
    },
    isFullpage: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: false
    },
    trashObjectName: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isModalActive: false
    }
  },
  watch: {
    isActive (newValue) {
      this.isModalActive = newValue
    },
    isModalActive (newValue) {
      if (!newValue) {
        this.cancel()
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>
