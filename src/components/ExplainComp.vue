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
		<div class="question-button" @click="handleButtonClick">
			<slot name="button"></slot>
		</div>

		<!-- 모달 컴포넌트 -->
		<LoginModalComp v-if="showModal" @close="closeModal" />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import LoginModalComp from '@/components/LoginModalComp.vue';

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);

const props = defineProps({
	buttonRoute: {
		type: String,
		required: true,
	},
});

const buttonRoute = props.buttonRoute;
const showModal = ref(false);

const handleButtonClick = () => {
	if (isLoggedIn.value) {
		// 로그인 되어 있으면 해당 경로로 이동
		window.location.href = buttonRoute;
	} else {
		// 로그인 되어 있지 않으면 모달 표시
		showModal.value = true;
	}
};

const closeModal = () => {
	showModal.value = false;
};
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
	cursor: pointer;
}

.question-button {
	color: white;
}
</style>
