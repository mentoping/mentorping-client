<template>
	<div class="modal-overlay" @click.self="closeModal">
		<div class="modal-content">
			<div>멘토링 후기</div>
			<div class="review-container">
				<div class="review"></div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['close']);

const closeModal = () => {
	emit('close');
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
}

.modal-content div {
	margin-top: 3%;
	font-weight: 800;
	font-size: 40px;
	margin-bottom: 10%;
}

.go-login-button {
	background-color: #369261;
	border-radius: 20px;
	padding: 10px;
	color: white;
	font-weight: 700;
	font-size: 30px;
}

.go-login-button:hover {
	background-color: #246140;
}
</style>
