<template>
	<div
		v-for="(question, index) in questionsContent"
		:key="index"
		class="question-card"
		@click="goToQuestion(question.id)"
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
		<div class="selected-icon" v-if="question.selected">
			<i class="fas fa-check"> 채택</i>
		</div>
		<div class="question-content">
			<h3 class="title">{{ question.title }}</h3>
			<p class="content">{{ question.content }}</p>
		</div>
		<div class="question-footer">
			<div class="hashtags">
				<span
					v-for="(hashtag, index) in question.hashtags"
					:key="index"
					class="hashtag"
				>
					#{{ hashtag }}
				</span>
			</div>
			<div class="actions">
				<span class="likes" @click.stop="toggleLike(question)">
					<span v-if="question.likedByCurrentUser"
						><i class="fa-solid fa-heart" style="color: #c21919"></i
					></span>
					<span v-else
						><i class="fa-regular fa-heart" style="color: #000000"></i
					></span>
					{{ question.likeCount }}
				</span>
				<span class="answers">
					<i class="fa-regular fa-comment-dots"></i> {{ question.answerCount }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useQandMStore } from '@/stores/questionAndMentoringStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const questionStore = useQandMStore();
const { questionList } = storeToRefs(questionStore);

// Router instance for navigation
const router = useRouter();

// Extracting content array from questions object
const questionsContent = computed(() => questionList.value.content || []);

// RouterLink를 사용하면 이벤트 버블링이 멈추지 않음
const goToQuestion = questionId => {
	router.push({ path: `/question/${questionId}` });
};

// Toggle the like status of a question and update the like count
const toggleLike = question => {
	if (question.likedByCurrentUser) {
		question.likedByCurrentUser = false;
		question.likeCount--;
	} else {
		question.likedByCurrentUser = true;
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
	margin-bottom: 30px;
	max-width: 1200px;
	width: 80vw;
	height: 15vw;
	transition: box-shadow 0.3s ease;
	cursor: pointer; /* 클릭 가능하다는 것을 사용자에게 시각적으로 알려줌 */
	position: relative;

	display: flex;
	flex-direction: column;
	justify-content: space-around;
}

.question-card:hover {
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.question-header {
	display: flex;
	align-items: center;
	height: 30%;
}

.profile-img {
	height: 80%;
	aspect-ratio: 1 / 1;
	border-radius: 50%;
	margin-right: 16px;
}

.user-info {
	display: flex;
	flex-direction: column;
}

.category {
	font-size: 15px;
	font-weight: 600;
	color: #888;
}

.author {
	font-size: 17px;
	font-weight: 700;
}

.question-content {
	height: 50%;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
}

.title {
	font-size: 30px;
	font-weight: 800;
}

.content {
	font-size: 18px;
	color: #646464;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 80%;
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
	padding: 3px 6px;
	font-size: 15px;
	font-weight: 600;
	color: black;
	background-color: rgb(188, 188, 188);
	border-radius: 10px;
}

.actions {
	display: flex;
	gap: 16px;
}

.likes,
.answers {
	font-size: 23px;
	display: flex;
	align-items: center;
	gap: 4px;
	cursor: pointer;
}

.selected-icon {
	position: absolute;
	top: 20px;
	right: 20px;
	background-color: green;
	padding: 10px;
	width: 65px;
	height: 65px;
	border-radius: 50%;
	font-size: 13px;
	text-align: center;
	display: flex;
	justify-content: center; /* 가로 중앙 정렬 */
	align-items: center; /* 세로 중앙 정렬 */
	color: white;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
