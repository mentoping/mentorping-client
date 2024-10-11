<template>
	<div class="pagination-container">
		<button
			class="pagination-button"
			:disabled="currentPage === 1"
			@click="prevPage"
		>
			&lt;
		</button>
		<button
			v-for="page in visiblePages"
			:key="page"
			:class="['pagination-button', { active: currentPage === page }]"
			@click="goToPage(page)"
		>
			{{ page }}
		</button>
		<button
			class="pagination-button"
			:disabled="currentPage === totalPages"
			@click="nextPage"
		>
			&gt;
		</button>
	</div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useQandMStore } from '@/stores/questionAndMentoringStore';
import { storeToRefs } from 'pinia';

const questionStore = useQandMStore();
const { totalPages } = storeToRefs(questionStore);

const currentPage = ref(1);
const maxVisiblePages = 5;

// Calculate the visible page numbers based on currentPage and maxVisiblePages
const visiblePages = computed(() => {
	const pages = [];
	const total = parseInt(totalPages.value) || 1;
	let startPage =
		Math.floor((currentPage.value - 1) / maxVisiblePages) * maxVisiblePages + 1;
	let endPage = Math.min(startPage + maxVisiblePages - 1, total);

	for (let page = startPage; page <= endPage; page++) {
		pages.push(page);
	}
	return pages;
});

// Go to a specific page
const goToPage = page => {
	currentPage.value = page;
};

// Go to the previous page
const prevPage = () => {
	if (currentPage.value > 1) {
		currentPage.value--;
	}
};

// Go to the next page
const nextPage = () => {
	if (currentPage.value < totalPages.value) {
		currentPage.value++;
	}
};
</script>

<style scoped>
.pagination-container {
	display: flex;
	gap: 10px;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
}

.pagination-button {
	padding: 10px 15px;
	border: none;
	cursor: pointer;
	background-color: #f5f5f5;
	border-radius: 5px;
	transition: background-color 0.3s;
}

.pagination-button.active {
	background-color: #28a745;
	color: white;
	font-weight: bold;
}

.pagination-button:disabled {
	cursor: not-allowed;
	background-color: #cccccc;
	color: #666666;
}

.pagination-button:hover:not(:disabled) {
	background-color: #e0e0e0;
}
</style>
