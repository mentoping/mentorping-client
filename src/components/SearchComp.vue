<template>
	<div class="lines">
		<div class="search-bar">
			<i class="fa-solid fa-magnifying-glass fa-2xl" style="color: #ababab"></i>
			<input
				type="text"
				v-model="searchText"
				placeholder="검색어를 입력하고 Enter을 눌러주세요"
			/>
			<i
				class="fa-solid fa-xmark fa-2xl"
				style="color: #ababab; cursor: pointer"
				@click="clearSearch"
			></i>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

// 검색 입력 값을 저장하는 변수
const searchText = ref('');

// 검색창 내용 제거 함수
const clearSearch = () => {
	searchText.value = ''; // input 내용 초기화
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
