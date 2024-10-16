<template>
	<div class="lines">
		<div class="search-bar">
			<i class="fa-solid fa-magnifying-glass fa-2xl" style="color: #ababab"></i>
			<input
				type="text"
				v-model="searchWord"
				placeholder="검색어를 입력하고 Enter을 눌러주세요"
				@keyup.enter="handleSearch"
			/>
			<i
				class="fa-solid fa-xmark fa-2xl"
				style="color: #ababab; cursor: pointer"
				@click="clearSearchWord"
			></i>
		</div>
	</div>
</template>

<script setup>
import { watch } from 'vue';
import { useQandMStore } from '@/stores/questionAndMentoringStore';
import { storeToRefs } from 'pinia';
import { questionPagingSearch } from '@/api/question';
import { useCategoryStore } from '@/stores/category';

const props = defineProps({
	contentType: {
		type: String,
		required: true,
	},
});

// Pinia 스토어 사용
const categoryStore = useCategoryStore();
const searchStore = useQandMStore();
const { searchWord } = storeToRefs(searchStore); // searchWord를 반응형으로 가져옵니다.
const clearSearchWord = searchStore.clearSearchWord; // clearSearchWord 함수는 직접 가져옵니다.

// Watch를 사용하여 상태 변화 확인 (디버깅용)
watch(searchWord, newValue => {
	if (newValue === '') {
		console.log('Search input cleared');
	}
});

const handleSearch = async () => {
	// 여기서는 임의로 카테고리, 정렬 방식, 페이지 등을 설정합니다.
	categoryStore.selectedCategory = 'ALL';
	const sort = searchStore.orderCondition; // 필요한 값으로 변경
	const page = 0; // 필요한 페이지 번호로 변경
	const keyword = searchWord.value;

	try {
		if (props.contentType === 'question') {
			const response = await questionPagingSearch(
				categoryStore.selectedCategory,
				sort,
				page,
				keyword,
			);
			searchStore.setQuestionList(response);
		} else if (props.contentType === 'mentoring') {
			console.log('멘토링 검색');
		}
	} catch (error) {
		console.error('검색 중 오류가 발생했습니다:', error);
	}
};
</script>

<style scoped>
.lines {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100vw;
	height: 12vh;
	background: linear-gradient(to right, white, #369261);
}

.search-bar {
	display: flex; /* Flexbox 사용 */
	align-items: center; /* 세로 정렬 */
	justify-content: space-between; /* 아이콘과 input을 좌우 끝으로 배치 */
	background-color: white;
	width: 40vw;
	height: 9vh;
	border: 1px solid rgb(200, 200, 200);
	border-radius: 10px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	padding: 0 10px;
}

.search-bar input {
	border: none;
	outline: none;
	flex-grow: 1;
	height: 100%;
	padding: 0 10px;
	font-size: 1rem;
}

.search-bar i {
	margin: 0 10px;
}
</style>
