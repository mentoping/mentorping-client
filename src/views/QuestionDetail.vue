<template>
	<QuestionDetailComp class="shared-width question-detail"></QuestionDetailComp>
	<div class="answer-explain">답변 작성</div>
	<TextEditorComp
		class="shared-width text-editor"
		:placeholder="'답변을 작성해보세요.'"
		:height="150"
	></TextEditorComp>
	<div ref="advertiseBox" class="advertise-box">
		<img
			src="C:/myproject/kosa/mentain/mentorping-client/src/assets/advertise.png"
			alt="광고 이미지"
			class="advertise-image"
		/>
	</div>
	<button class="answer-button">답변하기</button>
	<div class="answer-count">
		<span>{{ currentQuestion.answerCount }}</span> 개의 답변이 달렸어요!
	</div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useQuestionStore } from '@/stores/questionAndMentoringStore';

import QuestionDetailComp from '@/components/QuestionDetailComp.vue';
import TextEditorComp from '@/components/TextEditorComp.vue';

const { id } = defineProps({
	id: {
		type: String,
		required: true,
	},
});

// Pinia 스토어 사용
const questionStore = useQuestionStore();

const { currentQuestion } = questionStore;

const advertiseBox = ref(null);

const handleScroll = () => {
	if (advertiseBox.value) {
		const offset = Math.max(265, window.scrollY + 200);
		advertiseBox.value.style.top = `${offset}px`;
	}
};

onMounted(() => {
	questionStore.setQuestionDetail(id);
	window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll);
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
</style>
