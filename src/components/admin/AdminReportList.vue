<template>
<div class="report-list-container h-100">
  <div class="report-element" v-for="(report, index) in reportList" :key="index" :data-idx="`${index}`" :data-id="`${report._id}`">
    <a href="#" style="width:60%" @click="sendReportId($event, report._id)">{{report.title}}</a>
    <div style="width:32%">{{new Date(report.report_date).toLocaleDateString()}}</div>
    <div style="width:8%">
      <div v-if="reportList[index].complete_date !== null"><i class="bi bi-check-lg"></i></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "AdminReportList",
  data() {
    return {
      reportList: null,
    }
  },
  methods: {
    sendReportId: function(e, id) {
      e.preventDefault();
      this.$emit('sendReportId', id);
    }
  },
  beforeCreate() {
    this.$axios.get('/api/report')
			.then(res => {
				this.reportList = res.data.reports
			})
			.catch(e => {
				console.log(e)
			})
  }
}
</script>

<style>
.report-list-container {
	overflow: auto;
  border: 1px solid lightgray;
  border-radius: 4px;
}

.report-element {
  border-bottom: 1px solid lightgray;
  padding: 4px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.report-element:nth-child(2n-1) {
  background-color: whitesmoke;
}

.report-element>* {
  text-align: center;
}

.report-element>*:first-child {
  text-align: left;
}
</style>
