<template>
  <div>
		<div class="common-title">
			<h1>{{post.title}}</h1>
		</div>
		<div class="common-container detail-post-container">
			<div id="postContent" class="ql-editor"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Detail",
	data() {
		return{
			post: {}
		}
	},
	beforeCreate() {
		const id = this.$route.params.id;

		this.$axios.get(`/api/post/${id}`)
		.then(res => {
			this.post = res.data.posts;
			document.getElementById("postContent").innerHTML = this.post.content;
		})
		.catch(() => {
			this.$swal({
				icon: "error",
				title: "오류",
				text: "관리자에게 문의해주세요.",
			});
		});
	},
}
</script>

<style>
	.detail-post-container > .ql-editor img {
		width: 100%;
	}
</style>