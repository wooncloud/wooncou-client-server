<template>
<div>
  <div class="input-group">
    <input type="text" class="form-control" placeholder="리스트 검색.." v-model="params.search">
    <button class="btn btn-primary" type="button" @click="getPosts"><i class="bi bi-search"></i> 검색</button>
    <button class="btn btn-secondary" type="button" @click="searchReset">검색 초기화</button>
  </div>
  <div class="post-tag-container">
    <div class="tags-wrap">
      <div class="tag-element-wrap" v-for="(tag, i) in tagList" :key="i" @click="onTagClick">
        <CommonTag :tagName=tag.tag_name />
      </div>
    </div>
    <div class="post-list-wrap">
      <router-link v-for="(post, i) in posts" :key="i" tag="div" :to="`detail/${post._id}`">
        <CardSH1 :data="post" />
      </router-link>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
  </div>
</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import CommonTag from "@/components/common/CommonTag.vue"
import CardSH1 from '@/components/common/card/CardSH1.vue'
export default {
  name: "PostList",
  data() {
    return {
      posts: null,
      tagList: null,
      params: {
        page: 1,
        search: "",
        tag: ""
      }
    }
  },
  components: {
    CardSH1,
    CommonTag,
    InfiniteLoading
  },
  methods: {
    onTagClick: function (e) {
      this.params.tag = e.target.innerText;
      this.getPosts();
    },
    getPosts: function() {
      this.params.page = 1;
      this.$axios.get("api/post", { params: this.params })
      .then(res => {
        this.posts = res.data.posts;
        this.params.page += 1;
      })
      .catch(() => {this.printErrorSwal()});
    },
    searchReset: function() {
      this.params.search = "";
      this.params.tag = "";
    },
    printErrorSwal: function() {
      this.$swal({ icon: "error", title: "오류", text: "관리자에게 문의해주세요." });
    },
    infiniteHandler: function($state) {
      this.$axios.get("api/post", { params: this.params })
      .then(({ data }) => {
        if (data.posts.length) {
          this.params.page += 1;
          this.posts.push(...data.posts);
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
  },
  beforeCreate() {
    const param = {
      search: "",
      tag: "",
      page: 1,
    }
    if(this.$route.query.search)
      param.search = this.$route.query.search;

    if(this.$route.params.tag)
      param.tag = this.$route.params.tag;

    // post
    this.$axios.get("api/post", param)
    .then(res => {
      this.posts = res.data.posts;
      this.params.page += 1;
    })
    .catch(() => {this.printErrorSwal()});
    // tag
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
    .catch(() => {this.printErrorSwal()});
  }
}
</script>

<style>
.post-tag-container {
  display: flex;
  flex-direction: row-reverse;
}

.post-tag-container .tags-wrap {
  margin: 20px 0;
  width: 300px;
	align-content: flex-start;
}

.post-tag-container .post-list-wrap {
  margin: 20px 20px 0 0;
	display: flex;
  flex-direction: column;
  width: calc(100% - 300px);
}
.post-tag-container .post-list-wrap > div {
  cursor: pointer;
}

@media (min-width: 1440px) {
  .post-tag-container .post-list-wrap {
		flex-direction: row;
		flex-wrap: wrap;
	}
	.post-tag-container .post-list-wrap .post-element-wrap {
		width: calc(50% - 10px);
		margin: 5px;
	}
}

@media (max-width: 992px) {
  .post-tag-container {
    display: flex;
    flex-direction: column;
  }

  .post-tag-container .tags-wrap {
    width: 100%;
  }

  .post-tag-container .post-list-wrap {
    width: 100%;
  }
}
</style>
