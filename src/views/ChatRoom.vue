<template>
	<div class="chat-room">
		<!-- 사이드바 -->
		<Sidebar />

		<!-- 채팅방 목록 -->
		<ChatRoomList @select-room="selectChatRoom" />

		<!-- 채팅창 -->
		<ChatWindow
			:room="selectedRoom"
			:roomId="selectedRoom.id"
			:roomName="selectedRoom.name"
		/>
	</div>
</template>

<script>
import Sidebar from './ChatSidebar.vue';
import ChatRoomList from './ChatRoomList.vue';
import ChatWindow from './ChatWindow.vue';
import { ref } from 'vue';

export default {
	name: 'ChatRoom',
	components: {
		Sidebar,
		ChatRoomList,
		ChatWindow,
	},
	setup() {
		const selectedRoom = ref({
			id: null,
			name: '',
			chatRoomNames: {},
		});

		// 채팅방 선택 시 호출되는 함수 (ChatRoomList에서만 이 함수를 통해 selectedRoom을 변경)
		const selectChatRoom = room => {
			selectedRoom.value = room; // 선택한 채팅방의 전체 정보를 전달
			console.log('selectedRoom updated:', selectedRoom.value);
		};

		return {
			selectedRoom,
			selectChatRoom,
		};
	},
};
</script>

<style scoped>
.chat-room {
	display: flex;
	height: 100vh;
}
</style>
