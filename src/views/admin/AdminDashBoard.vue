<template>
	<div class="admin-dashbord-container container h-100">
		<ul class="nav nav-tabs">
			<li class="nav-item">
				<a :class="`fw-bold nav-link ${tabIndex === 1 ? 'active' : ''}`" @click="tabIndex = 1" href="#">포스팅</a>
			</li>
			<li class="nav-item">
				<a :class="`fw-bold nav-link ${tabIndex === 2 ? 'active' : ''}`" @click="tabIndex = 2" href="#">문의</a>
			</li>
		</ul>
		<div class="manage-warp row" v-if="tabIndex === 1">
			<div class="manage-container col-4 h-100">
				<AdminPostList @sendPostId="setSelectedPostId" />
			</div>
			<div class="manage-container col-8 h-100">
				<AdminPostDetail 
					:selectedPostId="selectedPostId"
					ref="AdminPostDetail"
					@sendCoupangApiData="setCoupangApiSearchData"
				/>
			</div>
		</div>
		<div class="manage-warp row" v-if="tabIndex === 2">
			<div class="manage-container col-4 h-100">
				<AdminReportList @sendReportId="setSelectedReportId" />
			</div>
			<div class="manage-container col-8 h-100">
				<AdminReportDetail :selectedReportId="selectedReportId" />
			</div>
		</div>
		<div>
			<AdminPostModal 
				@sendModalHtml="setModalHtml"
				ref="refModal"
			/>
		</div>
	</div>
</template>

<script>
import AdminPostList from "@/components/admin/AdminPostList.vue"
import AdminPostDetail from "@/components/admin/AdminPostDetail.vue"
import AdminReportList from "@/components/admin/AdminReportList.vue"
import AdminReportDetail from "@/components/admin/AdminReportDetail.vue"
import AdminPostModal from "@/components/admin/AdminPostModal.vue"

export default {
	name: 'AdminDashBoard',
	data() {
		return {
			tabIndex: 1,
			selectedPostId: null,
			selectedReportId: null,
			modalHtml: null,
		}
	},
	methods: {
		setSelectedPostId(postId) {
			this.selectedPostId = postId;
		},
		setSelectedReportId(reportId) {
			this.selectedReportId = reportId;
		},
		setCoupangApiSearchData(data) {
			if(!data.value) {
				this.$toast.warning("내용을 입력하세요.");
				return;
			}
			this.$refs.refModal.searchCoupangData(data);
		},
		setModalHtml(html) {
			this.modalHtml = html;
			this.$refs.AdminPostDetail.getModalHtml(html);
			this.modalHtml = null;
		}
	},
	components: {
		AdminPostList,
		AdminPostDetail,
		AdminReportList,
		AdminReportDetail,
		AdminPostModal,
	}
}
</script>

<style>
	.admin-dashbord-container {
		min-width: 1280px;
	}

	.manage-warp {
		margin: 10px 0;
		height: calc(100% - 60px);
		justify-content: space-between;
	}

	.manage-container {
		padding: 2px 10px;
	}

</style>
