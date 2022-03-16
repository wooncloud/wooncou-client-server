<template>
  <div class="modal" tabindex="-1" style="display: block" v-if="modalOpen">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{modalTitle}}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          {{apiSearchData}}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">취소</button>
          <button type="button" class="btn btn-primary">포스트에 추가</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalTitle: "",
    }
  },
  props: {
    modalOpen: Boolean,
    apiSearchData: Object,
  },
  watch: {
    apiSearchData() {
      if (this.apiSearchData.type === "search") {
        this.modalTitle = "랭킹 검색";
        this.getSearchRanking(this.apiSearchData.value);
      } else if (this.apiSearchData.type === "url") {
        this.modalTitle = "딥링크 생성";
        this.getDeeplink(this.apiSearchData.value);
      }
    }
  },
  methods: {
    getDeeplink: function(value) {
      const data = {
        url: value
      }
      this.$axios.post(`/api/coupang/deeplink`, data)
      .then(res => {
        console.log(res.data.links);
      })
      .catch(e => { console.log(e); })
    },
    getSearchRanking: function(value) {
      this.$axios.get(`/api/coupang/search?keyword=${value}`)
      .then(res => {
        console.log(res.data.rank);
      })
      .catch(e => { console.log(e); })
    },
    closeModal: function() {
      this.$emit("closeModal");
    }
  }
}
</script>

<style>

</style>
