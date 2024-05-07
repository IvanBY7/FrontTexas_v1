module.exports = {
  data () {
    return {
      total: 0,
      list: [],
      checkedRows: [],
      defaultOpenedDetails: [],
      trashObject: null,
      isModalActive: false,
      isLoading: false,
      sortOrder: 'desc',
      defaultSortOrder: 'desc'
    }
  },
  // mounted () {
  //   this.getData()
  // },
  watch: {
    listQuery: {
      handler () {
        this.list = []
        this.getData()
        window.scrollTo(0, 0)
      },
      deep: true
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }
      return null
    }
  },
  methods: {
    async getData () {
      try {
        this.isLoading = true
        this.listQuery.offset = this.listQuery.limit * (this.listQuery.page - 1)
        const data = await this.$store.dispatch(
          'modules/' + this.action,
          this.listQuery
        )
        this.total = data.count
        this.list = data.results
      } catch (error) {
        this.$buefy.toast.open({
          message: 'Algo ha salido mal :(... Intenta de nuevo!',
          type: 'is-danger',
          queue: false
        })
      } finally {
        this.isLoading = false
      }
    },
    /*
     * Handle sort event
     */
    onSort (field, order) {
      let ordering = field
      this.sortField = field
      this.sortOrder = order
      if (order === 'desc') {
        ordering = '-' + field
      }
      this.listQuery.ordering = ordering
    },
    /*
     * Handle collapse event
     */
    onCollapse (row) {
      this.defaultOpenedDetails = [row[this.key]]
    },
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
}
