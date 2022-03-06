<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand" href="#" @click="onNavRouterHandler($event, main.name)">
          {{main.title}}
        </a>
        <button class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <i class="bi bi-list"></i>
        </button>
        <div class="navbar-collapse collapse" id="navbarResponsive">
          <ul class="navbar-nav ms-auto menu-list">
            <li class="nav-item mx-0 mx-lg-1"
              v-for="(menu, i) in menus"
              :key="i"
            >
              <a class="nav-link" href="#" @click="onNavRouterHandler($event, menu.name)">{{menu.title}}</a>
            </li>
          </ul>
          <!-- <div class="tags-wrap">
            <a href="#" class="tag-link" v-for="(tag) in tags" :key="tag.id">
              <span class="badge bg-primary" >
                # {{tag.name}}
              </span>
            </a>
          </div> -->
          <hr>
          <form class="d-flex">
            <input class="form-control form-control-sm me-2" type="search" placeholder="Search" aria-label="Search">
          </form>
        </div>
      </div>
    </nav>
  </header>
</template>

<style>
  #mainNav .navbar-toggler {
    padding: 0.3rem 0.8rem !important;
    font-size: x-large !important;
  }
  .menu-list {
    margin: 20px 0 10px 0;
  }
  .tags-wrap {
    margin: 10px 0;
  }
  .tag-link {
    margin: 4px 6px;
  }
  .tag-link:hover { opacity: 0.8; }
  .tag-link:active { opacity: 0.5; }
</style>

<script>
  export default {
    name: 'NavLayout',
    data: () => {
      return {
        drawer: null,
        main: {
          title: '운쿠', name: 'home'
        },
        menus: [
          {name: "list", title: "추천목록 보기"},
          {name: "tags", title: "태그 목록"},
          {name: "goldbox", title: "골드박스"},
        ],
        tags: [
          {id: '1', name: '마스크'},
          {id: '2', name: '생수'},
          {id: '3', name: '노트북'},
        ],
        right: null,
      }
    },
    methods: {
      onNavRouterHandler (e, routerName) {
        e.preventDefault()
        this.$router.push({ name: routerName })
      }
    },
    beforeCreate() {
      console.log("인기 태그 20개만 불러오기");
    }
  }
</script>
