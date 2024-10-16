<template>
	<div class="modal-overlay" @click.self="closeModal">
		<div class="modal-content">
			<p>채택하기</p>
			<input class="select-input" type="text" v-model="review" />
			<button
				class="select-button"
				:disabled="!review"
				@click="submitSelection"
			>
				채택하기
			</button>
		</div>
	</div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';
import axios from 'axios';

const props = defineProps({
	selectedAnswerId: {
		type: Number,
		required: true,
	},
});

const emit = defineEmits(['close']);

const closeModal = () => {
	emit('close');
};

const review = ref('');

const submitSelection = async () => {
	try {
		await axios.put(
			`/api/answers/${props.selectedAnswerId}/selected`,
			{
				review: review.value,
			},
			{
				withCredentials: true,
			},
		);
		closeModal();
		window.location.reload();
	} catch (error) {
		console.error('Error submitting selection:', error);
	}
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
	height: 50vh;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.modal-content p {
	margin-top: 15%;
	font-weight: 800;
	font-size: 50px;
	margin-bottom: 10%;
}

.select-button {
	background-color: #369261;
	border-radius: 20px;
	padding: 10px;
	color: white;
	font-weight: 700;
	font-size: 20px;
	width: 100px;
}

.select-button:hover {
	background-color: #246140;
}

.select-input {
	height: 80px;
	margin-bottom: 30px;
	width: 90%;
	border-radius: 20px;
	border: 2px solid gray;
	font-size: 25px;
	font-weight: 500;
}

.select-button:disabled {
	background-color: #ccc; /* 비활성화 시 회색으로 변경 */
	cursor: not-allowed;
}
</style>
