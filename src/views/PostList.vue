<template>
	<div class="main-wrap-container">
		<CardSH1 v-for="(post, i) in posts" :key="i" :data="post" />
	</div>
</template>

<script>
import CardSH1 from '@/components/common/card/CardSH1.vue'
export default {
	name: "PostList",
	data() {
		return {
			posts: null,
		}
	},
	components: {
		CardSH1,
	},
	beforeCreate() {
    this.$axios.get('/api/post')
		.then(res => {
			this.posts = res.data.posts;
		})
    .catch(() => {
      this.$swal({ icon: "error", title: "오류", text: "관리자에게 문의해주세요.", });
		});
	}
}
</script>

<style>

</style>