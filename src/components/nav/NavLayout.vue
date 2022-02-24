<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand" href="#" @click="onNavRouterHandler($event, main.name)">
          {{main.title}}
        </a>
        <button class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          Menu
        </button>
        <div class="navbar-collapse collapse" id="navbarResponsive">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item mx-0 mx-lg-1"
              v-for="(item, i) in items"
              :key="i"
            >
              <a class="nav-link" href="#" @click="onNavRouterHandler($event, item.name)">{{item.title}}</a>
            </li>
          </ul>
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
</style>

<script>
// import {router} from './router/index.js';
export default {
  name: 'NavLayout',
  data: () => {
    return {
      drawer: null,
      main: {
        title: '운쿠', name: 'home'
      },
      items: [
        { title: 'About', name: 'about' },
      ],
      right: null
    }
  },
  methods: {
    onNavRouterHandler (e, routerName) {
      e.preventDefault()
      this.$router.push({ name: routerName })
    }
  }
}
</script>
