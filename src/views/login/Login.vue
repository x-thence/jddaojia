<template>
  <div class="login__wrapper">
    <div class="form__wrapper">
      <template v-if="isLoginPage">
        <div class="form__wrapper__avatar">
          <img src="@/assets/images/user.png" alt="头像">
        </div>
        <div class="form__wrapper__item">
          <input v-model="username" type="text" placeholder="用户名">
        </div>
        <div class="form__wrapper__item">
          <input v-model="password" type="password" placeholder="请输入密码">
        </div>
        <div class="form__wrapper__btn" @click="handleLogin">登录</div>
        <span class="form__wrapper__register" @click="goRegister">立即注册</span>
      </template>
      <template v-else>
        <div class="form__wrapper__avatar">
          <img src="@/assets/images/user.png" alt="头像">
        </div>
        <div class="form__wrapper__item">
          <input v-model="rUsername" type="text" placeholder="用户名">
        </div>
        <div class="form__wrapper__item">
          <input v-model="rPassword" type="password" placeholder="请输入密码">
        </div>
        <div class="form__wrapper__item">
          <input v-model="repassword" type="password" placeholder="请再次确认密码">
        </div>
        <div class="form__wrapper__btn" @click="handleRegister">注册</div>
        <span class="form__wrapper__register" @click="goLogin">去使用已有账号登录</span>
      </template>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

export default {
  name: 'Login',
  computed: {
    isLogin () {
      return sessionStorage.isLogin
    }
  },
  setup () {
    const router = useRouter()
    const isLoginPage = ref(true)
    const username = ref('')
    const password = ref('')
    const rUsername = ref('')
    const rPassword = ref('')
    const repassword = ref('')
    const handleLogin = async () => {
      if (!username.value || !password.value) {
        Toast('用户名或密码不合法')
      } else {
        const { data } = await axios.post('https://www.fastmock.site/mock/eac3f83516b2299ea36c1e78f6f09ffa/mock/api/v1/login')
        if (data.code === 0) {
          setTimeout(() => {
            router.push('/')
            sessionStorage.isLogin = true
          }, 1000)
          Toast('登录成功')
        } else {
          Toast('登录失败')
        }
      }
    }
    // 注册的逻辑
    const handleRegister = () => {
      if (!rUsername.value || !rPassword.value || !repassword.value) {
        Toast('填写的信息不完整')
      } else if (rPassword.value !== repassword.value) {
        Toast('两次输入的密码不一致')
      } else {
        Toast('注册成功')
        rUsername.value = ''
        rPassword.value = ''
        repassword.value = ''
      }
    }
    const goRegister = () => {
      isLoginPage.value = false
    }
    const goLogin = () => {
      isLoginPage.value = true
    }
    return {
      isLoginPage,
      username,
      password,
      handleLogin,
      goRegister,
      goLogin,
      rUsername,
      rPassword,
      repassword,
      handleRegister
    }
  }
}
</script>

<style lang="scss" scoped>
.form__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 80%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &__avatar {
    width: .7rem;
    height: .7rem;
    margin-bottom: .5rem;
    img {
      width: 100%;
    }
  }
  &__item, &__btn {
    width: 100%;
    height: .4rem;
    margin-bottom: .1rem;
    background: #f9f9f9;
    border: .01rem solid #ccc;
    border-radius: .05rem;
    font-size: .16rem;
    input {
      height: 100%;
      outline: none;
      border: none;
      color: #777;
      background: none;
      text-indent: .2rem;
    };
  }
  &__btn {
    margin-top: .15rem;
    border: none;
    background: rgb(0, 145, 455);
    text-align: center;
    line-height: .4rem;
    color: #fff;
  }
  &__register {
    color: #777;
  }
}

</style>
