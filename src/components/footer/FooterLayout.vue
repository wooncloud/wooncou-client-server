<template>
<div class="mt-auto">
  <footer class="footer py-3 bg-light">
    <div class="container">
      <div class="footer-text">
        <div>
          <span class="text-muted">
            <i class="bi bi-envelope-fill"></i> Email : wooncloud@hotmail.co.kr
          </span>
        </div>
        <div>
          <span class="text-muted">&copy; {{ new Date().getFullYear() }} wooncloud all rights reserved.</span>
        </div>
        <div class="footer-share-div">
          <span class="text-muted me-2"><i class="bi bi-share-fill"></i></span>
          <a href="#" id="btnKakao" class="btn btn-sm btn-light text-muted" @click="shareKakao">
            <img class="kakao-icon" src="../../assets/kakaotalk.svg" alt="kakao share">
          </a>
          <a href="#" class="btn btn-sm btn-light text-muted" @click="shareFacebook">
            <i class="bi bi-facebook"></i>
          </a>
          <a href="#" class="btn btn-sm btn-light text-muted" @click="shareTwitter">
            <i class="bi bi-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</div>
</template>

<script>
export default {
  name: 'FooterLayout',
  data: () => {
    return {}
  },
  methods: {
    shareFacebook() {
      var sendUrl = "wooncou.com/"; // 전달할 URL
      window.open(`http://www.facebook.com/sharer/sharer.php?u=${sendUrl}`);
    },
    shareTwitter() {
      var sendText = "운쿠 :: 추천, 가이드, 팁 컬렉션 "; // 전달할 텍스트
      var sendUrl = "wooncou.com/"; // 전달할 URL
      window.open(`https://twitter.com/intent/tweet?text=${sendText}&url=${sendUrl}`);
    },
    shareKakao() {
      Kakao.init('f0baaa0d1cd70ee4e6a53c331c4ad538');
      console.debug("Kakao.isInitialized : ", Kakao.isInitialized());
      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: "운쿠!", // 보여질 제목
          description: "운쿠 :: 추천, 가이드, 팁 컬렉션", // 보여질 설명
          imageUrl: "wooncou.com/", // 콘텐츠 URL
          link: {
            mobileWebUrl: "wooncou.com/",
            webUrl: "wooncou.com/"
          }
        },
        buttons: [{
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'wooncou.com/',
            webUrl: 'wooncou.com/',
          },
        }, ],
      });
    }
  },
}
</script>

<style>
.footer {
  margin-top: 50px !important;
  border-top: 1px solid #eee;
  font-size: small;
}

.footer-share-div {
  display: flex;
  align-items: center;
}

.footer-share-div:first-child {
  border: 1px solid #6c757d;
  border-radius: 50%;
  width: 30px;
  height: 30px;
}

.footer-share-div>a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
}

.kakao-icon {
  height: 14px;
}

@media (max-width: 768px) {
  .footer {
    text-align: center;
  }

  .footer-share-div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
