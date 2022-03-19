<template>
	<div class="admin-dashbord-container container h-100">
		<div class="manage-warp row" style="height: 70%">
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
		<div class="manage-warp row" style="height: 25%">
			<div class="manage-container col-4 h-100">
				<AdminReportList @sendReportId="setSelectedReportId" />
			</div>
			<div class="manage-container col-8 h-100">
				<AdminReportDetail :selectedReportId="selectedReportId" />
			</div>
		</div>
		<div>
			<AdminPostModal 
				:apiSearchData="apiSearchData" 
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
			selectedPostId: null,
			selectedReportId: null,
			apiSearchData: null,
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
			this.apiSearchData = data;
			this.$refs.refModal.searchCoupangData();
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
		justify-content: space-between;
	}

	.manage-container {
		padding: 2px 10px;
	}

</style>
