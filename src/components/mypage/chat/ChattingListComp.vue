<template>
	<div class="chat-list">
		<div class="search-bar">
			<p>유저이름</p>
			<input type="text" />
		</div>
		<div class="chatting-list">
			<ChattingListBoxComp></ChattingListBoxComp>
		</div>
	</div>
</template>

<script setup>
import ChattingListBoxComp from './ChattingListBoxComp.vue';
</script>

<style scoped>
.chat-list {
	height: 96%;
	width: 25%;
	background-color: white;
	margin-left: 1.5%;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
}

.search-bar {
	margin-top: 30px;
	padding-left: 30px;
	display: flex;
	flex-direction: column;
	color: #767676;
}

.search-bar input {
	margin-top: 10px;
	width: 90%;
	height: 40px;
	border-radius: 15px;
	border: 2px solid #cfcfcf;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	font-size: 20px;
	padding: 0px 10px;
	margin-bottom: 30px;
}

.chatting-list {
	height: auto;
	width: 100%;

	overflow-y: auto;
}
</style>
