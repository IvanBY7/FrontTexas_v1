<template>
  <div>
    <vue-fab
      main-btn-color="#61646D"
      size="big"
      icon="add"
      :scroll-auto-hide="false"
      :global-options="{ spacing: 50, delay: 0.1 }"
      fab-item-animate="alive"
    >
      <fab-item
        :idx="0"
        title-color="#FFF"
        title-bg-color="#61646D"
        icon="email"
        title="Nuevo envío"
        color="#AFABA7"
        @clickItem="openModal('/messages/', 'modules/messages/toogleNew')"
      />
      <fab-item
        :idx="1"
        title-color="#FFF"
        title-bg-color="#61646D"
        icon="inventory_2"
        title="Nuevo producto"
        color="#DA5D46"
        @clickItem="openModal('/products/', 'modules/products/toogleModal')"
      />
      <fab-item
        :idx="2"
        title-color="#FFF"
        title-bg-color="#61646D"
        icon="apartment"
        title="Nueva aseguradora"
        color="#DA8328"
        @clickItem="openModal('/insurances/', 'modules/insurance/toogleModal')"
      />
      <fab-item
        :idx="3"
        title-color="#FFF"
        title-bg-color="#61646D"
        icon="assignment_ind"
        title="Nuevo vendedor"
        color="#7FA631"
        @clickItem="openModal('/employees/', 'modules/employees/toogleModal')"
      />
      <fab-item
        :idx="4"
        title-color="#FFF"
        title-bg-color="#61646D"
        icon="person"
        title="Nuevo cliente"
        color="#318DA6"
        @clickItem="openModal('/clients/', 'modules/clients/toogleModal')"
      />
      <fab-item
        :idx="5"
        title-color="#FFF"
        title-bg-color="#61646D"
        icon="add_moderator"
        title="Nueva póliza"
        color="#E6B51E"
        @clickItem="$router.push('/policy/edit/')"
      />
    </vue-fab>
  </div>
</template>

<script>
export default {
  methods: {
    openPopupWindow (url) {
      window.open(url, 'popup', 'width=800,height=600')
      return false
    },
    openModal (route, action) {
      if (this.$nuxt.$route.path !== route) {
        this.$router.push(route)
        setTimeout(() => {
          this.$store.commit(action, true)
        }, 300)
      } else {
        this.$store.commit(action, true)
      }
    }
  }
}
</script>
