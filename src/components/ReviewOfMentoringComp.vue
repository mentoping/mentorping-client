<template>
	<div class="modal-overlay" @click.self="closeModal">
		<div class="modal-content">
			<div>멘토링 후기</div>
			<div class="review-container">
				<div class="review" v-for="(review, index) in reviews" :key="index">
					<div class="review-rating">
						<span v-for="n in 5" :key="n" class="star-putted">
							{{ n <= review.rate ? '⭐' : '☆' }}
						</span>
					</div>
					<div class="review-contents">{{ review.content }}</div>
				</div>
			</div>
			<!-- 별점 선택 기능 -->
			<div class="star-rating">
				<span v-for="n in 5" :key="n" class="star" @click="setRating(n)">
					{{ n <= rating ? '⭐' : '☆' }}
				</span>
			</div>
			<!-- 별점 선택 후 텍스트 입력 -->
			<span>
				<input
					type="text"
					v-model="comment"
					placeholder="후기를 입력해주세요"
					class="review-input"
				/>
				<button class="review-submit" :disabled="!comment">입력</button>
			</span>
		</div>
	</div>
</template>

<script setup>
import { defineEmits, ref, onMounted } from 'vue';
import axios from 'axios';

const emit = defineEmits(['close']);

const closeModal = () => {
	emit('close');
};

const props = defineProps({
	mentoringId: {
		type: Number,
		required: true,
	},
});

const reviews = ref([
	{
		rate: 5,
		content: '최고의 강의!!',
	},
	{
		rate: 4,
		content: '좋았어요!!',
	},
	{
		rate: 4,
		content: '좋았어요!!',
	},
	{
		rate: 4,
		content: '좋았어요!!',
	},
	{
		rate: 4,
		content: '좋았어요!!',
	},
]);
const rating = ref(5); // 기본 별점은 5점
const comment = ref('');

// API 요청으로 리뷰 데이터를 가져옴
onMounted(async () => {
	try {
		const response = await axios.get(
			`/api/mentorings/${props.mentoringId}/reviews`,
		);
		reviews.value = response.data;
	} catch (error) {
		console.error('Error fetching reviews:', error);
	}
});

// 사용자가 별점을 선택하면 rating에 저장
const setRating = value => {
	rating.value = value;
};
</script>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.modal-content {
	background: white;
	padding: 2rem;
	border-radius: 8px;
	text-align: center;
	width: 40vw;
	height: 70vh;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.modal-content div {
	font-weight: 800;
	font-size: 40px;
}

.review-container {
	margin-top: 20px;
	width: 90%;
	height: 65%;

	overflow-y: scroll;
}

.review {
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
}

/* 별점 UI 스타일 */
.star-rating {
	margin: 10px 0;
	font-size: 30px;
}

.star {
	cursor: pointer;
	font-size: 40px;
	color: gold;
}

.review-input {
	width: 27vw;
	height: 40px;
	border-radius: 10px;
	padding: 5px;
	margin-right: 10px;
	border: 1px solid #5e616084;
}

.review-submit {
	height: 40px;
	width: 80px;
	background-color: #3b946f;
	color: white;
	font-size: 16px;
	font-weight: 500;
	border-radius: 10px;
	cursor: pointer;
	border: none;
}

.review-submit:disabled {
	background-color: #cccccc;
	cursor: not-allowed;
}

.review-submit:hover:not(:disabled) {
	background-color: #255c45;
}

.star-putted {
	font-size: 20px;
}

.review-contents {
	font-size: 20px;
}
</style>
