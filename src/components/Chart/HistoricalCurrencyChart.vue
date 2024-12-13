<script setup lang="ts">
import { ref } from 'vue';
import Button from '../ui/button/Button.vue';
import { AreaChart } from '@/components/ui/chart-area';

interface Props {
	history: HistoricalCurrency30Days
	country: string
}

interface HistoricalCurrency30Days {
	data: HistoricalCurrencyDate[]
	lastUpdated: string
}

interface HistoricalCurrencyDate {
	rates: HistoricalCurrency[]
	date: string
}

interface HistoricalCurrency {
	targetCurrency: string
	exchangeRate: number
}

// const historyChartData = getHistoryByCurrency(history, country)

// const data = [
//   { name: 'Jan', predicted: 200, total: 100 },
//   { name: 'Feb', predicted: 600, total: 600 },
//   { name: 'Mar', predicted: 400, total: 450 },
//   { name: 'Apr', predicted: 700, total: 300 },
//   { name: 'May', predicted: 500, total: 900 },
//   { name: 'June', predicted: 300, total: 200 }
// ]
const data = [
  { name: 'Jan', total: 100 },
  { name: 'Feb', total: 600 },
  { name: 'Mar', total: 450 },
  { name: 'Apr', total: 230 },
  { name: 'May', total: 100 },
  { name: 'Jun', total: 10 },
  { name: 'Jul', total: 248 },
  { name: 'Aug', total: 450 },
  { name: 'Sep', total: 300 },
  { name: 'Oct', total: 579 }
]

const showchart = ref(true)
</script>

<template>
	<div class="relative rounded-lg border border-gray-600 px-4 py-3 text-sm max-w-xs mx-auto">
		<div className='flex space-y-4 flex-col items-center justify-center' v-if="showchart === false">
			<h2 className='text-xl '>Historic chart failed to load</h2>
			<Button variant='destructive' @click="console.log('historical chart failed to load')">Retry</Button>
		</div>
		<AreaChart :data="data" index="name" :categories="['total']" :show-grid-line="false" class="h-[400px] w-[300px] custom-area" v-else />
	</div> 
</template>