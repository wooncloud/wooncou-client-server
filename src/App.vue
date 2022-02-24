<template>
  <div class="body-container">
    <navLayout />
    <main class="main-container container">
      <router-view />
    </main>
    <footerLayout />
  </div>
</template>

<style>
  .body-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .main-container {
    position: relative;
    height: 100%;
    margin-top: 95px;
  }

  @media (min-width: 992px) {
    .main-container {
      margin-top: 120px;
    }
  }
</style>

<script>
import navLayout from '@/components/nav/NavLayout.vue'
import footerLayout from '@/components/footer/FooterLayout.vue'

export default {
  name: 'App',
  components: {
    navLayout,
    footerLayout
  },
  data: () => ({
  })
}
</script>
