<template>
<div>
  <div id="mainRecommend" class="main-wrap">
    <div id="recommendCarousel" class="carousel slide carousel-recommend" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(post, i) in mostView" :key="i" :class="`carousel-item ${i === 0 ? 'active': ''}`">
          <div class="carousel-caption d-none d-md-block" :style="`background-image: url(${post.title_image})`">
            <h5>{{post.title}}</h5>
            <p>{{post.content}}</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#recommendCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#recommendCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <div id="mainGoldbox" class="main-wrap">
    <div class="main-wrap-title">
      <h1>골드박스</h1>
      <a href="#" class="btn btn-primary ms-5">더보기</a>
    </div>
    <div class="main-wrap-container">
      <CardSV1 v-for="(gb, i) in goldbox" :key="i" :data=gb />
    </div>
  </div>
  <div id="mainMostView" class="main-wrap">
    <div class="main-wrap-title">
      <h1>최다 조회 상품</h1>
      <a href="#" class="btn btn-primary ms-5">더보기</a>
    </div>
    <div class="main-wrap-container">
      <CardLH1 v-for="(post, i) in mostView" :key="i" :data=post />
    </div>
  </div>
  <div id="mainLatestPost" class="main-wrap">
    <div class="main-wrap-title">
      <h1>최근 등록</h1>
      <a href="#" class="btn btn-primary ms-5">더보기</a>
    </div>
    <div class="main-wrap-container">
      <CardSH1 v-for="(post, i) in latest" :key="i" :data=post />
    </div>
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
    return {
      goldbox: null,
      mostView: null,
      latest: null,
    }
  },
  components: {
    CardLH1,
    CardLV1,
    CardSH1,
    CardSV1,
  },
  beforeCreate() {
    this.$axios.get('/api/common/main')
    .then(res => {
      this.goldbox = res.data.main.goldbox;
      this.mostView = res.data.main.mostView;
      this.latest = res.data.main.latest;
    })
    .catch(() => {
      this.$swal({ type: "error", title: "오류", text: "관리자에게 문의해주세요.", });
    });
  }
}
</script>

<style>
.main-wrap {
  padding: 50px 0;
  border-bottom: 1px solid lightgray;
}
.main-wrap:first-child {
  padding-top: 0;
}
.main-wrap:last-child {
  border: 0;
}

.main-wrap-container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
  align-items: center;
}

.main-wrap-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid whitesmoke;
}

.carousel-recommend {
  height: 400px;
}
.carousel-recommend .carousel-inner,
.carousel-recommend .carousel-inner .carousel-item {
  height: 100%;
}
.carousel-recommend .carousel-inner .carousel-item .carousel-caption {
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex !important;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
