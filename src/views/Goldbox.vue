<template>
<div>
  <a href="https://link.coupang.com/a/lJ6bY" target="_blank">
    <div class="goldbox-title">
      <!-- <h1>골드박스</h1>
      <p>🎁 와우 회원 전용 / 1일 특가 할인! 🎁</p> -->
    </div>
  </a>
  <div class="coupang-partners-label text-center">
    <p>쿠팡 파트너스 활동의 일환으로 수익이 발생할 수 있습니다. 하지만, 구매자에게 추가 비용이 발생하지는 않습니다.</p>
  </div>
  <div class="goldbox-container">
    <CardSV1 v-for="(gb, i) in goldbox" :key="i" :data=gb />
  </div>
</div>
</template>

<script>
import CardSV1 from '@/components/common/card/CardSV1.vue'
export default {
  name: "Goldbox",
  metaInfo: {
    title: '골드박스',
    titleTemplate: '운쿠 :: %s',
    link: [
      {rel: 'canonical', href: 'https://wooncou.com/goldbox'}
    ]
  },
  data() {
    return {
      goldbox: null,
    }
  },
  components: {
    CardSV1,
  },
  beforeCreate: function () {
    this.$axios.get('/api/goldbox/list')
      .then(res => {
        this.goldbox = res.data.goldbox;
      })
      .catch(() => {
        this.$swal({
          icon: "error",
          title: "오류",
          text: "관리자에게 문의해주세요.",
        });
      });
  }
}
</script>

<style>
.goldbox-title {
  text-align: center;
  color: var(--bs-secondary);
  font-weight: bold;
  background-image: url('https://image8.coupangcdn.com/image/bannerunit/bannerunit_653bed5b-b61a-403c-a155-1191769e0ff9.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 10px;
  height: 230px;
}
.goldbox-container {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-evenly;
  align-items: center;
}

@media (max-width: 768px) {
  .goldbox-title {
    height: 190px;
  }
}
@media (max-width: 576px) {
  .goldbox-title {
    height: calc(100vw / 3);
  }
}
</style>
