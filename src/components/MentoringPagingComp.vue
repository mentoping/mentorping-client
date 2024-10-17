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
			:disabled="currentPage === currentMentoringTotalPages"
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
import { useCategoryStore } from '@/stores/category';

import { mentoringPagingSearch } from '@/api/mentoring';

const categoryStore = useCategoryStore();

const questionStore = useQandMStore();
const { currentMentoringTotalPages } = storeToRefs(questionStore);

const currentPage = ref(1);
const maxVisiblePages = 8;

// Calculate the visible page numbers based on currentPage and maxVisiblePages
const visiblePages = computed(() => {
	const pages = [];
	const total = parseInt(currentMentoringTotalPages.value) || 1;
	let startPage =
		Math.floor((currentPage.value - 1) / maxVisiblePages) * maxVisiblePages + 1;
	let endPage = Math.min(startPage + maxVisiblePages - 1, total);

	for (let page = startPage; page <= endPage; page++) {
		pages.push(page);
	}
	return pages;
});

// Go to a specific page
const goToPage = async page => {
	currentPage.value = page;
	await fetchMentorings();
};

// Go to the previous page
const prevPage = async () => {
	if (currentPage.value > 1) {
		currentPage.value--;
		await fetchMentorings();
	}
};

// Go to the next page
const nextPage = async () => {
	if (currentPage.value < currentMentoringTotalPages.value) {
		currentPage.value++;
		await fetchMentorings();
	}
};

// Fetch questions based on the current page
const fetchMentorings = async () => {
	try {
		const category = categoryStore.selectedCategory;
		const sort = questionStore.orderCondition; // 필요한 정렬 조건을 설정하세요.
		const page = currentPage.value - 1; // API에서 페이지는 0부터 시작하므로 -1 해줍니다.
		const keyword = questionStore.searchWord;
		const mentorings = await mentoringPagingSearch(
			category,
			sort,
			page,
			keyword,
		);
		// 질문 목록을 store 또는 컴포넌트 상태에 업데이트합니다.
		questionStore.setMentoringList(mentorings);
	} catch (error) {
		console.error('Failed to fetch questions:', error);
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
	background-color: #28a745 !important; /* 현재 페이지의 배경색 */
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
