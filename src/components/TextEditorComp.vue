<template>
	<div class="editor-container">
		<QuillEditor theme="snow" v-model="content" :options="editorOptions" />
	</div>
</template>

<script setup>
import { ref } from 'vue';

const content = ref('');
const editorOptions = {
	theme: 'snow', // 사용할 테마 선택 ('snow', 'bubble' 등)
	modules: {
		toolbar: [
			// 툴바의 구성 요소를 배열로 지정
			['bold', 'italic', 'underline', 'strike'], // 굵게, 기울임, 밑줄, 취소선
			[{ list: 'ordered' }, { list: 'bullet' }], // 리스트 (순서있는/순서없는)
			[{ header: [1, 2, 3, false] }], // 헤더 크기
			[{ align: [] }], // 텍스트 정렬 (좌, 우, 가운데)
			['link', 'image', 'video', 'code-block'], // 링크, 이미지, 비디오 추가
			['clean'], // 포맷 초기화
		],
	},
};
</script>

<style scoped>
.editor-container {
	width: 70%;
	margin: 20px auto 30 px auto;
}

.ql-editor {
	min-height: 600px;
	max-height: 100vh;
	overflow-y: hidden;
}
</style>
