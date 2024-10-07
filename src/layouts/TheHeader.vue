<template>
	<ul class="head-container">
		<li class="logo">
			<RouterLink to="/">
				<img src="@/assets/Mlogo.jpg" alt="산모양" />
				<span>Mentain</span>
			</RouterLink>
		</li>
		<div class="center-menu">
			<li>
				<RouterLink to="/question">질문</RouterLink>
			</li>
			<li>
				<RouterLink to="/mentoring">멘토링</RouterLink>
			</li>
			<li>
				<RouterLink to="/inquiry">문의</RouterLink>
			</li>
			<li>
				<RouterLink to="/admin">관리</RouterLink>
			</li>
		</div>
		<div class="right-menu">
			<i class="fa-regular fa-bell"></i>
			<li>
				<template v-if="isLoggedIn">
					<RouterLink to="/mypage"><MyPageButton></MyPageButton></RouterLink>
				</template>
				<template v-else>
					<RouterLink to="/login">로그인</RouterLink>
				</template>
			</li>
		</div>
	</ul>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

import MyPageButton from '@/components/mypage/myPageButton.vue';

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);
</script>

<style scoped>
.head-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 10vh;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 40px;
	background-color: white;
	border-bottom: 1px solid #ccc;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
	display: flex;
	align-items: center;
}

.logo img {
	width: 35px;
	height: auto;
	margin-right: 10px;
	vertical-align: middle;
}

.logo span {
	font-size: 1.5rem;
	font-weight: bold;
	color: #333;
	vertical-align: middle;
}

.center-menu {
	display: flex;
	gap: 90px;
}

.center-menu li {
	font-size: 1rem;
	font-weight: 600;
}

.right-menu {
	display: flex;
	align-items: center;
	gap: 50px;
}

.right-menu i {
	font-size: 1.5rem;
	color: #333;
}

.right-menu li {
	font-size: 1rem;
}

ul,
ol,
li {
	list-style-type: none;
	padding: 0;
	margin: 0;
}

/* 반응형 미디어 쿼리 */
@media (max-width: 768px) {
	.head-container {
		flex-direction: column; /* 모바일 화면에서는 세로로 정렬 */
		height: auto;
		padding: 10px;
	}

	.logo {
		justify-content: center;
		margin-bottom: 10px;
	}

	.center-menu {
		flex-direction: column;
		gap: 20px;
	}

	.right-menu {
		justify-content: center;
		margin-top: 10px;
		gap: 20px;
	}
}

@media (max-width: 480px) {
	.head-container {
		padding: 10px;
	}

	.logo img {
		width: 30px;
	}

	.logo span {
		font-size: 1.2rem;
	}

	.center-menu {
		gap: 15px;
	}

	.right-menu i {
		font-size: 1.2rem;
	}
}
</style>
