<template>
	<div class="modal-overlay" @click.self="closeModal">
		<div class="modal-content">
			<p>멘토링 지원</p>
			<div class="phone-num">
				<p>연락 가능한 연락처(수락 시에만 멘토에게 공개됩니다.)</p>
				<input type="text" class="phone-input" />
			</div>
			<div class="phone-num">
				<p>연락 가능한 연락처(수락 시에만 멘토에게 공개됩니다.)</p>
				<textarea name="" id="" class="phobu"></textarea>
			</div>
			<div class="foot-button">
				<button>제출</button>
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
	width: 35vw;
	height: 75vh;
}

.modal-content > p {
	padding: 0px 30px;
	font-weight: 500;
	font-size: 30px;
}

.phone-num {
	margin-top: 50px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0px 30px;
}

.phone-num p {
	font-size: 18px;
	color: rgb(167, 167, 167);
}

.phone-num input {
	margin-top: 0px;
	height: 40px;
	width: 100%;
	border-radius: 5px;
	border: 1px solid rgba(128, 128, 128, 0.548);
}

.phobu {
	height: 30vh;
	border-radius: 5px;
	border: 1px solid rgba(128, 128, 128, 0.548);
}

.foot-button {
	margin-top: 50px;
	display: flex;
	flex-direction: column;
	padding: 0px 30px;
	align-items: end;
}

.foot-button button {
	width: 100px;
	height: 35px;
	border-radius: 15px;
	background-color: #3b946f;
	color: white;
	font-weight: 500;
	font-size: 15px;
	text-align: center;
	border: none;
}
</style>
