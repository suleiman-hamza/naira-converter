<script lang="ts" setup>
// import type { Currency } from '../'
const { data: response }: { [key: string]: any } = await useFetch("/api/converter")

const baseCurrency = computed({
    get() {
        //getter: 
        return ngnInitialAmount.value / target?.inverseRate
    },
    set(value) {
        //setter:
        ngnInitialAmount.value = value * target?.inverseRate
    }
});

const target = await response.value?.usd;
const localizedAmount = ref(0);
const ngnInitialAmount = ref(1000);

function clearInputs() {
    ngnInitialAmount.value = 0;
    localizedAmount.value = 0;
}

// try watchEffects for reactive dependencies tracking
// use rounded rate inside the watch function

//issues
// converter does not re-caculate values in the input after selcting a diffrent country
// rounding up values in the input
// focus input after selcting a country from the modal component - to the ngninitial

</script>
<template>
    <!-- add this height back to the next div h-80-->
    <div class=" w-full flex flex-col justify-between rounded-xl max-w-xs mx-auto mb-8 border-red-200 border p-4">
        <h2 class="text-white text-lg">Currency Converter</h2>
        <h4 class="text-[#dedede] mb-4">Convert Nigerian NGN to ???</h4>
        <div class="grid items-center w-full gap-4 text-white grid-cols-2 mb-4">
            <div class="flex flex-col space-y-1.5">
                <label class="text-white" for="ngn">NGN</label>
                <input id="ngn" name="base-value" size="10" v-model="ngnInitialAmount" class="bg-stone-900 border w-full p-2 rounded-md" type="text"/>
            </div>
            <div class="flex flex-col space-y-1.5">
                <label class="text-white" for="for">???</label>
                <input id="for" name="target-value" size="10" v-model="baseCurrency" class="bg-stone-900 border w-full p-2 rounded-md" type="text"/>
            </div>
        </div>
        <div class="flex flex-col space-y-1.5 mb-4">
            <button class="text-stone-900 bg-white rounded-md p-2" @click="clearInputs">
                Clear
            </button>
        </div>

        <div class="flex items-center space-x-4 rounded-md border border-gray-500 p-4 w-full">
            <svg class="size-6" fill="none" stroke="#fff" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="flex-1 space-y-1">
                <p class="text-sm font-medium flex gap-1 items-center">1 Naira = {{ baseCurrency }}</p>
            </div>
        </div>
        <pre>{{ response }}</pre>
        <p class="border p-2">{{ target }}</p>
    </div>
</template>

<style scoped>
</style>
