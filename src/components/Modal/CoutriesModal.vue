<script lang="ts" setup>
import { computed, ref, reactive } from "vue";
import { onMounted } from "vue";
import { Button } from "@/components/ui/button";
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
  <Dialog v-model:open="store.isOpen">
    <DialogTrigger as-child>
      <Button variant="outline" @click="store.isOpen = true">
        {{ store.selectedCountry }}
      </Button>
    </DialogTrigger>
    <DialogContent
      class="sm:max-w-[500px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>Convert to Currency</DialogTitle>
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
      <div class="grid gap-4 py-2.5 px-6 overflow-y-auto">
        <div class="flex flex-col max-h-[80dvh]">
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
          <button v-for="country in store.filteredCountries" :key="country" class="flex items-center gap-2 mt-4" @click="handleClick(country.code)">
            <span>
                <img
                  :src="`https://flagcdn.com/w40/${getCountryCode(country.code).toLowerCase()}.png`"
                  alt="flag"
                  class="rounded-full w-8 h-8"
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
