<template>
	<div class="chat-list">
		<input v-model="search" placeholder="유저 이름" />
		<ul>
			<!-- <li v-for="(room, index) in filteredChatRooms" :key="index" @click="$emit('select-room', room.id)"
        :class="{ 'active': index === selectedRoomIndex }"> -->
			<li
				v-for="(room, index) in filteredChatRooms"
				:key="index"
				@click="$emit('select-room', room)"
			>
				<div class="room-info">
					<img src="https://via.placeholder.com/50" alt="User Icon" />
					<div class="room-details">
						<h4>
							{{ room.chatRoomNames[userId] || room.name }}
							<small class="timestamp">{{
								formatTimestamp(room.lastMessageTimestamp)
							}}</small>
						</h4>
						<!-- 마지막 메시지의 20글자까지만 표시하고 너무 긴 경우 "..." 추가 -->
						<p>{{ formatLastMessage(room.lastMessage) }}</p>
					</div>
					<span v-if="room.unreadMessages > 0" class="unread-count">{{
						room.unreadMessages
					}}</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../stores/userStore';
import { db } from '../firebaseConfig';
import {
	collection,
	query,
	onSnapshot,
	orderBy,
	where,
} from 'firebase/firestore'; // where를 import

export default {
	name: 'ChatRoomList',
	emits: ['select-room'],
	setup() {
		const search = ref('');
		const chatRooms = ref([]);
		const selectedRoomIndex = ref(null);

		// 현재 사용자 정보 가져오기
		const userStore = useUserStore();
		const userId = computed(() => (userStore.user ? userStore.user.id : null));

		// 날짜 및 시간 포맷팅 함수
		const formatTimestamp = timestamp => {
			if (!timestamp) return '';
			const date = new Date(timestamp);
			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const day = date.getDate().toString().padStart(2, '0');
			const hours = date.getHours().toString().padStart(2, '0');
			const minutes = date.getMinutes().toString().padStart(2, '0');
			return `${month}월 ${day}일 ${hours}시 ${minutes}분`;
		};

		// 마지막 메시지를 포맷팅하여 20글자까지만 표시
		const formatLastMessage = message => {
			if (!message) return '';
			return message.length > 20 ? message.slice(0, 20) + '...' : message;
		};

		// 채팅방 목록을 실시간으로 가져오기
		onMounted(() => {
			const roomsCollection = collection(db, 'rooms');
			const q = query(roomsCollection, orderBy('lastMessageTimestamp', 'desc'));

			onSnapshot(q, querySnapshot => {
				chatRooms.value = [];
				querySnapshot.forEach(doc => {
					const roomData = { id: doc.id, ...doc.data(), unreadMessages: 0 }; // 초기화

					chatRooms.value.push(roomData);

					// 각 방의 메시지에 대해 읽지 않은 메시지 수를 계산
					const messagesCollection = collection(
						db,
						'rooms',
						doc.id,
						'messages',
					);
					const unreadMessagesQuery = query(
						messagesCollection,
						where('isRead', '==', false),
						where('senderId', '!=', userId.value),
					);

					onSnapshot(unreadMessagesQuery, messagesSnapshot => {
						roomData.unreadMessages = messagesSnapshot.size;
						chatRooms.value = [
							...chatRooms.value.filter(room => room.id !== doc.id),
							roomData,
						];
					});
				});
			});
		});

		// 현재 사용자가 속한 채팅방만 필터링
		const filteredChatRooms = computed(() => {
			return chatRooms.value.filter(room => {
				return (
					room.receiverId === userId.value || room.senderId === userId.value
				);
			});
		});

		return {
			search,
			chatRooms,
			filteredChatRooms,
			formatTimestamp,
			formatLastMessage,
			userId,
			selectedRoomIndex,
		};
	},
};
</script>

<style scoped>
.chat-list {
	width: 300px;
	border-right: 1px solid #ccc;
	padding: 10px;
	background: #f9f9f9;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.chat-list input {
	width: 100%;
	padding: 10px;
	margin-bottom: 15px;
	border-radius: 20px;
	border: 1px solid #ddd;
	background-color: #f5f5f5;
}

.chat-list ul {
	list-style: none;
	padding: 0;
	margin: 0;
}

.chat-list li {
	display: flex;
	align-items: center;
	padding: 10px;
	border-radius: 10px;
	margin-bottom: 10px;
	cursor: pointer;
	transition: background 0.3s;
}

.chat-list li:hover,
.chat-list li.active {
	background: #ccc;
	/* 선택된 항목의 배경색 */
}

.room-info {
	display: flex;
	align-items: center;
	width: 100%;
}

.room-info img {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	margin-right: 15px;
}

.room-details {
	flex: 1;
}

.room-details h4 {
	display: flex;
	justify-content: space-between;
	font-size: 16px;
	margin: 0;
	color: #333;
}

.room-details p {
	font-size: 14px;
	color: #777;
	margin: 5px 0 0;
}

.timestamp {
	font-size: 12px;
	color: gray;
}

.unread-count {
	background: #ff4d4d;
	color: #fff;
	border-radius: 50%;
	padding: 5px 8px;
	font-size: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 10px;
}
</style>
