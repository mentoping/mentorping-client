<template>
	<ul class="head-container">
		<li class="logo">
			<RouterLink to="/">로고</RouterLink>
		</li>
		<div class="center-menu">
			<li>
				<RouterLink to="/question">질문</RouterLink>
			</li>
			<li>
				<RouterLink to="/mentoring">멘토링</RouterLink>
			</li>
			<li>
				<RouterLink to="/admin">관리</RouterLink>
			</li>
		</div>
		<div class="right-menu">
			<li>알림</li>
			<li>
				<RouterLink to="login">로그인</RouterLink>
			</li>
		</div>
	</ul>
</template>

<script setup></script>

<style scoped>
.head-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 10vh;
	background-color: #333;
	color: white;
	z-index: 1000;
	display: flex;
	align-items: center;
	justify-content: space-between; /* 양 끝에 로고와 오른쪽 메뉴 배치 */
	list-style-type: none;
	padding: 0 40px; /* 좌우에 패딩 추가 */
}

.logo {
	margin-right: auto; /* 로고를 왼쪽으로 고정 */
}

.center-menu {
	display: flex;
	justify-content: center;
	flex-grow: 1; /* 중앙 메뉴가 가운데에 위치하도록 */
}

.center-menu li {
	margin: 0 60px; /* 중앙 메뉴 간 간격 */
}

.right-menu {
	display: flex;
}

.right-menu li {
	margin-left: 20px; /* 오른쪽 메뉴 간 간격 */
}
</style>
