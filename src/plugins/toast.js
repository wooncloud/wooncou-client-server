import VueSweetalert2 from 'vue-sweetalert2';

export default {
	install(Vue, options) {
		Vue.prototype.$swalt = function (type, msg) {
			const option = {
				title: msg,
				icon: type,
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
			}

			return option;
		}
	}
}