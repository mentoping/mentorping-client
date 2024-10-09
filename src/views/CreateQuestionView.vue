<template>
	<div class="center-container">
		<SelectCategoryComp></SelectCategoryComp>
		<input type="text" class="large-input" placeholder="제목을 입력하세요" />
		<SelectHashTagComp></SelectHashTagComp>
	</div>
</template>

<script setup>
import SelectCategoryComp from '@/components/SelectCategoryComp.vue';
import SelectHashTagComp from '@/components/SelectHashTagComp.vue';
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
</style>
