<template>
	<div class="center-container">
		<div class="title">문의하기</div>
		<div class="explain">
			관리자에게 문의할 내용을 작성하세요<br />문의에 대한 답변은 마이페이지에서
			확인할 수 있습니다
		</div>
		<input type="text" class="large-input" placeholder="제목을 입력하세요" />
		<TextEditorComp
			class="text-editor"
			:placeholder="'문의 내용을 입력하세요'"
			:height="600"
		></TextEditorComp>
		<div class="button-container">
			<button class="cancel-button" @click="goBack">취소</button>
			<button class="save-button" @click="goBack">저장</button>
		</div>
	</div>
</template>

<script setup>
import TextEditorComp from '@/components/TextEditorComp.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
	router.go(-1);
};
</script>

<style scoped>
.center-container {
	margin-top: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.large-input {
	width: 60vw;
	padding: 1rem;
	margin-top: 60px;
	height: 17vh;
	margin-top: 40px;
	border: none;
	text-align: center;
	font-weight: 800;
	font-size: 90px;
	outline: none;
}

.text-editor {
	margin-top: 50px;
	width: 60%;
}

.title {
	font-weight: 800;
	font-size: 70px;
	color: #3b946f;
}

.explain {
	margin-top: 10px;
	color: #878787;
	text-align: center;
}

.button-container {
	width: 60%; /* 버튼 컨테이너의 너비를 TextEditorComp와 동일하게 설정합니다 */
	display: flex;
	justify-content: flex-end; /* 버튼들을 오른쪽으로 정렬 */
	margin-top: 10px; /* 버튼 상단 여백 */
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
