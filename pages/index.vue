<template>
  <div>
  </div>
</template>

<style>
.name:hover {
  cursor: pointer;
}
tr.is-success {
  background: #28a745;
}
tr.is-info {
  background: #000408;
}
tr.is-danger {
  background: #f02516;
}
tr.is-warning {
  background: #fca503;
}
</style>

<script>
import tableMixin from '@/mixins/table'

export default {
  name: 'Home',
  mixins: [tableMixin],
  fetch () {
    this.$store.commit('setTitleStack', ['Inicio'])
  },
  data () {
    return {
      action: '',
      status: {
        Familiar: 'is-info',
        Basic: 'is-danger',
        Premium: 'is-warning'
      },
      listQuery: {
        page: 1,
        limit: 10,
        offset: 0
      },
      activePolicy: {
        product: {},
        insurance: {},
        client: {
          person: {}
        },
        employee: {
          person: {}
        },
        properties: [{}]
      },
      selectedPolicies: [],
      checkPayments: [],
      valuePayments: [],
      paymentIndex: 0,
      payLoading: false,
      failedPayments: 0
    }
  },
  computed: {
    getList () {
      const l = this.list.filter(
        el =>
          this.firstPaymentValidation(el) !== el &&
          this.firstPaymentValidation(el) === el.payments[0]
      )
      return l
    },
    titleStack () {
      return ['Admin', 'Dashboard']
    }
  },
  async created () {
  },
  methods: {
    getDataRefresh (refresh) {
      this.checkRows = []
      this.paymentIndex = 0
      this.valuePayments = []
      this.selectedPolicies = []
      if (!refresh) {
        this.getData()
      }
    },
    firstPaymentValidation (item) {
      const payments = item.payments.filter(
        el =>
          ['danger', 'warning', 'orange'].includes(el.status) &&
          !el.payed &&
          !el.cancelled
      )
      if (payments.length) {
        return payments[0]
      } else {
        return item
      }
    },
    CheckRows (rows) {
      this.selectedPolicies = rows
    },
    checkPayment (row) {
      if (row.value) {
        this.checkPayments[this.paymentIndex] = row
        this.paymentIndex++
      } else {
        this.paymentIndex--
        this.checkPayments[this.paymentIndex] = null
      }
      console.log(this.checkPayments)
    },
    payPolicies () {
      const payments = []
      for (const i in this.selectedPolicies) {
        payments[i] = this.selectedPolicies[i].payments[0]
      }
      this.payPayments(payments)
      console.log(payments)
    },
    payPayments (items) {
      let payments = []
      let n = 0
      if (items) {
        payments = items
        n = payments.length
      } else {
        payments = this.checkPayments.filter(
          el => !null && !el.payed && !el.cancelled
        )
        n = this.paymentIndex
      }
      for (const index in payments) {
        payments[index] = payments[index].id
      }
      this.$buefy.dialog.confirm({
        title: 'Marcar como pagados',
        message:
          'Estás a punto de marcar como pagados ' +
          n +
          ' recibos ¿Deseas continuar?',
        cancelText: 'Cancelar',
        confirmText: 'Marcar como pagados',
        type: 'is-success',
        hasIcon: true,
        onConfirm: async () => {
          if (payments.length > 0) {
            try {
              await this.$store.dispatch(
                'modules/pagos/markAsPayedPayments',
                payments
              )
              this.getDataRefresh()
              this.$buefy.snackbar.open({
                message: 'Recibos actualizados',
                queue: false
              })
            } catch (error) {
              this.$buefy.snackbar.open({
                message:
                  'No se puede Guardar en este momento, por favor intente más tarde',
                type: 'is-danger',
                queue: false
              })
            }
          } else {
            this.getDataRefresh()
          }
        }
      })
    },
    actionSample () {
      this.$buefy.toast.open({
        message: 'Espere un momento...',
        type: 'is-info',
        queue: false
      })
    },
    newOrEditPolicy (item) {
      if (item) {
        this.$router.push('/policy/edit/' + item.id + '/')
      } else {
        this.$router.push('/policy/edit/')
      }
    }
  },
  head () {
    return {
      title: 'Panel de control — ParamQ'
    }
  }
}
</script>

<style scoped>
.has-text-orange {
  color: orange;
}
</style>
