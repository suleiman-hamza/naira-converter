import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const userateStore = defineStore('counter', () => {
  
  const countryCurrencyList = ref<{ [key: string]: any }>({});
  const selectedCountry = ref();
  const inverseRate = ref();
  const rate = ref(0);
  const searchQuery = ref("");
  
  const isOpen = ref(false);
  const loadSkeleton = ref(false)

  const fetchData = async () => {
    try {
      loadSkeleton.value = true;
      const res = await axios.get("https://www.floatrates.com/daily/ngn.json");
      countryCurrencyList.value = res.data;
      console.log(countryCurrencyList.value); //curency data json

      inverseRate.value = countryCurrencyList.value.usd.inverseRate;
      console.log(inverseRate.value) //inverse rate

      rate.value = countryCurrencyList.value.usd.rate
      console.log(rate.value) // rate

      selectedCountry.value = countryCurrencyList.value.usd.code
      console.log(roundedRate.value) // rounded rate
    } catch (e) {
      // loading.value = false;
      console.error("Error Fetching Data:", e);
    } finally {
      loadSkeleton.value = false;
    }
  };

  // round very small value to two significant figure
  // function toSignificantFigures(num: number, sigFigs: number): number {
  //   if (num === 0) return 0;
  //   const multiplier = Math.pow(10, sigFigs - Math.floor(Math.log10(Math.abs(num))) - 1);
  //   return Math.round(num * multiplier) / multiplier;
  // }
  const roundedRate = computed(() => {
    const multiplier = Math.pow(10, 2 - Math.floor(Math.log10(Math.abs(rate.value))) - 1);
    return Math.round(rate.value * multiplier) / multiplier;
  })

  const getcountryRate = (countryName: string) => {
    const lowerCaseCountryName = countryName.toLowerCase();
    console.log(lowerCaseCountryName)
    const countryData = countryCurrencyList.value[lowerCaseCountryName];
    // countryData is selected country data, includes its code, alphacode, num-code, name, rate, inverserate and date
    // console.log(countryData);
    inverseRate.value = countryData.inverseRate; // sets the inverse-rate of converter to the currently selected country
    rate.value = countryData.rate; // sets the rate of converter to the currently selected country
    console.log(rate.value)
    console.log(roundedRate.value)
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
    rate, 
    roundedRate,
    selectedCountry, 
    countryCurrencyList, 
    searchQuery, 
    isOpen, 
    filteredCountries
  }
})
