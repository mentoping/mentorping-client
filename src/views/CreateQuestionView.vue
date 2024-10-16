<template>
	<div class="center-container">
		<SelectCategoryComp></SelectCategoryComp>
		<input
			type="text"
			class="large-input"
			placeholder="제목을 입력하세요"
			v-model="title"
		/>
		<SelectHashTagComp v-model="hashtags"></SelectHashTagComp>
		<TextEditorComp
			class="text-editor"
			:placeholder="'질문내용을 입력해주세요'"
			:height="600"
			v-model="content"
		></TextEditorComp>
		<div class="button-container">
			<router-link to="/question">
				<button class="cancel-button">취소</button>
			</router-link>
			<button class="save-button" @click="handleSave">저장</button>
		</div>
	</div>
</template>

<script setup>
import SelectCategoryComp from '@/components/SelectCategoryComp.vue';
import SelectHashTagComp from '@/components/SelectHashTagComp.vue';
import TextEditorComp from '@/components/TextEditorComp.vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from 'vue';
import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia';

const router = useRouter();
const categoryStore = useCategoryStore();

const { selectedCategory } = storeToRefs(categoryStore); //현재 선택된 카테고리
const title = ref(''); //질문 제목
const hashtags = ref([]); // 해시태그 배열
const content = ref('');

const handleSave = async () => {
	if (selectedCategory.value === 'ALL') {
		alert('카테고리를 선택해주세요.');
		return;
	}
	if (!title.value.trim()) {
		alert('제목을 입력해주세요.');
		return;
	}
	if (!content.value.trim()) {
		alert('질문 내용을 입력해주세요.');
		return;
	}

	try {
		// API 요청 보내기
		await axios.post(
			'http://localhost:8089/questions',
			{
				title: title.value,
				content: content.value,
				category: selectedCategory.value,
				hashtags: hashtags.value,
			},
			{
				withCredentials: true, // withCredentials는 세 번째 인자로 전달해야 함
			},
		);
		// 저장 성공 후 페이지 이동
		alert('질문이 성공적으로 저장되었습니다.');
		router.push('/question');
	} catch (error) {
		console.error('질문 저장 중 오류가 발생했습니다:', error);
		alert('질문 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
	}
};
</script>

<style scoped>
.center-container {
	margin-top: 100px;
	display: flex;
	flex-direction: column; /* 세로 방향으로 정렬 */
	justify-content: center; /* 가로 중앙 정렬 */
	align-items: center; /* 세로 중앙 정렬 */
}

.large-input {
	width: 60vw;
	padding: 1rem;
	margin-top: 1rem;
	font-size: 1.2rem;
	height: 17vh;
	margin-top: 40px;
	border: none;
	text-align: center;
	font-weight: 800;
	font-size: 6vh;
	outline: none;
}

.large-input::placeholder {
	font-size: 10vh; /* placeholder는 크지만 실제 입력 내용은 작게 조정 */
}

.text-editor {
	margin-top: 50px;
	width: 70%; /* TextEditorComp의 너비를 설정합니다 */
}

.button-container {
	width: 70%; /* 버튼 컨테이너의 너비를 TextEditorComp와 동일하게 설정합니다 */
	display: flex;
	justify-content: flex-end; /* 버튼들을 오른쪽으로 정렬 */
	margin-top: 60px; /* 버튼 상단 여백 */
}

.cancel-button,
.save-button {
	padding: 0.5rem 1rem;
	margin-left: 10px;
	font-size: 1rem;
	border: none;
	cursor: pointer;
	font-weight: bold;
	border-radius: 10px;
	margin-bottom: 100px;
	width: 70px;
}

.save-button {
	background-color: #369261;
	color: white;
}
</style>
