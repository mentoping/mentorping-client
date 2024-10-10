<template>
	<div class="answer-list">
		<div
			v-for="(answer, index) in currentAnswer"
			:key="index"
			class="answer-container"
		>
			<div class="answer-header">
				<img
					:src="answer.author.profileUrl"
					alt="프로필 이미지"
					class="profile-img"
				/>
				<div class="author-info">
					<p class="author-name">{{ answer.author.name }} 멘토</p>
					<p class="created-at">{{ answer.createdAt }} 작성</p>
				</div>
				<button class="report-button">🚨</button>
			</div>
			<div class="answer-content">
				<p>{{ answer.content }}</p>
			</div>
			<div class="answer-footer">
				<button class="adopt-button">채택하기</button>
				<div class="footer-right">
					<p class="footer-text">더 자세한 사항을 멘토와 상의해보세요</p>
					<button class="chat-button">채팅하러 가기</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useQuestionStore } from '@/stores/questionAndMentoringStore';
import { storeToRefs } from 'pinia';

const questionStore = useQuestionStore();
const { currentAnswer } = storeToRefs(questionStore);
</script>

<style scoped>
.answer-list {
	width: 100%;
}
.answer-container {
	border: 1px solid #d2c7c7;
	border-radius: 10px;
	padding: 20px;
	margin-bottom: 50px;
}
.answer-header {
	display: flex;
	align-items: center;
	position: relative;
}
.profile-img {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 15px;
}
.author-info {
	display: flex;
	flex-direction: column;
}
.author-name {
	font-weight: bold;
	color: #3b946f; /* 이름 색상 */
}
.created-at {
	color: #999;
	font-size: 14px;
}
.report-button {
	position: absolute;
	right: 0;
	top: 0;
	background: none;
	border: none;
	cursor: pointer;
	font-size: 20px;
}
.answer-content {
	margin: 20px 0;
	font-size: 16px;
}
.answer-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #999;
	font-size: 14px;
}
.adopt-button {
	background-color: #3b946f;
	color: white;
	border: none;
	padding: 8px 16px;
	border-radius: 5px;
	cursor: pointer;
	font-weight: 800;
}
.footer-right {
	display: flex;
	align-items: center;
}
.footer-text {
	margin: 0;
	margin-right: 10px; /* 오른쪽 간격 추가 */
}
.chat-button {
	border-radius: 40px;
	background-color: #3b946f58;
	color: white;
	border: none;
	padding: 8px 16px;
	cursor: pointer;
	color: green;
	font-weight: 800;
}
</style>
