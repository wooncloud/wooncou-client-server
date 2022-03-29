<template>
	<div class="modal" tabindex="-1" style="display:block;" v-if="modalOpen">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title"><i class="bi bi-tags-fill"></i> 태그 편집</h5>
					<button type="button" class="btn-close" @click="closeModal"></button>
				</div>
				<div class="modal-body">
					<div class="tag-input">
						<input type="text" 
						class="form-control form-control-sm" 
						placeholder="추가할 태그를 입력하세요...."
						v-model="tagInputValue"
						@keyup="insertTag"
						>
					</div>
					<div class="d-flex justify-content-between">
						<div class="badge bg-primary text-wrap"><i class="bi bi-tags"></i> 전체 태그</div>
						<div class="badge bg-secondary text-wrap"><i class="bi bi-tag-fill"></i> 포스트에 포함된 태그</div>
					</div>
					<div class="d-flex justify-content-between">
						<div class="tags-container">
							<span class="tag-item badge rounded-pill bg-primary" 
							v-for="(tag, i) in tags" :key="i" :data-id="`${tag._id}`" 
							@click="addTag">
								{{tag.tag_name}}
							</span>
						</div>
						<div id="importedTags" class="tags-container">
							<span class="tag-item badge rounded-pill bg-secondary" v-for="(tag, i) in importTags" :key="i" :data-id="`${tag._id}`">
								{{tag.tag_name}}&nbsp;<a href="#" @click="removeTag"><i class="bi bi-x-circle-fill"></i></a>
							</span>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" @click="closeModal">취소</button>
					<button type="button" class="btn btn-primary" @click="saveTags">태그 저장</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			modalOpen: false,
			tags: [],
			importTags: [],
			tagInputValue: "",
		}
	},
	methods: {
		openModal: function(tags) {
			// 태그 목록 가져오기
			this.importTags = tags;
			this.getTagList();
			this.modalOpen = true;
		},
		closeModal: function() {
			this.tagInputValue = "";
			this.tags = [];
			this.importTags = [];
			this.modalOpen = false;
		},
		getTagList: function() {
			this.$axios.get("/api/tags")
			.then(res => {
				if(!res.data.success) {
					this.$toast.error(res.data.message); return;
				}
				this.tags = res.data.tags;
			})
			.catch(e => {console.log(e);})
		},
		insertTag: function(e) { // 태그를 새로 추가
			if (e.keyCode === 13) {
				const data = {
					tag_name: this.tagInputValue
				}
				this.$axios.post("/api/tags", data)
				.then(res => {
					if (res.data.message){
						this.$toast.error(res.data.message);
					} else {
						this.$toast.success("태그가 추가 되었습니다.");
						this.tagInputValue = "";
						this.getTagList();scroll
					}
				})
				.catch(e => {console.log(e);})
			}
		},
		addTag: function(e) {
			const addTag = {
				_id: e.target.dataset.id,
				tag_name: e.target.innerText
			}
			if(!this.importTags.find(emt => emt._id === e.target.dataset.id )) {
				this.importTags.push(addTag);
			}
		},
		removeTag: function(e) {
			this.importTags = this.importTags.filter(emt => emt._id !== e.target.closest(".tag-item").dataset.id);
		},
		saveTags: function() {
			this.$emit('sendTags', this.importTags);
			this.closeModal();
		}
	}
}
</script>

<style>
	.tag-input {
		margin-bottom: 10px;
	}
	.tags-container {
		padding: 10px;
		margin-top: 10px;
		border: 1px solid lightgray;
		border-radius: 4px;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		justify-content: flex-start;
		align-items: flex-start;
		width: 49%;
		height: 200px;
		overflow: auto;
	}
	.tag-item {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: medium;
		margin: 2px 3px;
		cursor: pointer;
	}
	.tag-item:hover {
		color: var(--bs-warning);
	}
</style>