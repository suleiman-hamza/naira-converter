<script setup lang="ts">
import { ref } from 'vue';
import Button from '../ui/button/Button.vue';
import { AreaChart } from '@/components/ui/chart-area';

// this will be passed from the store or modal
interface Props {
	history: HistoricalCurrency30Days
	country: string
}

// history
interface HistoricalCurrency30Days {
	data: HistoricalCurrencyData[]
	lastUpdated: string
}

// history.data
interface HistoricalCurrencyData {
	rates: HistoricalCurrency[]
	date: string
}

//rates array of abject
interface HistoricalCurrency {
	targetCurrency: string
	exchangeRate: number
}

const HISTORY_URL = 'https://kayla_lin-getyenpriceblob.web.val.run'

async function getHistory() {
	try {
		const res = await fetch(HISTORY_URL)
		const history: HistoricalCurrency30Days = await res.json()
		getHistoryByCurrency(history, 'aud')
	} catch (e) {
		console.error('error while fetching', e)
	}
}

// const historyChartData = getHistoryByCurrency(history, country)
function getHistoryByCurrency(history: HistoricalCurrency30Days, country: string) {
	const currency = history.data.map((day) => {
		return {
			date: new Date().getTime(),
			value: day.rates.find((history) => {
				return history.targetCurrency === country.toLocaleUpperCase()
			})?.exchangeRate
		}
	})

	console.log(currency)
}

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
		<Button @click="getHistory">Fetch History</Button>
	</div> 
</template>