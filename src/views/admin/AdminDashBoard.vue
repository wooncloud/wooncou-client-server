<template>
	<div class="admin-dashbord-container container">
		<div class="manage-warp row">
			<div class="manage-container col-lg-4">
				<AdminPostList />
			</div>
			<div class="manage-container col-lg-8">
				<AdminPostDetail />
			</div>
		</div>
		<div class="manage-warp row">
			<div class="manage-container col-lg-4">
				<!-- 컴포넌트 --> 컴포넌트
			</div>
			<div class="manage-container col-lg-8">
				<!-- 컴포넌트 --> 컴포넌트
			</div>
		</div>
	</div>
</template>

<script>
import AdminPostList from "@/components/admin/AdminPostList.vue"
import AdminPostDetail from "@/components/admin/AdminPostDetail.vue"

export default {
	name: 'AdminDashBoard',
	data: () => {
		return {
			wow: 'asdf'
		}
	},
	components: {
		AdminPostList,
		AdminPostDetail,
	}
}
</script>

<style>
	.manage-warp {
		margin: 10px 0;
		justify-content: space-between;
	}

	.manage-container {
		padding: 2px 10px;
	}

</style>
