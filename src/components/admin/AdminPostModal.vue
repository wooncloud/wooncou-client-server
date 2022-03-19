<template>
<div class="modal" tabindex="-1" style="display: block" v-if="modalOpen">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">{{modalTitle}}</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
			</div>
			<div class="modal-body">
				<div id="deeplink" class="deeplink ql-editor" v-if="deeplinkItem !== null">
					<p class="ql-align-center">
						<a :href="`${deeplinkItem.link}`" target="_blank">
							<img :src="`${deeplinkItem.images[0]}`" style="width: 100%;">
						</a>
					</p>
					<p class="ql-align-center">
						<a :href="`${deeplinkItem.link}`" target="_blank" class="ql-size-large" style="color: rgb(102, 185, 102);">
							<strong>{{deeplinkItem.title}}</strong>
						</a>
					</p>
					<p class="ql-align-center">
						<s v-if="deeplinkItem.discountRate !== '%'" class="ql-size-large" style="color: rgb(136, 136, 136);">{{deeplinkItem.originPrice}}</s>
						<span v-if="deeplinkItem.discountRate !== '%'" class="ql-size-large" style="color: rgb(136, 136, 136);"> ({{deeplinkItem.discountRate}}) </span>
						<span v-if="deeplinkItem.discountRate !== '%'" class="ql-size-large">▶</span> <strong class="ql-size-large">{{deeplinkItem.totalPrice}}</strong>
					</p>
					<p class="ql-align-center">
						<span v-if="+(deeplinkItem.starRating.replace('%', '')) >= 20">⭐</span>
						<span v-if="+(deeplinkItem.starRating.replace('%', '')) >= 40">⭐</span>
						<span v-if="+(deeplinkItem.starRating.replace('%', '')) >= 60">⭐</span>
						<span v-if="+(deeplinkItem.starRating.replace('%', '')) >= 80">⭐</span>
						<span v-if="+(deeplinkItem.starRating.replace('%', '')) >= 100">⭐</span>
						<strong> {{deeplinkItem.count}}</strong>
					</p>
				</div>
				<div id="searchRanking" class="search-ranking" v-if="searchRankingItems !== null">

				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">취소</button>
				<button type="button" class="btn btn-primary" @click="pasteDateInPost">포스트에 추가</button>
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
			modalTitle: "",
			deeplinkItem: null,
			searchRankingItems: null,
			sendHtml: null,
		}
	},
	props: {
		apiSearchData: Object,
	},
	methods: {
		searchCoupangData: function () {
			if (!this.apiSearchData.type || !this.apiSearchData.value) {
				this.$toast.error("입력값이 잘못되었습니다.");
			}

			if (this.apiSearchData.type === "search") {
				this.modalTitle = "랭킹 검색";
				this.getSearchRanking(this.apiSearchData.value);
			} else if (this.apiSearchData.type === "url") {
				this.modalTitle = "딥링크 생성";
				this.getDeeplink(this.apiSearchData.value);
			}
		},
		// 딥링크
		getDeeplink: function (value) {
			const data = { url: value }
			this.$axios.post(`/api/coupang/deeplink`, data)
				.then(res => {
					if (!res.data.success) {
						this.$toast.error(res.data.message); return;
					}

					this.deeplinkItem = res.data.data;
					this.modalOpen = true;
				})
				.catch(e => { console.log(e); })
		},
		// 검색
		getSearchRanking: function (value) {
			this.$axios.get(`/api/coupang/search?keyword=${value}`)
				.then(res => {
					if (!res.data.success) {
						this.$toast.error(res.data.message); return;
					}

					console.log(res.data.data);
				})
				.catch(e => { console.log(e); })
		},
		closeModal: function () {
			this.modalTitle = "";
			this.deeplinkItem = null;
			this.searchRankingItems = null;
			this.sendHtml = null;
			this.modalOpen = false;
		},
		pasteDateInPost: function() {
			if(this.deeplinkItem !== null) {
				this.sendHtml = document.getElementById("deeplink").innerHTML;
			}
			if(this.searchRankingItems !== null) {
				this.sendHtml = document.getElementById("searchRanking").innerHTML;
			}
			this.$emit('sendModalHtml', this.sendHtml)
			this.closeModal();
		}
	}
}
</script>

<style>
.deeplink img {
	width: 100%;
}
</style>
