<template>
<div class="wooncou-card card-sh1" v-if="data">
	<div class="card-picture" :style="`background-image: url(${data.title_image})`"></div>
	<div class="card-content">
		<div class="card-title">{{data.title}}</div>
		<div class="card-text">{{convertContent()}}</div>
		<div class="card-tags">
			<span class="badge bg-primary mx-1" v-for="(tag, i) in data.tags" :key="i" :data-id="`${tag._id}`">{{tag.tag_name}}</span>
		</div>
	</div>
</div>
</template>

<script>
export default {
  name: "CardSH1",
  props: {
		data: Object
  },
	methods: {
		convertContent() {
			let temp = document.createElement("div");
			temp.innerHTML = this.data.content;
			return temp.textContent;
		}
	}
}
</script>

<style>

.card-sh1 {
  position: relative;
	width: 100%;
	height: 150px;
	margin: 5px auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.card-sh1 > div {
	position: absolute;
	top: 0;
	height: 100%;
}
.card-sh1 .card-content {
	width: 60%;
	right: 0;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.card-sh1 .card-picture {
	width: 40%;
	left: 0;
	cursor: pointer;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	animation: zoomout 0.4s ease-in-out both;
}
.card-sh1 .card-picture:hover {
	animation: zoomin 0.4s ease-in-out both;
}

@keyframes zoomin {
    0%   { background-size: 100%; }
    100% { background-size: 110%; }
}
@keyframes zoomout {
    0%   { background-size: 110%; }
    100% { background-size: 100%; }
}

.card-sh1 .card-title {
	color: black !important;
	font-size: 1.25rem;
	font-size: 2;
	font-weight: 600;
	text-decoration: none !important;
}

.card-sh1 .card-text {
	color: dimgray;
	height: 100%;
	white-space: nowrap; 
	overflow: hidden; 
	text-overflow: ellipsis;
	font-size: 0.75rem;
}

.card-sh1 .card-tags {
	display: flex;
}

@media (min-width: 992px) {
	.card-sh1 {
		margin: 5px 5px;
	}
	.card-sh1 .card-title {
		font-size: 1rem;
	}
	.card-sh1 .card-text {
		font-size: 0.75rem;
	}
}
@media (max-width: 768px) {
	.card-sh1 .card-title {
		font-size: 1.25rem;
	}
	.card-sh1 .card-text {
		font-size: 0.75rem;
	}
}
@media (max-width: 425px) {
	.card-sh1 .card-title {
		font-size: 1rem;
	}
	.card-sh1 .card-text {
		font-size: 0.75rem;
	}
}

</style>
