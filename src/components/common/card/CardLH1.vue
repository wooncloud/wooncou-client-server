<template>
<div class="wooncou-card card-lh1">
  <div class="card-picture" :style="`background-image: url(${title_img})`"></div>
  <div class="card-content">
    <div class="card-title">
			<a href="#">test</a>
    </div>
    <div class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non.</div>
    <div class="card-tags">
			<span class="badge bg-primary mx-1">1</span>
			<span class="badge bg-primary mx-1">2</span>
			<span class="badge bg-primary mx-1">3</span>
		</div>
  </div>
</div>
</template>

<script>
export default {
  name: "CardLH1",
  props: {
    title: String,
    content: String,
    tags: Object,
		title_img: String,
  }
}
</script>

<style>

.card-lh1 {
  position: relative;
	width: 100%;
	padding-bottom: 45%;
	margin: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
@media (min-width: 992px) {
	.card-lh1 {
		width: 70%;
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
	font-size: xx-large;
	font-weight: 600;
	text-decoration: none !important;
}

.card-lh1 .card-text {
	color: dimgray;
	height: 100%;
}

.card-lh1 .card-tags {
	display: flex;
}
</style>
