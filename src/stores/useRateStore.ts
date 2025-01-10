import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

export const userateStore = defineStore('counter', () => {
  const countryCurrencyList = ref<{ [key: string]: any }>({});
  const selectedCountry = ref();
  const inverseRate = ref();
  const rate = ref();
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
      rate.value = countryCurrencyList.value.usd.rate
      console.log(rate.value)
      selectedCountry.value = countryCurrencyList.value.usd.code
    } catch (e) {
      // loading.value = false;
      console.error("Error Fetching Data:", e);
    } finally {
      loadSkeleton.value = false;
    }
  };

  // round very small value to two significant figure
  // function roundToSignificantFigures(num, sigFigs) {
  //   if (num === 0) return 0;
  
  //   const numString = num.toExponential();
  //   const [mantissa, exponent] = numString.split('e');
  
  //   const roundedMantissa = Number(mantissa).toFixed(sigFigs - 1);
  
  //   return Number(`${roundedMantissa}e${exponent}`);
  // }
  
  // const value = 0.00065155917700078;
  // const roundedValue = roundToSignificantFigures(value, 2);
  
  // console.log("Original value:", value);
  // console.log("Rounded value:", roundedValue); // Output: 0.00065


  const getcountryRate = (countryName: string) => {
    const lowerCaseCountryName = countryName.toLowerCase();
    console.log(lowerCaseCountryName)
    const countryData = countryCurrencyList.value[lowerCaseCountryName];
    // countryData is selected country data, includes its code, alphacode, num-code, name, rate, inverserate and date
    // console.log(countryData);
    inverseRate.value = countryData.inverseRate; // sets the inverse-rate of converter to the currently selected country
    rate.value = countryData.rate; // sets the rate of converter to the currently selected country
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
    selectedCountry, 
    countryCurrencyList, 
    searchQuery, 
    isOpen, 
    filteredCountries
  }
})
