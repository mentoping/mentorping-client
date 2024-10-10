<template>
	<div
		class="question-container"
		v-if="currentQuestion && Object.keys(currentQuestion).length > 0"
	>
		<h1>{{ currentQuestion.category }}</h1>
		<div class="question-box">
			<div class="author-info">
				<img
					:src="currentQuestion.author.profileUrl"
					alt="프로필 사진"
					class="profile-img"
				/>
				<div class="author-details">
					<div class="author-name">{{ currentQuestion.author.name }}</div>
					<div class="created-at">{{ currentQuestion.createdAt }}</div>
				</div>
				<div class="edit-delete">수정하기 / 삭제하기</div>
			</div>
			<div class="content">
				<p>{{ currentQuestion.content }}</p>
			</div>
			<div class="hashtags-like">
				<div class="hashtags">
					<span
						v-for="(hashtag, index) in currentQuestion.hashtags"
						:key="index"
						class="hashtag"
					>
						#{{ hashtag }}
					</span>
				</div>
				<div class="like-count" @click.stop="toggleLike(currentQuestion)">
					<span v-if="isLiked(currentQuestion.id)">❤️</span>
					<span v-else>🤍</span>
					{{ currentQuestion.likeCount }}
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useQuestionStore } from '@/stores/questionAndMentoringStore';
import { useLikeStore } from '@/stores/likeStore';
import { storeToRefs } from 'pinia';

// Pinia 스토어 사용
const questionStore = useQuestionStore();
const { currentQuestion } = storeToRefs(questionStore);

const likeStore = useLikeStore();
const { questionLike } = storeToRefs(likeStore);

// Check if a question is liked by the current user
const isLiked = questionId => {
	return questionLike.value.includes(String(questionId));
};

// Toggle the like status of a question and update the like count
const toggleLike = question => {
	const questionId = String(question.id);
	if (isLiked(questionId)) {
		const index = questionLike.value.indexOf(questionId);
		if (index > -1) {
			questionLike.value.splice(index, 1);
			question.likeCount--;
		}
	} else {
		questionLike.value.push(questionId);
		question.likeCount++;
	}
};
</script>

<style scoped>
.question-container {
	margin-left: 10vw;
	margin-top: 50px;
}

.question-box {
	border: 1px solid rgb(170, 170, 170);
	padding: 16px;
	border-radius: 8px;
	width: 70vw;
	margin-top: 25px;
}

.author-info {
	display: flex;
	align-items: center;
	margin-bottom: 16px;
}

.profile-img {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-right: 16px;
}

.author-details {
	flex-grow: 1;
}

.author-name {
	font-weight: bold;
}

.created-at {
	font-size: 0.9em;
	color: gray;
}

.edit-delete {
	cursor: pointer;
	color: blue;
}

.content {
	margin-bottom: 16px;
	width: 94%;
}

.hashtags-like {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
	margin-top: 50px;
}

.hashtags {
	flex-grow: 1;
}

.hashtag {
	margin-right: 8px;
	color: black;
	border-radius: 30px;
	background-color: rgb(200, 200, 200);
	padding: 5px 10px;
}

.like-count {
	font-size: 1.2em;
	color: black;
	cursor: pointer;
}
</style>
