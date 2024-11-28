import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const userateStore = defineStore('counter', () => {
  const count = ref(0)
  const countriesNam = ref<{ [key: string]: any }>({});
  const selectedCountry = ref("USD");
  const inverseRate = ref();
  const searchQuery = ref("");
const isOpen = ref(false);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://www.floatrates.com/daily/ngn.json");
      countriesNam.value = res.data;
      console.log(countriesNam.value);
    } catch (e) {
      console.error("Error Fetching Data:", e);
    }
  };

  const getcountryRate = (countryName: string) => {
    const lowerCaseCountryName = countryName.toLowerCase();
    console.log(lowerCaseCountryName)
    const countryData = countriesNam.value[lowerCaseCountryName];
    inverseRate.value = countryData.inverseRate
    console.log(inverseRate.value)
    // console.log(countriesNam.value)
  }

  const filteredCountries = computed(() => {
    if (!searchQuery.value) {
      // return Object.values(store.countriesNam.value);
    }
    return Object.values(countriesNam.value).filter((country: any) =>
      country.name?.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  });

  return { count, getcountryRate, fetchData, inverseRate, selectedCountry, countriesNam, searchQuery, isOpen, filteredCountries }
})
