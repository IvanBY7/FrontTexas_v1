<template>
  <div>
    <section class="container m-3">
      <card-component title="Cliente" icon="ballot">
        <h1 class="title is-4">
          Datos generales
        </h1>
        <ClientForm />
        <hr>
        <h1 class="title is-4">
          Dirección
        </h1>
        <ClientAddressForm />
      </card-component>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Cliente',
  meta: {
    titleStack: ['Cliente']
  },
  head () {
    return {
      title: 'Cliente — ParamQ'
    }
  }
}
</script>
