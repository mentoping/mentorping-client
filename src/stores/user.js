//src/stores/user.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
	const user = ref(null);
	const isLoggedIn = ref(false);

	const setUser = userData => {
		user.value = userData;
		isLoggedIn.value = true;
	};

	const resetUser = () => {
		user.value = null;
		isLoggedIn.value = false;
	};

	return {
		user,
		isLoggedIn,
		setUser,
		resetUser,
	};
});
