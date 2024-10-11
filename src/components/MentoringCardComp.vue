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
			/>
			<div v-for="(hashtag, index) in mentoring.hashtags" :key="index">
				#{{ hashtag }}
			</div>
			<div class="actions">
				<span class="likes" @click.stop="toggleLike(mentoring)">
					<span v-if="isLiked(mentoring.id)">❤️</span>
					<span v-else>🤍</span>
					{{ mentoring.likeCount }}
				</span>
			</div>
			<div>제목:{{ mentoring.title }}</div>
			<div>요약:{{ mentoring.summary }}</div>
			<img
				:src="
					mentoring.author.profileUrl
						? mentoring.author.profileUrl
						: 'https://picsum.photos/id/1/200/300'
				"
				alt=""
			/>
			<div>이름: {{ mentoring.author.name }}</div>
			<div>별점: {{ mentoring.rating }}</div>
			<div>가격: {{ mentoring.price }}</div>
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

<style scoped></style>
