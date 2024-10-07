<template>
	<TheHeader></TheHeader>
	<TheView></TheView>
</template>

<script setup>
import TheHeader from './layouts/TheHeader.vue';
import TheView from './layouts/TheView.vue';
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
	authStore.initializeAuth();
});
</script>

<style></style>
