<template>
<div class="wooncou-card card-sv1" v-if="data">
	<a :href="data.productUrl" target="_blank">
		<div class="card-picture" :style="`background-image: url(${data.productImage})`">
			<div class="card-content">
				<div class="card-title">
					{{data.productName}}
				</div>
				<div class="card-content-detail">
					<div class="card-price">가격 : {{data.productPrice}}원</div>
					<div v-if="data.isRocket">🚀</div>
				</div>
			</div>
		</div>
	</a>
</div>
</template>

<script>
export default {
	name: "CardSV1",
	props: {
		data: Object
	},
}
</script>

<style>
.card-sv1 {
  position: relative;
	width: 30%;
	height: 15rem;
	margin: 4px;
}
.card-sv1 > a {
	text-decoration: none !important;
	
}

.card-sv1 .card-picture {
	height: 100%;
	cursor: pointer;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	animation: zoomout 0.4s ease-in-out both;
}

.card-sv1 .card-picture:hover {
	animation: zoomin 0.4s ease-in-out both;
}

.card-sv1 .card-content {
	width: 100%;
	height: 50%;
	position: absolute;
	bottom: 0;
	background-color: #00000088;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.card-sv1 .card-title {
	padding: 4px 8px;
	color: white !important;
	font-size: large;
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

.card-sv1 .card-content-detail{
	padding: 4px 8px;
	display: flex;
	justify-content: space-between;
	background-color: var(--bs-secondary);
}

.card-sv1 .card-price {
	color: var(--bs-warning);
	font-size: 1rem;
	font-weight: bold;
}

/* 768 */
@media (max-width: 768px) {
	.card-sv1 {
		width: 45%;
	}
}
/* 425 */
@media (max-width: 425px) {
	.card-sv1 {
		width: 100%;
	}
}
</style>