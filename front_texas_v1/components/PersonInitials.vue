<template>
  <figure v-if="person" class="image is-32x32">
    <img
      :src="
        `https:\/\/avatars.dicebear.com\/v2\/initials\/${person.first_name}-${person.last_name}.svg`
      "
      class="is-rounded"
    >
  </figure>
</template>

<script>
export default {
  props: {
    person: Object
  }
}
</script>
