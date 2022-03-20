<template>
	<div class="loading-container">
		<div class="spinner-border text-light" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
</template>

<script>
export default {
	name:'LoadingSpinner',
}
</script>

<style>
	.loading-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9999;
		background-color: #00000088;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loading-container > .spinner-border {
		width: 3rem;
		height: 3rem;
	}
</style>