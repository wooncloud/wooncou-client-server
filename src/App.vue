<template>
  <div class="body-container">
    <navLayout />
    <main class="main-container container">
      <router-view />
    </main>
    <footerLayout />
    <loadingSpinner v-if="$store.state.isLoading === true" />
  </div>
</template>

<style>
  .body-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-container {
    position: relative;
    height: 100%;
    margin: 95px 0 0 0;
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
import loadingSpinner from '@/components/common/LoadingSpinner.vue'

export default {
  name: 'App',
  data() {
		return {
    }
  },
  components: {
    navLayout,
    footerLayout,
    loadingSpinner
  },
}
</script>
