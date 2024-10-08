<template>
	<div class="chat-list">
		<input v-model="search" placeholder="유저 이름" />
		<ul>
			<li
				v-for="(room, index) in filteredChatRooms"
				:key="index"
				@click="selectRoom(room)"
				:class="{ active: selectedRoomId === room.id }"
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
} from 'firebase/firestore'; //

export default {
	name: 'ChatRoomList',
	emits: ['select-room'],
	setup(props, { emit }) {
		const search = ref('');
		const chatRooms = ref([]);
		const selectedRoomId = ref(null); // 현재 선택된 채팅방 ID를 저장할 변수

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
				const updatedRooms = []; // 변경된 채팅방 목록을 저장할 임시 배열

				// chatRooms.value = [];
				querySnapshot.forEach(doc => {
					const roomData = { id: doc.id, ...doc.data(), unreadMessages: 0 }; // 초기화

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

					// 메시지의 읽음 상태를 확인하고 업데이트

					onSnapshot(unreadMessagesQuery, messagesSnapshot => {
						roomData.unreadMessages = messagesSnapshot.size;

						// 기존에 존재하는 채팅방을 업데이트하거나 추가
						const existingRoomIndex = updatedRooms.findIndex(
							room => room.id === roomData.id,
						);
						if (existingRoomIndex !== -1) {
							updatedRooms[existingRoomIndex] = roomData; // 이미 존재하는 경우 업데이트
						} else {
							updatedRooms.push(roomData); // 새로 추가된 채팅방
						}

						// 채팅방 목록을 정렬하여 업데이트 (lastMessageTimestamp 기준)
						chatRooms.value = [...updatedRooms].sort((a, b) => {
							return b.lastMessageTimestamp - a.lastMessageTimestamp;
						});
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

		// 방 선택 시 호출되는 함수
		const selectRoom = room => {
			selectedRoomId.value = room.id; // 선택된 방 ID 업데이트
			emit('select-room', room); // 선택된 방 정보를 부모 컴포넌트로 전달
		};

		return {
			search,
			chatRooms,
			filteredChatRooms,
			formatTimestamp,
			formatLastMessage,
			userId,
			// selectedRoomIndex,
			selectRoom,
			selectedRoomId, // selectedRoomId를 반환해야 합니다.
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
