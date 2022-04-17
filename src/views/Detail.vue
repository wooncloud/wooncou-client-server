<template>
  <div>
		<div class="common-title">
			<h1>{{post.title}}</h1>
		</div>
		<div class="common-container detail-post-container">
			<div class="coupang-partners-label text-center">이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</div>
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

  @media (min-width: 992px) {
		.detail-post-container > .ql-editor img {
			width: 50%;
		}
	}
</style>