<template>
	<div class="dropdown-wrapper">
		<div class="dropdown-button" @click="toggleDropdown">
			<span class="icon">&#x25BC;</span>
			<!-- 내려가는 화살표 아이콘 -->
			<span class="label">{{ selectedCategoryLabel }}</span>
			<!-- 선택된 카테고리 텍스트 -->
		</div>
		<div v-if="isDropdownOpen" class="dropdown-menu">
			<ul>
				<li
					v-for="category in categories"
					:key="category.value"
					@click="selectCategory(category)"
				>
					{{ category.label }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useCategoryStore } from '@/stores/category';

const categoryStore = useCategoryStore();

const isDropdownOpen = ref(false);
const selectedCategoryLabel = ref('대분류');

const categories = categoryStore.categories.filter(
	category => category.value !== 'ALL',
);

function toggleDropdown() {
	isDropdownOpen.value = !isDropdownOpen.value;
}

function selectCategory(category) {
	categoryStore.setSelectedCategory(category.value);
	selectedCategoryLabel.value = category.label;
	isDropdownOpen.value = false;
}
</script>

<style scoped>
.dropdown-wrapper {
	position: relative;
}

.dropdown-button {
	display: inline-flex;
	align-items: center;
	padding: 1vh 2vh;
	border-radius: 50px;
	background-color: #e6e6e6;
	cursor: pointer;
}

.icon {
	margin-right: 0.5rem;
	font-size: 10px;
}

.label {
	font-weight: bold;
}

.dropdown-menu {
	position: absolute;
	top: 100%;
	left: 0;
	background-color: white;
	border: 1px solid #ccc;
	border-radius: 8px;
	margin-top: 0.5vh;
	padding: 1vh;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	width: 11.5vw;
}

.dropdown-menu ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

.dropdown-menu li {
	padding: 0.5vh 1vh;
	cursor: pointer;
}

.dropdown-menu li:hover {
	background-color: #f0f0f0;
}
</style>
