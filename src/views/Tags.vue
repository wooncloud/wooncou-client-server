<template>
	<div>
		<div class="common-title">
			<h1>🏷 게시물 태그 목록</h1>
			<p class="text-muted">게시물의 태그를 이용하여 원하는 상품을 찾을 수 있습니다.</p>
		</div>
		<div class="common-container">
			<div class="tags-wrap" v-if="tagList">
				<a href=""  v-for="(tag, i) in tagList" :key="i">
					<CommonTag :tagName=tag.tag_name />
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import CommonTag from "@/components/common/CommonTag.vue"
export default {
	name: "tags",
	metaInfo: {
    title: '태그',
    titleTemplate: '운쿠 :: %s',
		link: [
      {rel: 'canonical', href: 'https://wooncou.com/tags'}
    ]
  },
	data() {
		return {
			tagList: null
		}
	},
	components: {
		CommonTag,
	},
	beforeCreate: function() {
		this.$axios.get("/api/tags")
		.then(res => {
			if(res.data.success) {
				this.tagList = res.data.tags;
			} else {
				this.$swal({ icon: "error", title: "조회 오류.", text: "태그를 가져올수 없습니다.", });
			}
		})
		.catch(() => {
			this.$swal({ icon: "error", title: "오류", text: "관리자에게 문의해주세요.", });
		});
	}
}
</script>

<style>
.tags-wrap {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.tags-wrap .tag-item{
	font-size: 1rem;
}
</style>