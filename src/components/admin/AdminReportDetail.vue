<template>
	<div class="report-detail-container h-100">
		<div class="report-title">
			<div class="d-flex ellipsis" style="width: 90%">
				Lorem ipsum dolor sit amet, co
			</div>
			<div class="d-flex justify-content-end" style="width: 10%">
				<input v-if="true" class="btn btn-sm btn-primary" type="button" value="완료" @click="completeReport">
				<div v-else><i class="bi bi-check-lg"></i></div>
			</div>
		</div>
		<div class="report-content">
			<div class="report-info d-flex justify-content-between">
				<div class="report-user">
					<span class="me-2 badge bg-primary">작성자</span>타키온세이버
				</div>
				<div class="report-email">
					<span class="me-2 badge bg-primary">이메일</span>dntjdgh02@gmail.com
				</div>
				<div class="report-regdate">
					<span class="me-2 badge bg-secondary">작성일</span>2022-03-13 07:58:22
				</div>
				<div class="report-compdate">
					<span class="me-2 badge bg-secondary">완료일</span>2022-03-13 08:06:14
				</div>
			</div>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.</p><p>Senectus et netus et malesuada. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt eget. Leo a diam sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod lacinia. In tellus integer feugiat scelerisque. Feugiat in fermentum posuere urna nec tincidunt praesent. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Et malesuada fames ac turpis egestas sed. Sit amet nisl suscipit adipiscing bibendum est ultricies. Arcu ac tortor dignissim convallis aenean et tortor at. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Eros donec ac odio tempor orci dapibus ultrices. Elementum nibh tellus molestie nunc. Et magnis dis parturient montes nascetur. Est placerat in egestas erat imperdiet. Consequat interdum varius sit amet mattis vulputate enim.</p><p>Sit amet nulla facilisi morbi tempus. Nulla facilisi cras fermentum odio eu. Etiam erat velit scelerisque in dictum non consectetur a erat. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Ut sem nulla pharetra diam. Fames ac turpis egestas maecenas. Bibendum neque egestas congue quisque egestas diam. Laoreet id donec ultrices tincidunt arcu non sodales neque. Eget felis eget nunc lobortis mattis aliquam faucibus purus. Faucibus interdum posuere lorem ipsum dolor sit.</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "AdminReportDetail",
	data() {
		return {

		}
	},
	methods: {
    completeReport(e) {
			const reportId = e.target.closest(".report-element").dataset.id;
			const index = e.target.closest(".report-element").dataset.idx;
      this.$axios.put('/api/report', { id: reportId })
        .then(res => {
          if (res.data.success) {
						this.reportList[index].complete_date = res.data.date
						this.$toast.success('변경이 완료되었습니다.')
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

	.report-title {
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

	.report-content {
		margin: 5px 0;
		padding: 0 20px;
		overflow: hidden auto;
		height: calc(100% - 50px);
	}
</style>