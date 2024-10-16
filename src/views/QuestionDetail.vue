<template>
	<QuestionDetailComp class="shared-width question-detail"></QuestionDetailComp>
	<div class="answer-explain">멘토만 답변 작성이 가능합니다</div>
	<TextEditorComp
		v-model="answerContent"
		class="shared-width text-editor"
		:placeholder="'답변을 작성해보세요.'"
		:height="150"
	></TextEditorComp>
	<div ref="advertiseBox" class="advertise-box">
		<img
			src="@/assets/advertise.png"
			alt="광고 이미지"
			class="advertise-image"
		/>
	</div>
	<button class="answer-button" @click="putAnswer" :disabled="!canAnswer">
		답변하기
	</button>
	<div class="answer-count">
		<span>{{ currentQuestion.answerCount }}</span> 개의 답변이 달렸어요!
	</div>
	<QuestionAnswerComp class="shared-width answer-box"></QuestionAnswerComp>
</template>

<script setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useQandMStore } from '@/stores/questionAndMentoringStore';
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';
import axios from 'axios';

import QuestionDetailComp from '@/components/QuestionDetailComp.vue';
import TextEditorComp from '@/components/TextEditorComp.vue';
import QuestionAnswerComp from '@/components/QuestionAnswerComp.vue';

const { id } = defineProps({
	id: {
		type: String,
		required: true,
	},
});

// Pinia 스토어 사용
const questionStore = useQandMStore();
const authStore = useAuthStore();

const { userInfo } = storeToRefs(authStore);

const { currentQuestion } = storeToRefs(questionStore);

const advertiseBox = ref(null);
const answerContent = ref('');

const handleScroll = () => {
	if (advertiseBox.value) {
		const offset = Math.max(265, window.scrollY + 200);
		advertiseBox.value.style.top = `${offset}px`;
	}
};

const putAnswer = async () => {
	try {
		if (answerContent.value.trim() === '') {
			alert('답변을 작성해주세요.');
			return;
		}
		await axios.post(
			`/api/answers`,
			{
				postId: id,
				content: answerContent.value,
			},
			{
				withCredentials: true,
			},
		);
		alert('답변이 성공적으로 등록되었습니다.');

		// 답변 완료 후 텍스트 에디터 내용 초기화
		answerContent.value = '';
		await nextTick(); // Vue 상태 업데이트 보장
		questionStore.setQuestionDetail(id); // 질문 정보 업데이트
	} catch (error) {
		console.error('답변 등록 중 오류 발생:', error);
		alert('답변 등록에 실패했습니다. 다시 시도해주세요.');
	}
};

onMounted(() => {
	questionStore.setQuestionDetail(id); //현재 질문 정보 가져오기
	window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
});

const canAnswer = computed(() => {
	return (
		currentQuestion.value &&
		currentQuestion.value.author &&
		currentQuestion.value.author.id !== userInfo.value.id
	);
});
</script>

<style scoped>
.shared-width {
	margin-top: 10px;
	width: 65vw;
	margin-left: 10vw;
	margin-right: 20vw;
}

.answer-button {
	margin-top: 0px;
	margin-bottom: 50px;
	margin-left: 69vw;
	width: 6vw;
	border-radius: 10px;
	font-weight: 800;
	color: white;
	background-color: green;
	padding: 8px;
	font-size: 15px;
	border: none;
	cursor: pointer; /* 커서 스타일 추가 */
	transition: background-color 0.3s ease; /* hover 시 배경색 변화 애니메이션 추가 */
}

.answer-button:hover {
	background-color: darkgreen; /* hover 시 배경색 변경 */
}

.question-detail {
	height: auto;
	margin-bottom: 20px;
	margin-top: 100px;
}

.answer-count {
	border-radius: 10px;
	margin-left: 10vw;
	background-color: #f3f3f3;
	width: 65vw;
	padding: 10px 0 10px 30px;
	font-weight: 800;
	font-size: 25px;
}

.answer-explain {
	margin-top: 30px;
	margin-left: 10vw;
	width: 65vw;
	font-weight: 800;
	font-size: 22px;
	color: #3b946f;
}

.answer-count span {
	color: #3b946f;
}

.advertise-box {
	width: 300px;
	height: 420px;
	position: absolute; /* fixed에서 absolute로 변경 */
	top: 265px;
	left: 77vw;
	border-radius: 20px;
	transition: top 0.5s ease-in-out; /* 자연스러운 움직임을 위해 추가 */
}

.advertise-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	border-radius: 20px;
}

.answer-box {
	margin-top: 40px;
}

.answer-button:disabled {
	background-color: grey;
	cursor: not-allowed;
}
</style>
