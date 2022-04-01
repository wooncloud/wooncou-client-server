<template>
<div>
  <div id="mainRecommend">
    <div id="carouselExampleCaptions" class="carousel slide d-none" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://i.pinimg.com/736x/34/2d/51/342d516e8bc38b037ffc2c5161a2d512.jpg" class="d-block w-100" alt="">
          <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://i.pinimg.com/736x/34/2d/51/342d516e8bc38b037ffc2c5161a2d512.jpg" class="d-block w-100" alt="">
          <div class="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="https://i.pinimg.com/736x/34/2d/51/342d516e8bc38b037ffc2c5161a2d512.jpg" class="d-block w-100" alt="">
          <div class="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div id="mainGoldbox">
    골드박스
  </div>
  <div id="mainMostView">
    <div>
      <CardLH1 />
    </div>
    <div>
      <CardSV1 />
      <CardSV1 />
      <CardSV1 />
    </div>
  </div>
  <div id="mainLatestPost">
    <CardSH1 />
    <CardSH1 />
    <CardSH1 />
    <CardSH1 />
    <CardSH1 />
    <CardSH1 />
    <CardSH1 />
    <CardSH1 />
    <CardLV1 />
  </div>
</div>
</template>

<script>
import CardLH1 from '@/components/common/card/CardLH1.vue'
import CardLV1 from '@/components/common/card/CardLV1.vue'
import CardSH1 from '@/components/common/card/CardSH1.vue'
import CardSV1 from '@/components/common/card/CardSV1.vue'
export default {
  name: "Home",
  data() {

  },
  components: {
    CardLH1,
    CardLV1,
    CardSH1,
    CardSV1,
  }
}
</script>

<style>

</style>
