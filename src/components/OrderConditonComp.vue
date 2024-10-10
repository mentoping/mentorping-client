<template>
	<div class="select-container">
		<select v-model="selectedOrder">
			<option value="createdAt">최신순</option>
			<option value="likeCount">인기순</option>
		</select>
		<span class="select-arrow">▼</span>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useQuestionStore } from '@/stores/questionAndMentoringStore';

const questionStore = useQuestionStore();
const selectedOrder = ref(questionStore.orderCondition);

// 선택된 정렬 조건이 변경될 때 store의 orderCondition 업데이트
watch(selectedOrder, newOrder => {
	questionStore.orderCondition = newOrder;
});
</script>

<style scoped>
.select-arrow {
	position: absolute;
	top: 50%;
	right: 8px;
	transform: translateY(-50%);
	pointer-events: none;
	font-size: 1em;
	color: #888;
}

select {
	width: auto;
	font-size: 1.2em;
	padding: 12px 40px 12px 12px;
	border-radius: 12px;
	border: 1px solid #ccc;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease;
	appearance: none;
}

select:hover {
	border-color: #888;
	box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

select:focus {
	outline: none;
	border-color: #005fcc;
	box-shadow: 0 0 0 3px rgba(0, 95, 204, 0.3);
}

select::-ms-expand {
	display: none;
}

.select-container {
	position: relative;
	display: inline-block;
	text-align: right;
	margin-left: auto;
	margin-right: 20px;
}
</style>
