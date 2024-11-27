<template>
  <Header />
    <Converter />
  <h2 class="underline text-3xl">Exchange Rates</h2>
  <div v-if="loading" class="text-xl">Loading...</div>
  <div v-else-if="error" class="text-red-500">Error: {{ error }}</div>
  <div v-else>
    <ul class="mt-4">
      <li v-for="(currency, code) in rates" :key="code" class="mb-2">
        <div class="flex items-center gap-2">
          <figure>
            <img
              src="https://flagcdn.com/16x12/ua.png"
              alt="flag"
              class="rounded-full w-8 h-8"
            />
          </figure>
          <strong>{{ currency.name }}</strong>
        </div>
        <!--        <span>Rate - {{ currency.rate.toFixed(6) }}</span>-->
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Header from "@/components/Header.vue";
import Converter from "@/components/Converter.vue";
import axios from "axios";

  interface Currency {
  code: string;
  alphaCode: string;
  numericCode: number;
  name: string;
  rate: number;
  date: string;
  inverseRate: number;   
}

interface CurrencyData {
  [currencyCode: string]: Currency;
}

// Reactive states
const rates = ref<CurrencyData | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

// Fetch exchange rate data
const fetchData = async () => {
  try {
    const res = await axios.get("https://www.floatrates.com/daily/ngn.json");
    rates.value = res.data;
  } catch (e: any) {
    error.value = e.message || "An unknown error occurred.";
  } finally {
    loading.value = false;
  }
};

// Fetch data on component load
fetchData();
</script>
   
