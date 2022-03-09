<template>
  <div class="form-signin">
    <form>
      <h1 class="h3 mb-3 page-section-heading text-center">관리자 로그인</h1>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="email">
        <label for="floatingInput">이메일</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="pw">
        <label for="floatingPassword">비밀번호</label>
      </div>
      <div class="d-flex">
        <button class="w-100 mx-1 btn btn-lg btn-primary" type="submit" @click="onSubmitHandler">로그인</button>
      </div>
    </form>
  </div>
</template>

<style>
  .form-signin {
    width: 100%;
    height: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .form-signin .checkbox {
    font-weight: 400;
  }

  .form-signin .form-floating:focus-within {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>

<script>
export default {
  name: 'AdminLogin',
  data: () => {
    return {
      email: null,
      pw: null
    }
  },
  methods: {
    onSubmitHandler (e) {
      e.preventDefault()

      const data = {
        email: this.email,
        password: this.pw
      }

      this.$axios.post('/api/users/login', data)
        .then(response => {
          if (response.status === 200) {
            if (response.data.loginSuccess) {
              localStorage.setItem('accessToken', response.data.userId)
              this.$router.push({ name: 'admin' })
            } else {
              alert(response.data.message)
            }
          } else {
            alert('로그인 실패')
          }
        })
        .catch((e) => { console.error(e) })
    }
  }
}
</script>
