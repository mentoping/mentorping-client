import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLikeStore = defineStore('likeStore', () => {
	const questionLike = ref(['1']);
	const mentoringLike = ref(['1']);

	return {
		questionLike,
		mentoringLike,
	};
});
