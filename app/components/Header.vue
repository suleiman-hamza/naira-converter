<template>
  <nav class="max-w-4xl mx-auto flex items-center justify-between mb-8 border-b border-gray-500 px-4 py-4">
    <div>
      <router-link class="font-bold text-2xl" to="">Naira-X</router-link>
    </div>
    <div class="flex gap-2">
      <Button variant="outline" size="icon" class="bg-stone-950 hover:bg-stone-900 hover:text-neutral-200 border-green-600">
        <CircleHelp class="w-4 h-4" />
      </Button>
      <CountriesModal />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import CountriesModal from "./Modal/CoutriesModal.vue";
import { Button } from '~/components/ui/button';
import { CircleHelp } from 'lucide-vue-next';
</script>

<style scoped>
</style>
