<template>
  <div>
		<div class="common-title">
			<h1>{{post.title}}</h1>
		</div>
		<div class="common-container detail-post-container">
			<div class="coupang-partners-label text-center">
				<p>쿠팡 파트너스 활동의 일환으로 수익이 발생할 수 있습니다. 하지만, 구매자에게 추가 비용이 발생하지는 않습니다.</p>
				<p>또한, 상품 가격은 시간에 따라 변동이 있을 수 있습니다.</p>
			</div>
			<div id="postContent" class="ql-editor"></div>
		</div>
	</div>
</template>
<script>
export default {
	name: "Detail",
	metaInfo: {
    title: '추천 & 가이드 & 팁 컬렉션',
    titleTemplate: '운쿠 :: %s',
    link: [
      {rel: 'canonical', href: 'https://wooncou.com/detail/'}
    ]
  },
	data() {
		return{
			post: {},
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