<template>
<div class="wooncou-card card-lh1" v-if="data" :data-id="`${data._id}`">
	<div class="card-picture" :style="`background-image: url(${data.title_image})`"></div>
	<div class="card-content">
		<div class="card-title">{{data.title}}</div>
		<div class="card-text">{{convertContent(data.content)}}</div>
		<div class="card-tags">
			<span class="badge bg-primary mx-1" v-for="(tag, i) in data.tags" :key="i" :data-id="`${tag._id}`">{{tag.tag_name}}</span>
		</div>
	</div>
</div>
</template>

<script>
export default {
  name: "CardLH1",
  props: {
		data: Object
  },
	methods: {
		convertContent(content) {
			let temp = document.createElement("div");
      content = content.replace(/<br>/, "@@");
			temp.innerHTML = content;
      temp.textContent = temp.textContent.replace(/@@/ig, ' ').substring(0, 97) + "...";
			return temp.textContent;
		}
	}
}
</script>

<style>

.card-lh1 {
  position: relative;
	width: 100%;
	padding-bottom: 45%;
	margin: 5px auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
@media (min-width: 992px) {
	.card-lh1 {
		padding-bottom: 30%;
	}
}

.card-lh1 > div {
	width: 50%;
	position: absolute;
	top: 0;
	height: 100%;
}
.card-lh1 .card-content {
	right: 0;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.card-lh1 .card-picture {
	left: 0;
	cursor: pointer;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	animation: zoomout 0.4s ease-in-out both;
}
.card-lh1 .card-picture:hover {
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

.card-lh1 .card-title {
	color: black !important;
	font-size: 1.5rem;
	font-weight: 600;
	text-decoration: none !important;
}

.card-lh1 .card-text {
	color: dimgray;
	height: 100%;
	font-size: 1rem;
}

.card-lh1 .card-tags {
	display: flex;
}

@media (min-width: 992px) {

}
@media (max-width: 768px) {

}
@media (max-width: 425px) {
	.card-lh1 .card-title {
		font-size: 1.25rem;
	}
	.card-lh1 .card-text {
		font-size: 0.75rem;
	}
}
</style>
