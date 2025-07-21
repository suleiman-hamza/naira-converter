<script lang="ts" setup>
useHead({
  titleTemplate: (title) => {
    return title ? `${title} - Naira-X` : 'Naira-x | Currency Converter'
  },
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style scoped></style>
