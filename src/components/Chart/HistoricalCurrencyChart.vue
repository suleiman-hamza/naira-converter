<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Button from '../ui/button/Button.vue';
import { AreaChart } from '@/components/ui/chart-area';

onMounted(() => {
	getHistory();
})

let chartHistory: any = ref([])
const historyl: any = ref([])
const loading = ref(false);

// this will be passed from the store or modal
// interface Props {
// 	history: HistoricalCurrency30Days
// 	country: string
// }

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
		loading.value = true;
		const res = await fetch(HISTORY_URL)
		historyl.value = await res.json()
		chartHistory.value = await getHistoryByCurrency(historyl.value, 'aud')
	} catch (e) {
		console.error('error while fetching', e)
		showchart.value = false
	} finally {
		loading.value = false;
	}
}


async function getHistoryByCurrency(history: HistoricalCurrency30Days, country: string) {
	const currency = history.data.map((day) => {
		return {
			date: new Date(day.date).toLocaleString('en-US', {month: 'short', day: 'numeric'}),
			value: day.rates.find((history) => {
				return history.targetCurrency === country.toLocaleUpperCase()
			})?.exchangeRate
		}
	})

	return currency
}

const showchart = ref(true)
</script>

<template>
	<div class="relative rounded-lg border border-gray-600 px-4 py-3 text-sm max-w-xs mx-auto">
		<div v-if="showchart === false" class='flex space-y-4 flex-col items-center justify-center'>
			<h2 className='text-xl '>Historic chart failed to load</h2>
			<Button variant='destructive' @click="getHistory">Retry</Button>
		</div>
		<AreaChart v-else :data="chartHistory" index="date" :categories="['date', 'value']" :show-grid-line="true" class="custom-area h-[250px]" />
	</div>
</template>