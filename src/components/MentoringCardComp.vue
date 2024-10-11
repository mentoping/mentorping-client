<template>
	<div class="card-view">
		<div
			v-for="(mentoring, index) in mentoringsContent"
			:key="index"
			class="mentoring-card"
			@click="goToMentoring(mentoring.id)"
		>
			<img
				:src="
					mentoring.thumbnailUrl
						? mentoring.thumbnailUrl
						: 'https://picsum.photos/id/1/200/300'
				"
				class="mentoring-thumbnail"
			/>
			<div class="card-contents">
				<div class="hashtags">
					<span
						v-for="(hashtag, index) in mentoring.hashtags"
						:key="index"
						class="hashtag"
					>
						#{{ hashtag }}
					</span>
				</div>
				<h3 class="mentoring-title">
					{{ mentoring.title }}
					<span
						class="likes"
						@click.stop="toggleLike(mentoring)"
						style="margin-left: auto"
					>
						<span v-if="isLiked(mentoring.id)">❤️</span>
						<span v-else>🤍</span>
						{{ mentoring.likeCount }}
					</span>
				</h3>
				<p class="mentoring-summary">{{ mentoring.summary }}</p>
				<div class="author-info">
					<img
						:src="
							mentoring.author.profileUrl
								? mentoring.author.profileUrl
								: 'https://picsum.photos/id/1/50/50'
						"
						alt=""
						class="author-profile"
					/>
					<div class="author-details">
						<div class="author-name">{{ mentoring.author.name }} 멘토</div>
						<div class="mentoring-price">1회 {{ mentoring.price }}원</div>
					</div>
					<div class="author-rating">
						<span class="rating-star">⭐</span>
						{{ Math.round(mentoring.rating * 10) / 10 }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useQandMStore } from '@/stores/questionAndMentoringStore';
import { useLikeStore } from '@/stores/likeStore';

import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const authStore = useLikeStore();
const { questionLike } = storeToRefs(authStore);

const mentoringStore = useQandMStore();
const { mentoringAndQuestionList } = storeToRefs(mentoringStore);

const router = useRouter();

const mentoringsContent = computed(
	() => mentoringAndQuestionList.value.content || [],
);

const goToMentoring = mentoringId => {
	router.push({ path: `/mentoring/${mentoringId}` });
};

// Check if a question is liked by the current user
const isLiked = mentoringId => {
	return questionLike.value.includes(String(mentoringId));
};

// Toggle the like status of a question and update the like count
const toggleLike = mentoring => {
	const mentoringId = String(mentoring.id);
	if (isLiked(mentoringId)) {
		const index = questionLike.value.indexOf(mentoringId);
		if (index > -1) {
			questionLike.value.splice(index, 1);
			mentoring.likeCount--;
		}
	} else {
		questionLike.value.push(mentoringId);
		mentoring.likeCount++;
	}
};
</script>

<style scoped>
.card-view {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 30px;
	justify-content: center;
}

.mentoring-card {
	position: relative; /* 자식 요소의 위치 기준을 설정 */
	overflow: hidden;
	cursor: pointer;
	transition: transform 0.2s;
	height: 400px;
	display: flex;
	flex-direction: column;
}

.mentoring-card:hover {
	transform: scale(1.05);
}

.mentoring-thumbnail {
	width: 100%;
	height: 50%;
	object-fit: cover;
	border-radius: 5px;
	margin-bottom: 6px;
}

.likes {
	font-size: 16px;
	color: black;
	display: inline-flex;
	align-items: center;
	margin-left: 10px;
}

.hashtags {
	margin: 5px 0;
}

.hashtag {
	display: inline-block;
	background-color: #cdcdcd;
	padding: 2px 5px;
	border-radius: 5px;
	margin-right: 5px;
	font-size: 10px;
	font-weight: 400;
	color: black;
}

.mentoring-title {
	font-size: 1.3em;
	font-weight: bold;
	margin: 5px 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.mentoring-summary {
	font-size: 13px;
	color: #444;
	margin-bottom: 26px;
}

.author-info {
	display: flex;
	align-items: center;
	margin-bottom: 5px;
	height: 50px; /* 각 요소의 높이를 동일하게 설정 */
}

.author-profile {
	width: 40px;
	height: 40px;
	border-radius: 50%;
	object-fit: cover;
	margin-right: 10px;
	align-self: center; /* 프로필 이미지를 세로 중앙 정렬 */
}

.author-details {
	display: flex;
	flex-direction: column;
	justify-content: center; /* 세로 중앙 정렬 */
	height: 100%; /* author-info와 동일한 높이 설정 */
}

.author-rating {
	color: #f39c12;
	font-size: 16px;
	margin-left: auto;
	border-radius: 10px;
	background-color: #fff8ba;
	height: 80%; /* author-info와 동일한 높이 설정 */
	display: flex;
	align-items: center; /* 세로 중앙 정렬 */
	padding: 0 10px; /* 공간을 확보하여 배경이 잘 보이도록 */
}

.mentoring-price {
	font-weight: bold;
	font-size: 12px;
	color: black;
	margin-top: 5px; /* 상하 중앙 정렬을 위해 추가 */
}

.actions {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-top: auto;
}

.card-contents {
	padding: 5px 10px;
	border: 1px solid #ddd;
	border-radius: 10px;
}

.author-name {
	color: #3b946f;
	font-weight: 800;
	font-size: 15px;
}
</style>
