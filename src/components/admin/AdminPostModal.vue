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
					<div id="nonePostData" class="rank-summary">
						<div class="rank-summary-item" v-for="(p, i) in searchRankingItems.data.data.productData" :key="i">
							<div class="rank-summary-item-rank">{{p.rank}}</div>
							<a :href="`${p.productUrl}`" target="_blank">
								<img :src="p.productImage" :alt="p.productName">
							</a>
							<a :href="`${p.productUrl}`" target="_blank">
								<span class="fs-6">{{p.productName}}</span>
							</a>
							<span class="fs-5 fw-bold">{{p.productPrice ? parseInt(p.productPrice).toLocaleString("ko-KR") : 0}}원</span>
						</div>
					</div>
					<div id="postData" class="post-data ql-editor">
						<div class="ranking-post-item" v-for="(p, i) in searchRankingItems.data.data.productData" :key="i">
							<p class="ql-align-center">
								<a :href="`${p.productUrl}`" target="_blank">
									<img :src="`${p.productImage}`" style="width: 100%;">
								</a>
							</p>
							<p class="ql-align-center">
								<a :href="`${p.productUrl}`" target="_blank" class="ql-size-large" style="color: rgb(102, 185, 102);">
									<strong>{{p.rank}}. {{p.productName}}</strong>
								</a>
							</p>
							<p class="ql-align-center">
								<strong class="ql-size-large">{{p.productPrice ? parseInt(p.productPrice).toLocaleString("ko-KR") : 0}}원</strong>
							</p>
							<p></p>
						</div>
					</div>
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
	},
	methods: {
		searchCoupangData: function (searchData) {
			if (!searchData.type || !searchData.value) {
				this.$toast.error("입력값이 잘못되었습니다.");
			}

			if (searchData.type === "search") {
				this.modalTitle = "랭킹 검색";
				this.getSearchRanking(searchData.value);
			} else if (searchData.type === "url") {
				this.modalTitle = "딥링크 생성";
				this.getDeeplink(searchData.value);
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

					this.searchRankingItems = res.data.data;
					this.modalOpen = true;
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
				let sendHtml = "";
				const items = document.querySelectorAll("#searchRanking > #postData > .ranking-post-item");
				items.forEach((e) => {
					sendHtml += e.innerHTML;
				});
				this.sendHtml = sendHtml
			}
			this.$emit('sendModalHtml', this.sendHtml)
			this.closeModal();
		}
	}
}
</script>

<style>
.admin-dashbord-container .modal-body {
	max-height: 400px;
	overflow: hidden auto;
}

.deeplink img {
	width: 100%;
}

.rank-summary {
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: space-around;
}

.rank-summary-item {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	width: 190px;
	margin: 5px;
	padding: 	5px;
	border: 1px solid lightgray;
	border-radius: 4px;
	text-align: center;
}
.rank-summary-item > a > img {
	width: 100%;
}
.rank-summary-item > .rank-summary-item-rank {
	position: absolute;
	top: 0;
	left: 0;
	width: 30px;
	height: 30px;
	background-color: var(--bs-secondary);
	border-radius: 2px 0 0 0;
	color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    border-right: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
}
</style>
