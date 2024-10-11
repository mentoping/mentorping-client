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
					<div class="created-at">{{ formattedDate }}</div>
				</div>
				<div class="edit-delete">수정하기 / 삭제하기</div>
			</div>
			<div class="title">{{ currentQuestion.title }}</div>
			<div class="content">
				<!-- <p>{{ currentQuestion.content }}</p> -->
				<p v-html="currentQuestion.content"></p>
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
import { useQandMStore } from '@/stores/questionAndMentoringStore';
import { useLikeStore } from '@/stores/likeStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

// Pinia 스토어 사용
const questionStore = useQandMStore();
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

// Format created date to display only year, month, day, hour, and minute
const formattedDate = computed(() => {
	if (currentQuestion.value.createdAt) {
		const date = new Date(currentQuestion.value.createdAt);
		return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
	}
	return '';
});
</script>

<style scoped>
.question-container {
	margin-left: 10vw;
	margin-top: 200px;
}

.question-box {
	border: 1px solid #e9e9e9;
	padding: 16px;
	border-radius: 8px;
	width: 65vw;
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
	margin-top: 40px;
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
	font-weight: 800;
}

.like-count {
	margin-right: 15px;
	font-size: 1.2em;
	color: black;
	cursor: pointer;
}

.title {
	font-weight: 800;
	margin-top: 30px;
	font-size: 50px;
}
</style>
