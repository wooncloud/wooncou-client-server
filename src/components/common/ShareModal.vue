<template>
  <div class="modal" tabindex="-1" v-if="visible">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">공유할 SNS를 선택해 주세요.</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="shareModal = false"></button>
            </div>
            <div class="modal-body">
                <button class="btn-sm btn-secondary-outline" id="create-kakao-link-btn">
                    <img src="../../assets/kakaotalk.svg" alt="kakao share">
                </button>
                <button class="btn-sm btn-secondary-outline" @click="shareTwitter">
                    <i class="bi bi-twitter"></i>
                </button>
                <button class="btn-sm btn-secondary-outline" @click="shareFacebook">
                    <i class="bi bi-facebook"></i>
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "ShareModal",
    data() {
        return {
            shareModal: this.visible
        }
    },
    props: {
        type: String,
        visible: Boolean,
    },
    methods: {
        shareTwitter() {
            const sendText = "운쿠"; // 전달할 텍스트
            const sendUrl = "wooncou.com/"; // 전달할 URL
            window.open(`https://twitter.com/intent/tweet?text=${sendText}&url=${sendUrl}`);
        },
        shareFacebook() {
            const sendUrl = "wooncou.com/"; // 전달할 URL
            window.open(`http://www.facebook.com/sharer/sharer.php?u=${sendUrl}`);
        },
    },
    updated() {
      Kakao.Link.createScrapButton({
        container: '#create-kakao-link-btn',
        requestUrl: 'http://wooncou.com',
      });
    },
    
}
</script>

<style>

</style>