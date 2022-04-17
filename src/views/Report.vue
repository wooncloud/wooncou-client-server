<template>
	<div class="report-container">
		<div class="report-title">
			<h1>문의</h1>
		</div>
		<div class="report-content">
			<div class="my-3 row">
				<label for="reportUserName" class="form-label fw-bold fs-5">이름</label>
				<input type="text" class="form-control" id="reportUserName" maxlength="20" placeholder="이름을 입력하세요.." v-model="user_name">
			</div>
			<div class="my-3 row">
				<label for="reportUserEmail" class="form-label fw-bold fs-5">이메일 (필수)</label>
				<input type="email" class="form-control" id="reportUserEmail" maxlength="100" placeholder="이메일 입력하세요.." v-model="user_email">
				<div id="emailHelp" class="form-text"><i class="bi bi-exclamation-triangle-fill"></i> 이메일을 정확히 입력해 주세요. 문의에 대한 답변이 전송됩니다.</div>
				<div class="form-text text-danger" v-if="isNotEmail">이메일 형식에 맞게 입력해 주세요.</div>
			</div>
			<div class="my-3 row">
				<label for="reportTitle" class="form-label fw-bold fs-5">제목</label>
				<input type="text" class="form-control" id="reportTitle" maxlength="100" placeholder="제목 입력하세요.." v-model="title">
			</div>
			<div class="my-3 row">
				<label for="reportContent" class="form-label fw-bold fs-5">내용</label>
				<textarea class="form-control" id="reportContent" rows="5" minlength="5" maxlength="2000" placeholder="내용을 입력하세요.." v-model="content"></textarea>
				<div id="contentLength" class="form-text text-end">{{content.length}}/2000</div>
			</div>
			<div class="mt-5 row">
				<button type="button" class="btn btn-primary btn-lg" @click="sendReport"><i class="bi bi-send-fill"></i> 전송하기</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Report",
	metaInfo: {
		title: '문의하기',
		titleTemplate: '운쿠 :: %s',
		link: [
      {rel: 'canonical', href: 'https://wooncou.com/report'}
    ]
	},
	data() {
		return {
			user_name: "",
			user_email: "",
			title: "",
			content: "",
			isNotEmail: false,
		}
	},
	watch: {
		user_email() {
			if(this.user_email) {
				this.isNotEmail = !this.$store.getters.REGEX_EMAIL.test(this.user_email);
			}
		},
	},
	methods: {
		sendReport() {
			if (localStorage.getItem("report_date") !== new Date().toDateString()) {
				localStorage.setItem("report_date", new Date().toDateString());
				localStorage.setItem("report_count", 0);
			} else {
				if (localStorage.getItem("report_count") <= 5) {
					localStorage.setItem("report_count", (+localStorage.getItem("report_count")) + 1);
				} else {
					this.$swal({ icon: "error", title: "문의량이 많습니다.", text: "이미 많은 문의를 주셨습니다.\n다음에 이용해 주세요.", });
					return;
				}
			}

			// 유효성 검사
			if (!this.validation()) return;

			let data = {
				user_name: this.user_name.trim(),
				user_email: this.user_email.trim(),
				title: this.title.trim(),
				content: this.content.trim(),
			}

			// XSS 대응
			for (const idx in data) {
				data[idx] = this.$sanitize(data[idx]);
			}

			// 전송
			this.$axios.post('/api/report', data)
			.then(res => {
				if(res.data.success) {
					this.$swal(this.$swalt("success", "전송이 완료되었습니다!"));
					this.user_name = "";
					this.user_email = "";
					this.title = "";
					this.content = "";
				} else {
					this.$swal({ icon: "error", title: "전송이 실패했습니다.", text: "내용을 다시 확인해 주세요.", });
				}
			})
			.catch(() => {
				this.$swal({ icon: "error", title: "오류", text: "관리자에게 문의해주세요.", });
			});
		},
		validation() {
			if (!this.user_name) {
				this.$swal(this.$swalt("error", "이름을 입력해 주세요."));
				return false;
			}
			if (!this.user_email) {
				this.$swal(this.$swalt("error", "이메일을 입력해 주세요."));
				return false;
			} else if(this.isNotEmail) {
				this.$swal(this.$swalt("error", "이메일을 형식에 맞게 입력해 주세요."));
				return false;
			}
			if (!this.title) {
				this.$swal(this.$swalt("error", "제목을 입력해 주세요."));
				return false;
			}
			if (!this.content) {
				this.$swal(this.$swalt("error", "내용을 입력해 주세요."));
				return false;
			}

			return true;
		}
	}
}
</script>

<style>
	.report-container > .report-title {
		margin: 0 5px 10px 5px;
		border-bottom: 1px solid lightgray;
	}
	.report-container > .report-content {
		padding: 0 20px;
	}
	.report-container > .report-content .form-label {
		padding: 0;
	}
</style>