<template>
  <div>
    <aside-updates-item
      v-for="item in items"
      :key="item.id"
      :status="item.status"
      :icon="item.icon"
      :ago="item.ago"
    >
      <p>{{ item.text }}</p>
    </aside-updates-item>
  </div>
</template>

<script>

export default {
  name: 'AsideUpdates',
  data () {
    return {
      items: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {}
  }
}
</script>
