<template>
	<div class="category-container">
		<!-- splitCategories로 나뉘어진 카테고리 배열을 이용하여 각 줄을 표시하는 부분 -->
		<div
			class="category-row"
			v-for="(rowCategories, index) in splitCategories"
			:key="index"
		>
			<button
				v-for="category in rowCategories"
				:key="category.value"
				:class="[
					'category-button',
					{ active: selectedCategory === category.value },
				]"
				@click="handleCategoryClick(category)"
				:disabled="selectedCategory === category.value"
			>
				{{ category.label }}
			</button>
		</div>
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCategoryStore } from '@/stores/category';
import { useQandMStore } from '@/stores/questionAndMentoringStore';
import { storeToRefs } from 'pinia';
import { questionCategorySearch } from '@/api/question';

const props = defineProps({
	contextType: {
		type: String,
		required: false,
		default: 'default',
	},
});

const categoryStore = useCategoryStore();
const { selectedCategory, splitCategories } = storeToRefs(categoryStore);

const questionStore = useQandMStore();

async function handleCategoryClick(category) {
	categoryStore.setSelectedCategory(category.value);
	// contextType에 따라 다른 로그 출력
	if (props.contextType === 'question') {
		const questionlist = await questionCategorySearch(
			categoryStore.selectedCategory,
			questionStore.orderCondition,
			questionStore.searchWord,
		);
		questionStore.setQuestionList(questionlist);
	} else if (props.contextType === 'mentoring') {
		console.log('Mentoring context: 카테고리 선택됨', category);
	}
}

onMounted(() => {
	categoryStore.setSelectedCategory('ALL');
});
</script>

<style>
.category-container {
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	justify-content: center;
	width: 100%;
	max-width: 1400px;
	margin: 0 auto;
}

.category-row {
	display: flex;
	gap: 20px;
	justify-content: center;
}

.category-button {
	padding: 10px 20px;
	border: none;
	cursor: pointer;
	background-color: #f5f5f5;
	transition: background-color 0.3s;
	text-align: center;
	box-sizing: border-box;
	border-radius: 30px;
	font-size: 17px;
}

.category-button.active {
	background-color: black;
	color: white;
}

.category-button:disabled {
	cursor: not-allowed;
	background-color: black;
	color: white;
}

.category-button:hover:not(:disabled) {
	background-color: #e0e0e0;
}

@media (max-width: 768px) {
	.category-container {
		max-width: 100%;
		padding: 10px;
	}
	.category-row {
		flex-wrap: wrap;
	}
	.category-button {
		flex: 0 1 auto;
		max-width: 100%;
	}
}
</style>
