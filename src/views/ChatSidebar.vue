<template>
	<aside class="sidebar">
		<div class="profile">
			<img :src="profileImageUrl" alt="Profile Picture" />
			<h3>{{ userName }}</h3>
		</div>
		<nav>
			<ul>
				<li class="section-title">프로필</li>
				<li class="menu-item"><i class="icon">👤</i> 멘티 프로필</li>
				<li class="menu-item"><i class="icon">👥</i> 멘토 프로필</li>
			</ul>
			<div class="section-separator"></div>
			<ul>
				<li class="section-title">멘토링</li>
				<li class="menu-item active"><i class="icon">💬</i> 채팅</li>
				<li class="menu-item"><i class="icon">❤️</i> Like</li>
				<li class="menu-item"><i class="icon">🔔</i> 알림함</li>
			</ul>
		</nav>
	</aside>
</template>

<script>
import { computed } from 'vue';
import { useUserStore } from '../stores/userStore';

export default {
	name: 'ChatSidebar',
	setup() {
		const userStore = useUserStore();
		const userName = computed(() =>
			userStore.user ? userStore.user.name : 'Guest',
		);
		const profileImageUrl = computed(() =>
			userStore.user
				? userStore.user.profileImageUrl
				: 'https://via.placeholder.com/100',
		);

		return {
			userName,
			profileImageUrl,
		};
	},
};
</script>

<style scoped>
.sidebar {
	width: 250px;
	background: #f5f5f5;
	padding: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	border-radius: 15px;
}

.profile {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
}

.profile img {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	margin-bottom: 10px;
	border: 2px solid #4caf50;
}

.profile h3 {
	font-size: 18px;
	font-weight: bold;
	color: #333;
	margin: 0;
}

nav ul {
	list-style: none;
	padding: 0;
	width: 100%;
}

.section-title {
	font-size: 14px;
	color: #aaa;
	margin: 15px 0 5px;
	text-align: left;
	padding-left: 10px;
	font-weight: bold;
}

.menu-item {
	display: flex;
	align-items: center;
	padding: 10px;
	cursor: pointer;
	border-radius: 5px;
	transition: background 0.3s;
}

.menu-item.active {
	background: #4caf50;
	color: white;
}

.menu-item:hover {
	background: #e0e0e0;
}

.icon {
	margin-right: 10px;
	font-size: 18px;
}

.section-separator {
	margin: 40px 0;
	width: 100%;
	height: 1px;
	background: #ddd;
}
</style>
