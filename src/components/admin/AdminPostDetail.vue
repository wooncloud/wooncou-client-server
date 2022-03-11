<template>
	<div class="post-detail-container">
		<div class="post-detail-controller bg-secondary text-white">
			<div class="coupang-api-controller">
				api 자리
			</div>
			<div class="btn-group editor-controller" role="group" aria-label="Basic mixed styles example">
				<button type="button" class="btn btn-sm btn-warning"><i class="bi bi-save2"></i> 임시저장</button>
				<button type="button" class="btn btn-sm btn-primary"><i class="bi bi-plus"></i> 저장</button>
			</div>
		</div>
		<div class="post-detail-title">
			<input type="text" class="post-title" placeholder="제목을 입력하세요">
		</div>
		<div class="post-detail-editor">
			<quill-editor
				ref="editor"
				v-model="content"
				:options="editorOption"
				@blur="onEditorBlur($event)"
				@focus="onEditorFocus($event)"
				@ready="onEditorReady($event)"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: "AdminPostDetail",
	data: () => {
		return {
			editorOption: {
				theme: 'snow',
				placeholder: '내용을 입력하세요...',
				readOnly: true,
			}
		}
	},
	beforeCreate() {

	},
	methods: {
		onEditorBlur(editor) {
			console.log('editor blur!', editor)
		},
		onEditorFocus(editor) {
			console.log('editor focus!', editor)
		},
		onEditorReady(editor) {
			console.log('editor ready!', editor)
		}
	},
	components: {

	}
}
</script>

<style>
	.post-detail-container {
		border: 1px solid lightgray;
		border-radius: 4px;
		height: 500px;
	}

	.post-detail-controller {
		padding: 8px 12px;
		border-bottom: 1px solid lightgray;
		background-color: whitesmoke;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.post-title {
		padding: 0;
		margin: 5px 10px;
		border: 0;
		border-bottom: 1px solid lightgray;
		height: 40px;
		width: calc( 100% - 20px );
		color: #2c3e50;
	}
	.post-title:focus {
		border-bottom: 2px solid #1abc9c;
		color: #1abc9c;
		font-weight: bold;
		font-size: large;
	}

	.post-detail-editor {
		height: calc( 100% - 100px );
	}

	.quill-editor {
		overflow: hidden;
		height: 100%;
	}

	.quill-editor svg {
		margin: inherit !important;
		top: inherit;
		left: inherit;
		position: relative;
	}

	.ql-editor {
		height: calc( 100% - 42px ) !important;
	}
</style>