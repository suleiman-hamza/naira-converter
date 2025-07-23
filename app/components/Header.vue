<template>
  <nav class="border max-w-4xl mx-auto flex items-center justify-between px-4 py-4">
    <NuxtLink class="font-bold text-2xl" to="/">Naira-X</NuxtLink>
    <div class="flex items-center gap-2">
      <NuxtLink to="/about" class="bg-stone-950 hover:bg-stone-900 hover:text-neutral-200 border p-2 border-green-600">
        <CircleHelp class="w-4 h-4" />
      </NuxtLink>
      <CountriesModal />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import CountriesModal from "./CoutriesModal.vue";
// import { Button } from '~/components/ui/button';
import { CircleHelp } from 'lucide-vue-next';
</script>

<style scoped>
</style>
