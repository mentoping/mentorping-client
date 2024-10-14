<template>
	<div class="sidebar-container">
		<div class="basic-title">MyPage</div>
		<div class="mypage-category">
			<p>프로필</p>
			<router-link
				to="/mypage"
				class="link-item"
				:class="{ active: currentRoute === '/mypage' }"
			>
				<i class="fa-solid fa-user"></i>&nbsp;&nbsp;멘티 프로필
			</router-link>
			<router-link
				to="/mypage/mentor"
				class="link-item"
				:class="{ active: currentRoute === '/mypage/mentor' }"
			>
				<i class="fa-solid fa-user-tie"></i>&nbsp;&nbsp;멘토 프로필
			</router-link>
		</div>

		<div class="mypage-category">
			<p>채팅</p>
			<div><i class="fa-solid fa-comments"></i>&nbsp;&nbsp;채팅</div>
		</div>

		<div class="mypage-category">
			<p>내 목록</p>
			<router-link
				to="/mypage/like-question"
				class="link-item"
				:class="{ active: currentRoute === '/mypage/like-question' }"
				><i class="fa-solid fa-heart"></i>&nbsp;&nbsp;좋아요한 질문</router-link
			>
			<router-link
				to="/mypage/like-mentoring"
				class="link-item"
				:class="{ active: currentRoute === '/mypage/like-mentoring' }"
				><i class="fa-solid fa-heart"></i>&nbsp;&nbsp;좋아요한
				멘토링</router-link
			>
			<div>
				<i class="fa-solid fa-thumbtack"></i>&nbsp;&nbsp;지원중인 멘토링
			</div>
			<div><i class="fa-solid fa-question"></i>&nbsp;&nbsp;문의 내역</div>
		</div>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const currentRoute = computed(() => route.path); // 현재 경로
</script>

<style scoped>
.sidebar-container {
	background-color: #e8e8e8;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	width: 15%;
	height: 100%;
}

.basic-title {
	font-size: 20px;
	font-weight: 600;
	border-bottom: 1px solid #d3d1d1;
	padding: 15px;
	color: #369261;
}

.mypage-category {
	margin-top: 30px;
	width: 100%;
}

.mypage-category p {
	width: 100%;
	padding: 16px;
	color: #909090;
	font-weight: 500;
}

.mypage-category div {
	padding-left: 30px;
	margin-bottom: 32px;
	font-weight: 500;
}

.link-item {
	display: block;
	margin-bottom: 20px;
	font-weight: 500;
	text-decoration: none;
	color: black;
	margin-left: 20px;
	margin-right: 20px;
	padding: 10px;
}

.link-item.active {
	background-color: #3b946f; /* 활성화된 상태일 때의 배경 색상 */
	color: white;
	border-radius: 10px;
}
</style>
