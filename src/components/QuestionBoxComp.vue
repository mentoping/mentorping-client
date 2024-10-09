<template>
	<div class="order"><OrderConditonComp></OrderConditonComp></div>
	<div
		class="question-card"
		v-for="(question, index) in questionsContent"
		:key="index"
	>
		<div class="question-header">
			<img
				:src="question.author.profileUrl || 'https://picsum.photos/50'"
				alt="프로필 이미지"
				class="profile-img"
			/>
			<div class="user-info">
				<div class="category">{{ question.category }}</div>
				<div class="author">{{ question.author.name }}</div>
			</div>
		</div>
		<div class="question-content">
			<h3 class="title">{{ question.title }}</h3>
			<p class="content">{{ question.content }}</p>
		</div>
		<div class="question-footer">
			<div class="hashtags">
				<span
					v-for="hashtag in question.hashtags"
					:key="hashtag"
					class="hashtag"
				>
					#{{ hashtag }}
				</span>
			</div>
			<div class="actions">
				<span class="likes" @click="toggleLike(question)">
					<span v-if="isLiked(question.id)">❤️</span>
					<span v-else>🤍</span>
					{{ question.likeCount }}
				</span>
				<span class="answers"> 💬 {{ question.answerCount }} </span>
			</div>
		</div>
	</div>
</template>

<script setup>
import OrderConditonComp from './OrderConditonComp.vue';
import { storeToRefs } from 'pinia';
import { useQuestionStore } from '@/stores/questionAndMentoringStore';
import { useLikeStore } from '@/stores/likeStore';
import { computed } from 'vue';

const questionStore = useQuestionStore();
const { questions } = storeToRefs(questionStore);

const authStore = useLikeStore();
const { questionLike } = storeToRefs(authStore);

// Extracting content array from questions object
const questionsContent = computed(() => questions.value.content || []);

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
.question-card {
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	padding: 16px;
	background-color: #ffffff;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	margin-bottom: 16px;
	max-width: 1000px;
	width: 70vw;
}

.question-header {
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

.user-info {
	display: flex;
	flex-direction: column;
}

.category {
	font-size: 14px;
	color: #888;
}

.author {
	font-size: 16px;
	font-weight: bold;
}

.question-content {
	margin-bottom: 16px;
}

.title {
	font-size: 18px;
	font-weight: bold;
	margin-bottom: 8px;
}

.content {
	font-size: 16px;
	color: #333;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 75%;
}

.question-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.hashtags {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.hashtag {
	font-size: 14px;
	color: #007bff;
}

.actions {
	display: flex;
	gap: 16px;
}

.likes,
.answers {
	font-size: 16px;
	display: flex;
	align-items: center;
	gap: 4px;
	cursor: pointer;
}

.order {
	margin-bottom: 2vh;
}
</style>
