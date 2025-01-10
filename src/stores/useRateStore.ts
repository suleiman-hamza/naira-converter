import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const userateStore = defineStore('counter', () => {
  const countryCurrencyList = ref<{ [key: string]: any }>({});
  const selectedCountry = ref();
  const inverseRate = ref();
  const searchQuery = ref("");
  
  const isOpen = ref(false);
  const loadSkeleton = ref(false)

  const fetchData = async () => {
    try {
      loadSkeleton.value = true;
      const res = await axios.get("https://www.floatrates.com/daily/ngn.json");
      countryCurrencyList.value = res.data;
      console.log(countryCurrencyList.value);
      inverseRate.value = parseFloat(Number(countryCurrencyList.value.usd.inverseRate).toFixed(2))
      console.log(inverseRate.value)
      selectedCountry.value = countryCurrencyList.value.usd.code
    } catch (e) {
      // loading.value = false;
      console.error("Error Fetching Data:", e);
    } finally {
      loadSkeleton.value = false;
    }
  };


  const getcountryRate = (countryName: string) => {
    const lowerCaseCountryName = countryName.toLowerCase();
    console.log(lowerCaseCountryName)
    const countryData = countryCurrencyList.value[lowerCaseCountryName];
    inverseRate.value = countryData.inverseRate
    // console.log(countryCurrencyList.value)
  }

  const filteredCountries = computed(() => {
    if (!searchQuery.value) {
      // return Object.values(store.countryCurrencyList.value);
    }
    return Object.values(countryCurrencyList.value).filter((country: any) =>
      country.name?.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );
  });

  return { 
    getcountryRate, 
    fetchData,
    loadSkeleton,
    inverseRate, 
    selectedCountry, 
    countryCurrencyList, 
    searchQuery, 
    isOpen, 
    filteredCountries
  }
})
