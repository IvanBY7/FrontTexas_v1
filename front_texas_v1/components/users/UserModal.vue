<template>
  <b-modal
    :active.sync="isModalActive"
    has-modal-card
    trap-focus
    :destroy-on-hide="false"
    @close="close"
  >
    <div class="modal-card" style="width: 100%">
      <header class="modal-card-head">
        <span class="modal-card-title">
          <p class="title is-5">
            {{ form.id ? 'Usuario ' + form.id : 'Nuevo Usuario' }}
          </p>
        </span>
        <button type="button" class="delete" @click="close" />
      </header>
      <section class="modal-card-body">
        <UserForm
          ref="UserForm"
          :form="form"
          @save="saveForm"
          @cancel="cancelForm"
        />
      </section>
      <footer class="modal-card-foot" />
    </div>
  </b-modal>
</template>

<script>
import UserForm from '~/components/users/UserForm.vue'
export default {
  name: 'UserModal',
  components: {
    UserForm
  },
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    activeUser: {
      type: Object
    }
  },
  data () {
    return {
      isLoading: false,
      isModalActive: false,
      form: {
        groups: []
      }
    }
  },
  watch: {
    isActive (newValue) {
      this.isModalActive = newValue
    },
    isModalActive (newVal) {
      if (newVal) {
        this.form = JSON.parse(JSON.stringify(this.activeUser))
      }
    }
  },
  methods: {
    close () {
      this.$refs.UserForm.$refs.form.reset()
      this.form = {
        groups: []
      }
      this.$emit('close')
    },
    async saveForm (form) {
      const user = JSON.parse(JSON.stringify(form))
      try {
        this.$store.commit('buttonLoadingToggle')
        await this.$store.dispatch(
          'modules/users/createOrUpdate',
          user
        )
        this.$emit('refresh')
        this.close()
        this.$buefy.snackbar.open({
          message: 'Usuario guardado',
          queue: false
        })
      } catch (error) {
        this.$buefy.snackbar.open({
          message:
            'No se puede guardar en este momento, por favor intente más tarde',
          type: 'is-danger',
          queue: false
        })
      } finally {
        this.$store.commit('buttonLoadingToggle')
      }
    },
    cancelForm () {
      this.close()
    }
  }
}
</script>
