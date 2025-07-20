<template>
  <Header />
  <Converter />
  <HistoricalCurrencyChart />
  <Footer />
</template>

<script lang="ts" setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer/Footer.vue"
import Converter from "@/components/Converter.vue";
import HistoricalCurrencyChart from "@/components/Chart/HistoricalCurrencyChart.vue";
</script>
