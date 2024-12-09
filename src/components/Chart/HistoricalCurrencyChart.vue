<script setup lang="ts">
import Button from '../ui/button/Button.vue';

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
</script>

<template>
    <div className='flex space-y-4 flex-col items-center justify-center'>
		<!-- <ExclamationTriangleIcon className='h-[30px] w-[30px] ' /> -->
		<h2 className='text-xl '>Historic chart failed to load</h2>
		<Button variant='destructive'>Retry</Button>
	</div>
</template>