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
const data = [
  { name: 'Jan', total: Math.floor(Math.random() * 60) + 500, predicted: 300 },
  { name: 'Feb', total: Math.floor(Math.random() * 2000) + 500, predicted: 600 },
  { name: 'Mar', total: Math.floor(Math.random() * 2000) + 500, predicted: 400 },
  { name: 'Apr', total: Math.floor(Math.random() * 2000) + 500, predicted: 700 },
  { name: 'May', total: Math.floor(Math.random() * 2000) + 500, predicted: 500 },
  { name: 'June', total: Math.floor(Math.random() * 700) + 500, predicted: 300 }
]

const showchart = ref(true)
</script>

<template>
	<div class="relative rounded-lg border border-gray-600 px-4 py-3 text-sm max-w-xs mx-auto">
		<div className='flex space-y-4 flex-col items-center justify-center' v-if="showchart === false">
			<!-- <ExclamationTriangleIcon className='h-[30px] w-[30px] ' /> -->
			<h2 className='text-xl '>Historic chart failed to load</h2>
			<Button variant='destructive' @click="console.log('historical chart failed to load')">Retry</Button>
		</div>
		<AreaChart :data="data" index="name" :categories="['total', 'predicted']" :show-grid-line="false" class="h-[400px] w-[300px]" v-else />
	</div> 
</template>