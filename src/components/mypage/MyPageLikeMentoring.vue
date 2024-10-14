<template>
	<div class="profile-container">
		<div class="mypage-header">
			<i class="fa-solid fa-heart"></i>&nbsp;&nbsp;좋아요한 멘토링
		</div>
		<div class="content-body">
			<div class="section">
				<div class="tilte-header">좋아요 목록</div>
				<div class="description">좋아요한 멘토링들을 확인해보세요</div>
				<div class="question-list">
					<MentoringCardComp></MentoringCardComp>
					<MentoringPagingComp></MentoringPagingComp>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import MentoringCardComp from '../MentoringCardComp.vue';
import MentoringPagingComp from '../MentoringPagingComp.vue';
</script>

<style scoped>
.profile-container {
	width: 85%;
	margin: 0 auto; /* 가로 가운데 정렬 */
	display: flex;
	flex-direction: column;
}

.mypage-header {
	font-size: 20px;
	font-weight: 600;
	border-bottom: 1px solid #d3d1d1;
	padding: 15px;
}

.content-body {
	flex: 1;
	overflow: auto;
	background-color: #f5f7f6; /* 배경 색상 */
	border-radius: 10px; /* 둥근 모서리 */
	display: flex;
	flex-direction: column;
	align-items: center; /* 자식 요소들을 가로로 가운데 정렬 */
	padding-top: 30px;
}

.content-body::-webkit-scrollbar {
	display: none; /* 스크롤바 숨기기 */
}

.tilte-header {
	font-size: 45px;
	font-weight: 600;
	display: flex;
	align-items: center;
	margin-top: 50px;
}

.description {
	color: #969696;
	margin-top: 5px;
	font-size: 16px;
}

.question-list {
	margin-top: 30px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-items: center;
}

.section {
	width: 1000px;
}
</style>
