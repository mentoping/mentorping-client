<template>
	<div class="q-container">
		<!-- 제목을 받는 slot -->
		<div class="title">
			<slot name="title"></slot>
		</div>

		<!-- 설명을 받는 slot -->
		<div class="discription">
			<slot name="description"></slot>
		</div>

		<!-- 버튼을 받는 slot -->
		<div class="question-button">
			<RouterLink :to="buttonRoute" class="button-color">
				<slot name="button"></slot>
			</RouterLink>
		</div>
	</div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
	buttonRoute: {
		type: String,
		required: true,
	},
});

const buttonRoute = props.buttonRoute;
</script>

<style scoped>
.q-container {
	display: flex;
	flex-direction: column; /* 세로 방향으로 정렬 */
	align-items: center; /* 가로 축에서 가운데 정렬 */
	gap: 1vh;
}

.title {
	font-weight: 800;
	font-size: 3rem;
}

.discription {
	color: rgb(126, 125, 125);
}

.question-button {
	border-radius: 50px;
	background-color: #369261;
	width: 13vh;
	padding: 1vh 0; /* 세로 padding으로 버튼의 높이 조정 */
	display: flex;
	justify-content: center; /* 가로 중앙 정렬 */
	align-items: center; /* 세로 중앙 정렬 */ /* 버튼 글자 색 */
	font-weight: bold; /* 글자 굵게 */
	margin-top: 2vh;
}

.button-color {
	color: white;
}
</style>
