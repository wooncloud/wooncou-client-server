<template>
	<div class="post-detail-container h-100">
		<div class="post-detail-controller bg-secondary text-white">
			<div class="input-group coupang-api-controller w-50">
				<select class="form-select form-select-sm" v-model="coupang.type">
					<option value="url">URL</option>
					<option value="search">검색</option>
				</select>
				<input class="form-control form-control-sm w-50" type="text" placeholder="쿠팡 파트너스 검색..." v-model="coupang.value">
				<input type="button" value="검색" class="btn btn-sm btn-dark" @click="coupangSearch()">
			</div>
			<div class="btn-group editor-controller" role="group" aria-label="Basic mixed styles example">
				<button type="button" class="btn btn-sm btn-light" @click="addTitleImage"><i class="bi bi-image"></i> 대표이미지</button>
				<button type="button" class="btn btn-sm btn-light" @click="addTag"><i class="bi bi-tag-fill"></i> 태그</button>
				<button type="button" class="btn btn-sm btn-warning" @click="postTempSave"><i class="bi bi-save2"></i> 임시저장</button>
				<button type="button" class="btn btn-sm btn-primary" @click="postSave"><i class="bi bi-send-fill"></i> 발행</button>
			</div>
		</div>
		<div class="post-detail-title">
			<input type="text" class="post-title" placeholder="제목을 입력하세요" v-model="post.title">
		</div>
		<div class="post-detail-editor">
			<quill-editor
				ref="editor"
				v-model="post.content"
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
			},
			post: {
				id: "",
				title: "",
				content:"",
				author: "",
				tags: [],
			},
			coupang: {
				type: "url",
				value: ""
			}
		}
	},
	props: {
		selectedPostId: String,
	},
	watch: {
		selectedPostId() {
			if(this.post.title || this.post.content) {
				if (!confirm("작성중인 글이 모두 지워집니다.\n계속 하시겠습니까?")) return;
			}

			if (!this.selectedPostId) {
				this.post = {
					id: "",
					title: "",
					content:"",
					author: "",
					tags: [],
				}
			} else {
				this.$axios.get(`/api/admin/post?id=${this.selectedPostId}`)
				.then(res => { this.post = res.data.posts; })
				.catch(e => { console.log(e); })
			}
		}
	},
	beforeCreate() {
	},
	methods: {
		onEditorBlur(editor) {
			// console.log('editor blur!', editor)
		},
		onEditorFocus(editor) {
			// console.log('editor focus!', editor)
		},
		onEditorReady(editor) {
			// console.log('editor ready!', editor)
		},
		coupangSearch: function() {
			const httpRegex = new RegExp(/^http\w:\/\//, 'ig');
			if(this.coupang.type === "search" && httpRegex.test(this.coupang.value)) {
				this.coupang.type = "url";
			}

			this.$emit("sendCoupangApiData", this.coupang);
		},
		getModalHtml(html) {
			this.post.content += html;
		},
		getTags(tags) {
			this.post.tags = tags;
		},
		getPostDate() {
			// title sanitize
			this.post.title = this.$sanitize(this.post.title);
			if (!this.post.title) {
				this.$swal(this.$swalt("warning", "제목을 입력하세요."))
				return false;
			} else if (!this.post.content) {
				this.$swal(this.$swalt("warning", "내용을 입력하세요."))
				return false;
			}
			return true;
		},
		postTempSave() {
			if(!this.getPostDate()) return;
			this.post.author = localStorage.getItem('userName');

			if(this.post._id) {
				this.$axios.put(`/api/post/temp`, this.post)
				.then(res => { this.$swal(this.$swalt("success", "임시저장 되었습니다.")) })
				this.$swal(this.$swalt("", ""))
				.catch((e) => { 
					console.error(e)
					this.$swal(this.$swalt("error", "임시저장이 실패했습니다."))
				});
			} else {
				this.$axios.post(`/api/post/temp`, this.post)
				.then(res => { this.$swal(this.$swalt("success", "임시저장 되었습니다.")) })
				.catch((e) => { 
					console.error(e)
					this.$swal(this.$swalt("error", "임시저장이 실패했습니다."))
				});
			}
		},
		postSave() {
			if(!this.getPostDate()) return;
			this.post.author = localStorage.getItem('userName');

			if(this.post._id) {
				this.$axios.put(`/api/post`, this.post)
				.then(res => { this.$swal(this.$swalt("success", "발행 되었습니다.")) })
				.catch((e) => { 
					console.error(e)
					this.$swal(this.$swalt("error", "발행에 실패했습니다."))
				});
			} else {
				this.$axios.post(`/api/post`, this.post)
				.then(res => { this.$swal(this.$swalt("success", "발행 되었습니다.")) })
				.catch((e) => { 
					console.error(e)
					this.$swal(this.$swalt("error", "발행에 실패했습니다."))
				});
			}
		},
		addTag() {
			this.$emit("editPostTags", this.post.tags);
		},
		addTitleImage() {
			this.$swal({
				title: '대표이미지 등록',
				text: "등록할 이미지의 url을 입력하세요.",
				imageUrl: this.post.title_image,
				imageHeight: "400px",
				input: 'text',
				showCancelButton: true,
			})
			.then((result) => {
				if (result.isConfirmed) {
					const tempImg = result.value;
					this.$swal({
						title: '이미지 확인',
						text: '이 이미지가 맞으면 OK를 눌러주세요.',
						imageUrl: tempImg,
						imageHeight: "400px",
						showCancelButton: true,
					})
					.then((result) => {
						if (result.isConfirmed) {
							this.post.title_image = tempImg;
							this.$swal(this.$swalt("success", "반영 되었습니다."))
						}
					});
				};
			});
		},
	}
}
</script>

<style>
	.post-detail-container {
		border: 1px solid lightgray;
		border-radius: 4px;
	}

	.post-detail-controller {
		padding: 8px 12px;
		border-bottom: 1px solid lightgray;
		background-color: whitesmoke;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.coupang-api-controller {
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

	.ql-container {
		height: calc( 100% - 68px ) !important;
	}
</style>