<template>
	<span :class="`tag-item badge rounded-pill ${setColor()}`" @click="tagRoute">
		{{tagName}}
		<a v-if="isCloseButton" href="#" @click="remove">
			&nbsp;<i class="bi bi-x-circle-fill"></i>
		</a>
	</span>
</template>

<script>
export default {
	name: "CommonTag",
	props:{
		tagName: String,
		color: String,
		isCloseButton: Boolean,
	},
	methods: {
		setColor: function() {
			let returnColor = "bg-secondary";
			switch (this.color) {
				case 'primary': returnColor = "bg-primary"; break;
				case 'secondary': returnColor = "bg-secondary"; break;
				case 'success': returnColor = "bg-success"; break;
				case 'info': returnColor = "bg-info text-dark"; break;
				case 'warning': returnColor = "bg-warning text-dark"; break;
				case 'danger': returnColor = "bg-danger"; break;
				case 'light': returnColor = "bg-light text-dark"; break;
				case 'dark': returnColor = "bg-dark"; break;
				default: break;
			}

			return returnColor;
		},
		remove: function(e) {
			e.preventDefault();
			e.target.closest('.tag-item').remove();
		},
		tagRoute: function() {
			this.$router.push({ name: "posts", params: { tag: this.tagName } })
		}
	}
}
</script>

<style>
	.tag-item {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: medium;
		margin: 2px 3px;
		cursor: pointer;
	}
	.tag-item:hover {
		color: var(--bs-warning);
	}
</style>