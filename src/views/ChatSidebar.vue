<template>
	<aside class="sidebar">
		<div class="profile">
			<img src="https://via.placeholder.com/100" alt="Profile Picture" />
			<h3>{{ userName }}</h3>
		</div>
		<nav>
			<ul>
				<li class="section-title">프로필</li>
				<li class="menu-item"><i class="icon">👤</i> 멘티 프로필</li>
				<li class="menu-item"><i class="icon">👥</i> 멘토 프로필</li>
			</ul>
			<!-- 프로필과 멘토링 섹션 사이에 간격 추가 -->
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

		// 사용자의 이름을 가져오는 계산된 속성
		const userName = computed(() => {
			return userStore.user ? userStore.user.name : 'Guest';
		});

		return {
			userName,
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
}

.profile h3 {
	font-size: 18px;
	font-weight: bold;
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
	background: #ccc;
}

.menu-item:hover {
	background: #e0e0e0;
}

.icon {
	margin-right: 10px;
}

.menu-item i {
	font-size: 18px;
}

/* 프로필과 멘토링 섹션 사이에 간격을 주는 스타일 */
.section-separator {
	margin: 40px 0;
	width: 100%;
	height: 1px;
	background: #ddd;
}
</style>
