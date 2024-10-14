<template>
	<div class="back-color">
		<div class="mypage-container">
			<MyPageSidebarComp></MyPageSidebarComp>
			<RouterView></RouterView>
		</div>
	</div>
</template>

<script setup>
import MyPageSidebarComp from '@/components/MyPageSidebarComp.vue';
</script>

<style scoped>
.back-color {
	background-color: #bcbcbc;
	width: 100vw;
	height: 90vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

.mypage-container {
	width: 97%;
	height: 95%;
	background-color: white;
	border-radius: 15px;
	display: flex;
	flex-direction: row;
}
</style>
