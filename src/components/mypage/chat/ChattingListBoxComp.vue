<template>
	<div class="chatlist-box">
		<img
			src="https://picsum.photos/200/300"
			alt="Profile"
			class="profile-pic"
		/>
		<div class="chat-info">
			<div class="chat-header">
				<span class="chat-name">커비</span>
				<span class="chat-time">2024.09.29 11:40</span>
			</div>
			<div class="chat-message">
				안녕하세요. 메토링 관련하여 질문할 점이 있어...
			</div>
		</div>
		<div class="notification-badge">2</div>
	</div>
</template>

<script setup></script>

<style scoped>
.chatlist-box {
	width: 100%;
	height: 90px;
	display: flex;
	align-items: center;
	padding: 10px;
	border-bottom: 1px solid #ddd;
	border-top: 1px solid #ddd;
}

.profile-pic {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-right: 10px;
}

.chat-info {
	flex-grow: 1;
}

.chat-header {
	display: flex;
	justify-content: space-between;
	font-weight: bold;
}

.chat-time {
	color: #888;
	font-size: 0.85em;
	margin-right: 20px;
}

.chat-message {
	color: #666;
	font-size: 0.9em;
}

.notification-badge {
	background-color: #f00;
	color: #fff;
	font-size: 0.8em;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
