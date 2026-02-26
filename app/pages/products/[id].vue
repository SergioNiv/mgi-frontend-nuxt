<script setup lang="ts">
const route = useRoute()
// Single product detail logic, access id with route.params.id
</script>

<template>
  <div>
    <h1>Product {{ route.params.id }}</h1>
    <!-- Product detail view -->
  </div>
</template>
