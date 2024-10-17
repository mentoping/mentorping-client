<template>
	<div class="modal-overlay" @click.self="closeModal">
		<div class="modal-content">
			<p>멘토링 지원</p>
			<div class="phone-num"></div>
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
	width: 40vw;
	height: 75vh;
}

.modal-content p {
	font-weight: 500;
	font-size: 30px;
	margin-bottom: 10%;
}
</style>
