<template>
	<div class="profile-container">
		<div class="mypage-header">
			<i class="fa-solid fa-comments"></i>&nbsp;&nbsp;채팅
		</div>
		<div class="content-body">
			<ChattingListComp></ChattingListComp>
			<ChattingRoomComp></ChattingRoomComp>
		</div>
	</div>
</template>

<script setup>
import ChattingListComp from './chat/ChattingListComp.vue';
import ChattingRoomComp from './chat/ChattingRoomComp.vue';
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
	background-color: #e8f0eb; /* 배경 색상 */
	border-bottom-right-radius: 10px;
	display: flex;
	align-items: center; /* 자식 요소들을 가로로 가운데 정렬 */
}

.content-body::-webkit-scrollbar {
	display: none; /* 스크롤바 숨기기 */
}
</style>
