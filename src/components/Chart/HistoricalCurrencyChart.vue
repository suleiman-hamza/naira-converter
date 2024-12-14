<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Button from '../ui/button/Button.vue';
import { AreaChart } from '@/components/ui/chart-area';
import { Import } from 'lucide-vue-next';

onMounted(() => {
	getHistory();
})

let chartHistory: any = ref([])
const historyl: any = ref([])
const loading = ref(false);

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
			date: new Date(day.date).toISOString(),
			value: day.rates.find((history) => {
				return history.targetCurrency === country.toLocaleUpperCase()
			})?.exchangeRate
		}
	})

	return currency
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
		<AreaChart :data="chartHistory" index="name" :categories="['value', 'date']" :show-grid-line="false" class="h-[400px] w-[300px] custom-area" v-else />
		<Button @click="getHistory">Fetch History</Button>
		<p>{{ chartHistory }}</p>
	</div> 
</template>