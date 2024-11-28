<template>
  <nav class="max-w-4xl mx-auto flex items-center justify-between mb-8">
    <div>
      <router-link class="font-bold text-2xl" to="">Naira-X</router-link>
    </div>
    <div>
      <CountriesModal />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import CountriesModal from "../components/Modal/CoutriesModal.vue";
</script>

<style scoped>
/* nav {
  border: 1px solid red; 
} */
</style>
