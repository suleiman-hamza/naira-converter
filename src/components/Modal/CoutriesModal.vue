<script lang="ts" setup>
import { computed, ref, reactive } from "vue";
import { onMounted } from "vue";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { currencyToCountryMap } from "@/data";
import { userateStore } from "@/stores/useRateStore";
const store = userateStore();

onMounted(()=> {
  store.fetchData();

})

const getCountryCode = (currencyCode: string) => {
  return currencyToCountryMap[currencyCode.toUpperCase()] || "";
};

const handleClick = (countrycode: string) => {
  store.selectedCountry = countrycode;
  store.getcountryRate(store.selectedCountry)
  store.isOpen = false;
};

</script>

<template>
  <Dialog v-model:open="store.isOpen" >
    <DialogTrigger as-child>
      <Skeleton class="h-8 w-20 rounded-xl" v-if="store.loadSkeleton" />
      <Button variant="outline" v-else-if="store.loadSkeleton === false" @click="store.isOpen = true" class="bg-stone-950 hover:bg-stone-900 hover:text-neutral-200 border-green-600">
        {{ store.selectedCountry }}
      </Button>
    </DialogTrigger>
    <DialogContent
      class="sm:max-w-[500px] grid-rows-[auto_minmax(0,1fr)_auto] p-4 max-h-[100dvh] bg-stone-950"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle class="text-gray">Convert to Currency</DialogTitle>
        <DialogDescription>
          Select currency to compare to Nigeria price.
        </DialogDescription>
        <div class="my-2">
          <Input
            v-model="store.searchQuery"
            class="max-w-4xl"
            placeholder="Search for Currency..."
            type="text"
          />
        </div>
      </DialogHeader>
      <div class="grid gap-4 overflow-y-auto border mx-1.5 rounded-xl">
        <div class="flex flex-col max-h-[80dvh] divide-y divide-slate-700 rounded-xl">
          <!-- <ul>
            <li
              v-for="country in filteredCountries"
              :key="country"
              class="flex items-center gap-2 mt-4 cursor-pointer"
              @click="handleClick(country.name)"
            >
              <span>
                <img
                  :src="`https://flagcdn.com/w40/${getCountryCode(country.code).toLowerCase()}.png`"
                  alt="flag"
                  class="rounded-full w-8 h-8"
                />
              </span>
              {{ country.code }}
            </li>
          </ul> -->
          <button v-for="country in store.filteredCountries" :key="country" class="flex items-center px-2 py-2 gap-2 hover:bg-gray-900" @click="handleClick(country.code)">
            <span>
                <img
                  :src="`https://flagcdn.com/w40/${getCountryCode(country.code).toLowerCase()}.png`"
                  alt="flag"
                  class="rounded-full w-6 h-6"
                />
            </span>
            {{ country.code }}
        </button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped></style>
