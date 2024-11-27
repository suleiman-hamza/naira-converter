<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Button from './ui/button/Button.vue';
import Input from './ui/input/Input.vue';
import Label from './ui/label/Label.vue';

const ngnInitialAmount = ref(0)
const localizedAmount = ref(0)
const currentRate = ref(1750)

function clearInputs() {
    ngnInitialAmount.value = 0
    localizedAmount.value = 0
    console.log('sssssffff')
}

watch(ngnInitialAmount, (newVal) => {
    localizedAmount.value = newVal / currentRate.value
})

watch(localizedAmount, (newVal) => {
    ngnInitialAmount.value = newVal * currentRate.value
})

</script>
<template>
        <Card class="max-w-xs mx-auto">
            <CardHeader>
            <CardTitle>Currency Converter</CardTitle>
            <CardDescription>Convert Nigerian NGN to USD</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="grid items-center w-full gap-4">
                    <div class="flex flex-col space-y-1.5">
                        <Label for="ngn">NGN</Label>
                        <Input id="ngn" type="number" v-model="ngnInitialAmount" />
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Label for="for">USD</Label>
                        <Input id="for" type="number" v-model="localizedAmount"/>
                    </div>
                    <div class="flex flex-col space-y-1.5">
                        <Button variant="outline" @click="clearInputs">
                            Clear
                        </Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter class="flex justify-between px-6 pb-6">
            </CardFooter>
        </Card>
        <p>{{ localizedAmount }}</p>
        <!--
        <div class="grid w-full max-w-sm items-center gap-1.5">
            <Label for="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" />
        </div>
        -->
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