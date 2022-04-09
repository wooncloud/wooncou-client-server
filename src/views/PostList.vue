<template>
<div class="post-tag-container">
  <div class="tags-wrap">
    <div class="tag-element-wrap" v-for="(tag, i) in tagList" :key="i" @click="onTagClick">
      <CommonTag :tagName=tag.tag_name />
    </div>
  </div>
  <div class="post-list-wrap">
    <div class="post-element-wrap" v-for="(post, i) in posts" :key="i" :data-id="`${post._id}`" @click="postMove">
      <CardSH1 :data="post" />
    </div>
  </div>
</div>
</template>

<script>
import CommonTag from "@/components/common/CommonTag.vue"
import CardSH1 from '@/components/common/card/CardSH1.vue'
export default {
  name: "PostList",
  data() {
    return {
      posts: null,
      tagList: null
    }
  },
  components: {
    CardSH1,
    CommonTag,
  },
  methods: {
    postMove: function (e) {
      const id = e.target.closest(".post-element-wrap").dataset.id;
			this.$router.push({ name: "detail", params: { id: id } })
    },
    onTagClick: function (e) {
      const tagName = e.target.innerText;
      this.getPosts(`tag=${tagName}`);
    },
    getPosts: function(query) {
      this.$axios.get(`/api/post?${query}`)
      .then(res => {
        this.posts = res.data.posts;
      })
      .catch(this.printErrorSwal);
    },
    printErrorSwal: function() {
        this.$swal({ icon: "error", title: "오류", text: "관리자에게 문의해주세요." });
    }
  },
  beforeCreate() {
		let postParam = "";
		if (this.$route.params.tag) {
			postParam += `tag=${this.$route.params.tag}`;
		}
		if (this.$route.query.search){
			postParam = postParam !== "" ? "&" : "";
			postParam += `search=${this.$route.query.search}`;
		}
		if (postParam != "") {
			postParam = "?" + postParam;
		}

    this.$axios.get(`/api/post${postParam}`)
    .then(res => {
      this.posts = res.data.posts;
    })
    .catch(this.printErrorSwal);

    this.$axios.get("/api/tags")
    .then(res => {
      if (res.data.success) {
        this.tagList = res.data.tags;
      } else {
        this.$swal({
          icon: "error",
          title: "조회 오류.",
          text: "태그를 가져올수 없습니다.",
        });
      }
    })
    .catch(this.printErrorSwal);
  }
}
</script>

<style>
.post-tag-container {
  display: flex;
  flex-direction: row-reverse;
}

.post-tag-container>.tags-wrap {
  width: 300px;
	padding: 0 10px;
	align-content: flex-start;
}

.post-tag-container>.post-list-wrap {
	display: flex;
  flex-direction: column;
  width: calc(100% - 300px);
  padding: 0 10px;
}

@media (min-width: 1440px) {
  .post-tag-container>.post-list-wrap {
		flex-direction: row;
		flex-wrap: wrap;
	}
	.post-tag-container>.post-list-wrap .post-element-wrap {
		width: calc(50% - 10px);
		margin: 5px;
	}
}

@media (max-width: 992px) {
  .post-tag-container {
    display: flex;
    flex-direction: column;
  }

  .post-tag-container>.tags-wrap {
    width: 100%;
  }

  .post-tag-container>.post-list-wrap {
    width: 100%;
  }
}
</style>
