<template>
	<div class="post-list-container">
		<div class="post-list-controller bg-secondary text-white">
			컨트롤러
		</div>
		<div class="post-list-wrap">
			<div class="post-element" v-for="(post, index) in postList" :key="index">
				<a href="#" data-id="`${post._id}`" style="width:55%">{{post.title}}</a>
				<div style="width:35%">{{new Date(post.date).toLocaleDateString()}}</div>
				<div style="width:10%">{{post.deleted}}</div>
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
		}
	},
	methods: {
	},
	beforeCreate() {
		this.$axios.get('/api/post-list')
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
		padding: 4px 6px;
		border-bottom: 1px solid lightgray;
		background-color: whitesmoke;
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
	.post-element:last-child{
		border-bottom: 0;
	}
</style>