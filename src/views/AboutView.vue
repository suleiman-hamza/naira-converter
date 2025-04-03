<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useRouter } from 'vue-router';
import { ArrowUpIcon } from 'lucide-vue-next';

const router = useRouter();

function goback() {
    router.go(-1)
}

</script>
<template>
    <Button variant="outline" @click="goback" size="icon" class="bg-stone-950 hover:bg-stone-900 hover:text-neutral-200 border-green-600">
        <ArrowUpIcon />
    </Button>
    <p>The About page</p>
</template>