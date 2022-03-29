<template>
	<div class="post-list-container h-100">
		<div class="post-list-controller bg-secondary text-white">
			<button type="button" class="btn btn-primary btn-sm" @click="newPost">
				<i class="bi bi-plus"></i>
			</button>
			<input class="form-control form-control-sm" type="text" placeholder="search..." style="width: 150px;"
				@keyup="getSearchList" v-model="search">
		</div>
		<div class="post-list-wrap">
			<div class="post-element" v-for="(post, index) in postList" :key="index" :data-id="`${post._id}`">
				<a href="#" style="width:55%" @click="sendPostId($event, post._id)">{{post.title}}</a>
				<div style="width:35%">{{new Date(post.date).toLocaleDateString()}}</div>
				<span class="me-2 text-muted"><i class="bi bi-archive-fill" v-if="post.temp"></i></span>
				<div style="width:10%" class="form-check form-switch">
					<input class="form-check-input" type="checkbox" role="switch" :id="`deleted-${post._id}`" :checked="getPostDeleteCheck(post.deleted)" @change="setPostDeleteCheck">
					<label class="form-check-label" :for="`deleted-${post._id}`"></label>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "AdminPostList",
	data: () => {
		return {
			postList: null,
			search: "",
		}
	},
	methods: {
		getPostDeleteCheck: function(deleted) {
			return deleted === "Y" ? "checked": "";
		},
		setPostDeleteCheck: function(e) {
			const data = {
				id: e.target.closest(".post-element").dataset.id,
				deleted: e.target.checked ? "Y" : "N",
			}

			this.$axios.delete('/api/post', {data: data})
			.then(res => { 
				if (res.data.success) {
					this.$toast.success('변경이 완료되었습니다.')
				}
			})
			.catch(e => {console.log(e)})
		},
		getSearchList(e) {
			if(e.keyCode !== 13)
				return;

			if (this.search === "") {
				this.$axios.get('/api/post')
				.then(response => {
					this.postList = response.data.posts
				})
				.catch(e => {console.log(e)})
			} else {
				this.$axios.get(`/api/post?search=${this.search}`)
				.then(response => {
					this.postList = response.data.posts
				})
				.catch(e => {console.log(e)})
			}
		},
		sendPostId: function(e, id) {
			e.preventDefault();
			this.$emit('sendPostId', id)
		},
		newPost(e) {
			this.$emit('sendPostId', null)
		}
	},
	beforeCreate() {
		this.$axios.get('/api/post')
		.then(response => {
			this.postList = response.data.posts
		})
		.catch(e => {console.log(e)})
	}
}
</script>

<style>
	.post-list-container {
		border: 1px solid lightgray;
		border-radius: 4px;
	}

	.post-list-controller {
		padding: 8px 12px;
		border-bottom: 1px solid lightgray;
		background-color: whitesmoke;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.post-list-wrap {
		overflow: hidden auto;
	}

	.post-element {
		border-bottom: 1px solid lightgray;
		padding: 2px 4px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.post-element:nth-child(2n-1) {
		background-color: whitesmoke;
	}
</style>