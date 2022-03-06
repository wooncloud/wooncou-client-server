<template>
  <footer class="footer mt-auto py-3 bg-light">
    <div class="container">
      <div>
        <span class="text-muted">Email : wooncloud@hotmail.co.kr</span>
      </div>
      <div>
        <span class="text-muted">&copy; {{ new Date().getFullYear() }} wooncloud all rights reserved.</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterLayout',
  data: () => {
    return {
    }
  }
}
</script>

<style>
  .footer {
    border-top: 1px solid #eee;
    font-size: small;
  }
</style>