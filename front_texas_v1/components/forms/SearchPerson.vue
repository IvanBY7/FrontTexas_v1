<template>
  <b-field v-bind="$attrs">
    <b-autocomplete
      :data="list"
      open-on-focus
      placeholder="ej. Juan Perez"
      :value="
        selected.person && selected.person.first_name
          ? selected.person.first_name + ' ' + selected.person.last_name
          : ''
      "
      @select="handleSelected"
    >
      <template slot-scope="props">
        <div class="media">
          <div class="media-left">
            <figure class="image is-32x32">
              <img
                v-if="props.option.person && props.option.person.first_name"
                class="is-rounded"
                width="32"
                :src="
                  `https://avatars.dicebear.com/api/initials/${props.option.person.first_name}.svg?b=%23ffc845`
                "
              >
            </figure>
          </div>
          <div v-if="props.option.person && props.option.person.first_name" class="media-content">
            <b>{{ props.option.person.first_name }}
              {{ props.option.person.last_name }}</b>
            <br>
            <small>
              {{ props.option.email || props.option.number }}
            </small>
          </div>
        </div>
      </template>
    </b-autocomplete>

    <div class="control">
      <b-button
        v-if="selected.person && selected.person.first_name"
        type="is-primary"
        icon-left="account-edit"
        @click="$emit('edit', selected)"
      />
      <a
        v-if="!$store.state.user.is_staff"
        slot="right"
        class="button is-info is-outlined"
        @click="$emit('create')"
      >
        <b-icon icon="account-plus" size="is-small" />
      </a>
    </div>
  </b-field>
</template>

<script>
export default {
  props: {
    action: { type: String, default: 'modules/clients/getClientList' },
    current: { type: Object }
  },
  data () {
    return {
      id: null,
      isLoading: false,
      isModalEdit: false,
      form: {},
      createdReadable: null,
      isEdit: false,
      list: [],
      selected: {
        person: {}
      },
      isModalActive: false,
      trashObject: null,
      trashObjectName: '',
      activeClient: {
        person: {},
        family: [{}]
      }
    }
  },
  watch: {
    current (val) {
      if (val) {
        this.selected = val
        this.activeClient = JSON.parse(JSON.stringify(val))
        this.list.push(val)
      }
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.selected = this.current
    this.activeClient = JSON.parse(JSON.stringify(this.current))
  },
  methods: {
    async getData () {
      const listQuery = {
        limit: 50,
        offset: 0
      }
      const list = await this.$store.dispatch(this.action, listQuery)
      this.list = list.results
    },
    handleSelected (option) {
      if (option && this.selected !== option) {
        console.log(option)
        this.$emit('selected', option)
      }
      this.selected = option || {}
    }
  }
}
</script>
