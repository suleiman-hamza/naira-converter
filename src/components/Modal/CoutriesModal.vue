<script lang="ts" setup>
import { computed, ref, reactive } from "vue";
import axios from "axios";
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

const searchQuery = ref("");
const countriesNam = ref<{ [key: string]: any }>({});
const selectedCountry = ref("USD");
const isOpen = ref(false);
const inverseRate = ref();

const fetchData = async () => {
  try {
    const res = await axios.get("https://www.floatrates.com/daily/ngn.json");
    countriesNam.value = res.data;
    console.log(countriesNam.value);
  } catch (e) {
    console.error("Error Fetching Data:", e);
  }
};
fetchData();

const filteredCountries = computed(() => {
  if (!searchQuery.value) {
    return Object.values(countriesNam.value);
  }
  return Object.values(countriesNam.value).filter((country: any) =>
    country.name?.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const getCountryCode = (currencyCode: string) => {
  return currencyToCountryMap[currencyCode.toUpperCase()] || "";
};

const objshape = {
  aed: {
    aplhacode: 'AED',
    rate: 240
  }
}
const getcountryRate = (countryName: string) => {
  const lowerCaseCountryName = countryName.toLowerCase();
  console.log(lowerCaseCountryName)
  const countryData = countriesNam.value[lowerCaseCountryName];
  inverseRate.value = countryData.rate
  console.log(inverseRate.value)
  // console.log(countriesNam.value)
}


const handleClick = (countrycode: string) => {
  selectedCountry.value = countrycode;
  getcountryRate(selectedCountry.value)
  isOpen.value = false;
};

</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button variant="outline" @click="isOpen = true">
        {{ selectedCountry }}
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
            v-model="searchQuery"
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
          <button v-for="country in filteredCountries" :key="country" class="flex items-center gap-2 mt-4" @click="handleClick(country.code)">
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
