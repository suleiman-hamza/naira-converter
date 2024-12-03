<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Ref } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from '@/components/ui/separator';
import Button from './ui/button/Button.vue';
import Input from './ui/input/Input.vue';
import Label from './ui/label/Label.vue';
import { userateStore } from '@/stores/useRateStore';
const store = userateStore();

const ngnInitialAmount: Ref<number> = ref(0);
const localizedAmount: Ref<number> = ref(0);

function clearInputs() {
    ngnInitialAmount.value = 0;
    localizedAmount.value = 0;
}

watch(ngnInitialAmount, (newValue1) => {
    localizedAmount.value = parseFloat((newValue1 / store.inverseRate).toFixed(2))
})

watch(localizedAmount, (newVal2) => {
    ngnInitialAmount.value = parseFloat((newVal2 * store.inverseRate).toFixed(2))
})
//issues
// converter does not re-caculate values in the input after selcting a diffrent country
// rounding up values in the input
// focus input after selcting a country from the modal component - to the ngninitial

</script>
<template>
    <Skeleton class="h-80 w-full rounded-xl max-w-xs mx-auto mb-8" v-if="store.loadSkeleton" />
        <Card class="max-w-xs mx-auto mb-8 bg-stone-900 border-gray-600" v-else-if="store.loadSkeleton === false">
            <CardHeader>
            <CardTitle class="text-white">Currency Converter</CardTitle>
            <CardDescription>Convert Nigerian NGN to {{ store.selectedCountry }}</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="grid items-center w-full gap-4 text-white grid-cols-2 mb-6">
                    <div class="flex flex-col space-y-1.5">
                        <Label for="ngn" class="text-white">NGN</Label>
                        <Input id="ngn" type="number" v-model="ngnInitialAmount" class="bg-stone-900 border-gray-500"/>
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="for" class="text-white">{{ store.selectedCountry }}</Label>
                        <Input id="for" type="number" v-model="localizedAmount" class="bg-stone-900 border-gray-500"/>
                    </div>
                </div>
                <div class="flex flex-col space-y-1.5 mb-6">
                    <Button variant="outline" @click="clearInputs" class="text-stone-900">
                        Clear
                    </Button>
                </div>
                <Separator class="bg-gray-500 w-full" />
            </CardContent>
            <CardFooter class="p-4 text-stone-50">
                    <div class="flex items-center space-x-4 rounded-md border p-4 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                            </svg>
                        <div class="flex-1 space-y-1">
                            <p class="text-sm font-medium flex gap-1 items-center">
                                1 Naira = {{ store.inverseRate }}
                            </p>
                        </div>
                    </div>
            </CardFooter>
        </Card>
</template>
<style scoped>
.con {
    padding: 1rem;
    border: 1px solid grey;
    border-radius: 10px;
    margin-top: 1rem;
}
h2 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
}
#ngn-currency {
    width: 40px;
    color: black;
    margin-bottom: 0.5rem;
}
</style>