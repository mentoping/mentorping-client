<template>
	<div class="center-container">
		<div class="hash-title">
			해시태그 추가<span
				><i class="fa-regular fa-square-plus" style="color: #167f15"></i
			></span>
		</div>
		<div class="tag-counter">({{ tags.length }}/3)</div>
		<input
			type="text"
			class="hash-input"
			:placeholder="
				tags.length >= 3
					? '해시태그는 3개까지만 추가할 수 있습니다'
					: '해시태그명을 입력하고 Enter키를 누르세요'
			"
			@keyup.enter="addTag"
			v-model="inputValue"
			:disabled="tags.length >= 3"
		/>
		<div class="tags-container">
			<div v-for="(tag, index) in tags" :key="tag" class="tag-box">
				#{{ tag }}
				<span class="delete-tag" @click="removeTag(index)">✖</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
	modelValue: {
		type: Array,
		default: () => [],
	},
});

const emit = defineEmits(['update:modelValue']);

const inputValue = ref('');
const tags = ref([...props.modelValue]);

// props.modelValue가 변경될 때 tags 업데이트
watch(
	() => props.modelValue,
	newTags => {
		tags.value = [...newTags];
	},
	{ immediate: true },
);

// 새로운 해시태그를 추가하는 함수
function addTag() {
	if (inputValue.value.trim() !== '' && tags.value.length < 3) {
		tags.value.push(inputValue.value.trim());
		inputValue.value = '';
		emit('update:modelValue', tags.value);
	}
}

// 해시태그를 제거하는 함수
function removeTag(index) {
	tags.value.splice(index, 1);
	emit('update:modelValue', tags.value);
}
</script>

<style scoped>
.center-container {
	margin-top: 100px;
	display: flex;
	flex-direction: column; /* 세로 방향으로 정렬 */
	justify-content: center; /* 가로 중앙 정렬 */
	align-items: center; /* 세로 중앙 정렬 */
}

.hash-input {
	width: 60vw;
	padding: 1rem;
	font-size: 20px;
	border: none;
	text-align: center;
	font-weight: 800;
	outline: none; /* 클릭 시 테두리 제거 */
	margin-top: 10px; /* 상단 마진을 제거합니다 */
}

.tags-container {
	margin-top: 20px;
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
}

.tag-box {
	background-color: #369261;
	padding: 0.5rem 1rem;
	border-radius: 20px;
	font-size: 1rem;
	font-weight: bold;
	color: white;
	display: flex;
	align-items: center;
}

.delete-tag {
	margin-left: 10px;
	cursor: pointer;
	font-size: 1.2rem;
	color: black;
}

.delete-tag:hover {
	color: red;
}

.hash-title {
	margin-bottom: 10px; /* 하단 마진을 줄입니다 */
	font-weight: 600;
	font-size: 20px;
}

.hash-title span {
	padding-left: 5px;
}

.tag-counter {
	margin-top: 10px;
	font-weight: bold;
	font-size: 18px;
}
</style>
