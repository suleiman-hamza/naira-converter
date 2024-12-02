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
    console.log(isZeroValue('damilola'))
}

function isZeroValue(value: string) {
	return value.length === 2 && value[0] === '0' && value[1] !== '.'
}

watch(ngnInitialAmount, (newVal) => {
    localizedAmount.value = newVal / (store.inverseRate).toFixed(2)
})

watch(localizedAmount, (newVal) => {
    ngnInitialAmount.value = newVal * (store.inverseRate).toFixed(2)
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
            <CardFooter class="flex justify-between px-6 pb-6">
                <p>Footer Component goes here</p>
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