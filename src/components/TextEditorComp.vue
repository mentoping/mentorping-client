<template>
	<div class="editor-container">
		<QuillEditor
			theme="snow"
			ref="quillEditorRef"
			:value="content"
			@text-change="onEditorTextChange"
			:options="editorOptions"
			:style="{ minHeight: height + 'px' }"
		/>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import Quill from 'quill';

// 폰트 크기 옵션 등록
const Size = Quill.import('attributors/style/size');
Size.whitelist = ['small', 'large', 'huge'];
Quill.register(Size, true);

const props = defineProps({
	placeholder: {
		type: String,
		default: '',
	},
	height: {
		type: Number,
		default: 200,
	},
	modelValue: {
		type: String,
		default: '',
	},
});

const emit = defineEmits(['update:modelValue']);

const content = ref(props.modelValue);
const quillEditorRef = ref(null);

// Watch for changes in parent's modelValue and update local content
watch(
	() => props.modelValue,
	newValue => {
		if (newValue !== content.value) {
			content.value = newValue; // Update local content if parent's value changes
		}
	},
);

// Handle editor's text change event and update parent's modelValue
const onEditorTextChange = () => {
	if (quillEditorRef.value) {
		const editorContent = quillEditorRef.value.getHTML(); // Get HTML content from Quill editor
		emit('update:modelValue', editorContent);
	}
};

const editorOptions = {
	theme: 'snow',
	placeholder: props.placeholder,
	modules: {
		toolbar: [
			[{ size: ['small', 'large', 'huge'] }],
			['bold', 'italic', 'underline', 'strike'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ align: [] }],
			['link'],
		],
		clipboard: {
			matchers: [
				[
					'img',
					() => {
						// 이미지 태그를 제거하여 붙여넣기가 되지 않도록 처리
						return '';
					},
				],
			],
		},
	},
};
</script>

<style>
.ql-container {
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	border: 1px solid #e9e9e9;
}

.ql-toolbar {
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	border: 1px solid #e9e9e9;
}

.editor-container {
	margin: 20px auto;
	border-radius: 10px;
}
.ql-editor {
	max-height: none;
	overflow-y: visible;
}
/* 툴바 스타일 조정 */
.ql-toolbar.ql-snow {
	padding: 8px;
}
.ql-toolbar.ql-snow .ql-picker.ql-size {
	width: 98px;
}
.ql-toolbar.ql-snow .ql-picker.ql-size .ql-picker-label {
	font-size: 14px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
	content: attr(data-value) !important;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
	font-size: 12px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
	font-size: 16px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
	font-size: 18px;
}
/* 에디터 내용의 폰트 크기 스타일 */
.ql-size-small {
	font-size: 25px !important;
}
.ql-size-large {
	font-size: 35px !important;
}
.ql-size-huge {
	font-size: 50px !important;
}
.ql-editor {
	font-size: 25px !important;
}
</style>
