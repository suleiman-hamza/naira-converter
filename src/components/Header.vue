<template>
  <nav class="container max-w-4xl flex items-center justify-between">
    <div>
      <router-link class="font-bold text-2xl" to="">Naira-X</router-link>
    </div>

    <div>
      <Button>Shadcn Button</Button>
      <CountriesModal />
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import CountriesModal from "../components/Modal/CoutriesModal.vue";
</script>
