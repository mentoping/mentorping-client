<template>
	<div class="center-container">
		<SelectCategoryComp></SelectCategoryComp>
		<input type="text" class="large-input" placeholder="제목을 입력하세요" />
		<SelectHashTagComp></SelectHashTagComp>
		<TextEditorComp class="text-editor"></TextEditorComp>
		<div class="button-container">
			<router-link to="/question">
				<button class="cancel-button">취소</button>
			</router-link>
			<router-link to="/question">
				<button class="save-button">저장</button>
			</router-link>
		</div>
	</div>
</template>

<script setup>
import SelectCategoryComp from '@/components/SelectCategoryComp.vue';
import SelectHashTagComp from '@/components/SelectHashTagComp.vue';
import TextEditorComp from '@/components/TextEditorComp.vue';
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
	height: 600px;
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
