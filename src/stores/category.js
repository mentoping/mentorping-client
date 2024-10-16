// stores/category.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCategoryStore = defineStore('category', () => {
	const categories = ref([
		{ label: '전체', value: 'ALL' },
		{ label: 'IT/SW', value: 'ITSW' },
		{ label: '디자인', value: 'DESIGN' },
		{ label: '마케팅', value: 'MARKETING' },
		{ label: '금융/은행/보험', value: 'FINANCE' },
		{ label: 'MD/상품기획', value: 'MD' },
		{ label: '광고/홍보', value: 'ADVERTISE' },
		{ label: '생산/제조', value: 'PRODUCTION' },
		{ label: '미디어', value: 'MEDIA' },
		{ label: '기타', value: 'ETC' },
	]);

	const selectedCategory = ref('ALL');

	// category.value로 설정되도록 수정
	function setSelectedCategory(value) {
		selectedCategory.value = value;
	}

	// splitCategories는 카테고리를 두 줄로 나누기 위해 계산된 배열
	const splitCategories = computed(() => {
		const rowCount = 1; // 카테고리를 나눌 행의 수
		const perRow = Math.ceil(categories.value.length / rowCount);
		const rows = [];
		for (let i = 0; i < categories.value.length; i += perRow) {
			rows.push(categories.value.slice(i, i + perRow));
		}
		return rows;
	});

	return {
		categories,
		selectedCategory,
		setSelectedCategory,
		splitCategories,
	};
});
