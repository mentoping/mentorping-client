import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLikeStore = defineStore('likeStore', () => {
	const questionLike = ref(['1', '21', '22']);

	return {
		questionLike,
	};
});
