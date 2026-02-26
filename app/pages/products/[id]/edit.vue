<script setup lang="ts">
const route = useRoute()
// Edit product logic, access id with route.params.id
</script>

<template>
  <div>
    <h1>Edit Product {{ route.params.id }}</h1>
    <!-- Form to edit product -->
  </div>
</template>
