<template>
  <div class="login_view">
    <div class="center_block">
      <img class="login_img" src="@/assets/img/5cats.jpeg" alt="" />

      <h2 class="login_title">登入</h2>
      <input class="login_input" v-model="account" type="text" placeholder="請輸入帳號或Email" />
      <input class="login_input" v-model="password" type="password" placeholder="請輸入密碼" />

      <div class="login_btn" @click="loginBtnClick">登入</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { login } from '@/@core/apis/login'

const account = ref('')
const password = ref('')

onMounted(() => {
  console.log('mounted')
})

const loginBtnClick = async () => {
  console.log('click')
  const obj = {
    account: account.value,
    password: password.value
  }

  const loginRes = await login(obj)
  console.log('loginRes', loginRes)
}
</script>

<style lang="scss" scoped>
.login_view {
  padding-top: 70px;
  display: flex;
  justify-content: center;
  .center_block {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 300px;
    .login_img {
      width: 300px;
      margin-bottom: 10px;
    }

    .login_title {
      margin-bottom: 20px;
    }

    .login_input {
      width: 100%;
      margin-bottom: 10px;
      padding-left: 10px;
      &:focus {
        outline: none;
      }
    }

    .login_btn {
      width: 100px;
      height: 50px;
      background-color: rgb(46, 46, 172);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      cursor: pointer;
      border-radius: 5px;
    }
  }
}
</style>
