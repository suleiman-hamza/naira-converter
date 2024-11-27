<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { reactive, ref, computed } from 'vue';

const country = reactive(['NGN', 'GBP', 'EUR', 'USD', 'IRD'])
const defaultCountry = ref('USD');
const selectedCountry = defaultCountry
const setCountry = (country: string) => {
    selectedCountry.value = country;
}

</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        {{ selectedCountry }}
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Convert to Currency</DialogTitle>
        <DialogDescription>
            Select Currency to compare to Nigerian Naira price
        </DialogDescription>
      </DialogHeader>
      <div>
        <button v-for="countryBtn in country" class="testbtn" @click="setCountry(countryBtn)">
            {{ countryBtn }}
        </button>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style lang="css" scoped>
.testbtn {
    display: block;
    color: black;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    background-color: bisque;
    margin-bottom: 0.35rem;
}
</style>