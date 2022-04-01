<template>
<div class="mt-auto">
  <footer class="footer py-3 bg-light">
    <div class="container">
      <div>
        <span class="text-muted">
          <i class="bi bi-envelope-fill"></i> Email : wooncloud@hotmail.co.kr
        </span>
      </div>
      <div>
        <span class="text-muted">&copy; {{ new Date().getFullYear() }} wooncloud all rights reserved.</span>
      </div>
    </div>
  </footer>
</div>
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
    margin-top: 50px !important;
    border-top: 1px solid #eee;
    font-size: small;
  }
</style>