<template>
	<div class="report-detail-container h-100">
		<div class="report-title">
			<div class="d-flex ellipsis" style="width: 90%">
				{{title}}
			</div>
			<div class="d-flex justify-content-end" style="width: 10%">
				<input v-if="isCanComplete" class="btn btn-sm btn-primary" type="button" value="완료" @click="completeReport">
			</div>
		</div>
		<div class="report-content">
			<div class="report-info d-flex justify-content-between">
				<div class="report-user">
					<span class="me-2 badge bg-primary">작성자</span>{{userName}}
				</div>
				<div class="report-email">
					<span class="me-2 badge bg-primary">이메일</span>{{userEmail}}
				</div>
				<div class="report-regdate">
					<span class="me-2 badge bg-secondary">작성일</span>{{reportDate}}
				</div>
				<div class="report-compdate">
					<span class="me-2 badge bg-secondary">완료일</span>{{completeDate}}
				</div>
			</div>
			{{content}}
		</div>
	</div>
</template>

<script>
export default {
	name: "AdminReportDetail",
	data() {
		return {
			title: "",
			content: "",
			userName: "",
			userEmail: "",
			reportDate: "",
			completeDate: "",
			isCanComplete: false,
		}
	},
	props: {
		selectedReportId: String
	},
	watch: {
		selectedReportId() {
			this.$axios.get(`/api/report/${this.selectedReportId}`)
			.then(res => {
				this.title = res.data.report.title;
				this.content = res.data.report.content;
				this.userName = res.data.report.user_name;
				this.userEmail = res.data.report.user_email;
				this.reportDate = new Date(res.data.report.report_date).toLocaleString();
				this.isCanComplete = res.data.report.complete_date === null;
				this.completeDate = this.isCanComplete
				? "----. -. --. -- --:--:--" 
				: this.completeDate = new Date(res.data.report.complete_date).toLocaleString();
			})
			.catch(e => {
				console.log(e);
			})
		}
	},
	methods: {
    completeReport(e) {
      this.$axios.put('/api/report', { id: this.selectedReportId })
        .then(res => {
          if (res.data.success) {
						this.isCanComplete = false;
						this.$swal(this.$swalt("success", "변경이 완료되었습니다."))
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
  },
}
</script>

<style>
	.report-detail-container {
		border: 1px solid lightgray;
		border-radius: 4px;
	}

	.report-detail-container .report-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
		margin: 5px 10px;
		border: 0;
		border-bottom: 1px solid lightgray;
		height: 40px;
		width: calc( 100% - 20px );
		color: #2c3e50;
		font-size: 15pt;
    font-weight: 500;
	}

	.report-info {
		color:dimgray;
		font-size: small;
		justify-content: space-evenly;
		border-bottom: 1px solid lightgray;
		padding-bottom: 5px;
	}

	.report-detail-container .report-content {
		margin: 5px 0;
		padding: 0 20px;
		overflow: hidden auto;
		height: calc(100% - 50px);
	}
</style>