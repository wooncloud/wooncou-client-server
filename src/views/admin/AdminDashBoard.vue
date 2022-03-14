<template>
	<div class="admin-dashbord-container container h-100">
		<div class="manage-warp row" style="height: 70%">
			<div class="manage-container col-4 h-100">
				<AdminPostList />
			</div>
			<div class="manage-container col-8 h-100">
				<AdminPostDetail />
			</div>
		</div>
		<div class="manage-warp row" style="height: 25%">
			<div class="manage-container col-4 h-100">
				<AdminReportList />
			</div>
			<div class="manage-container col-8 h-100">
				<AdminReportDetail />
			</div>
		</div>
		<div>
			<AdminPostModal />
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
	data: () => {
		return {
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
