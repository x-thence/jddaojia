<template>
  <div class="login__wrapper">
      <div v-if="isLogin" class="my">
        欢迎
      </div>
      <van-form v-else class="form__wrapper">
        <van-field v-model="username" left-icon="user-o" label="用户名" placeholder="请输入用户名" />
        <van-field v-model="password" type="password" left-icon="points" label="密码" placeholder="请输入密码" />
        <div class="btn__wrapper">
          <van-button round block type="primary" @click="handleLogin" native-type="submit">登录</van-button>
        </div>
      </van-form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Field, Form, Dialog, Notify } from 'vant'
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
  name: 'Login',
  computed: {
    isLogin () {
      return sessionStorage.isLogin
    }
  },
  setup () {
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const handleLogin = async () => {
      if (!username.value || !password.value) {
        Dialog({ message: '用户名或密码不合法' })
      } else {
        const { data } = await axios.post('https://www.fastmock.site/mock/eac3f83516b2299ea36c1e78f6f09ffa/mock/api/v1/login')
        if (data.code === 0) {
          Notify({ type: 'success', message: '登录成功', duration: 1000 })
          setTimeout(() => {
            router.push('/')
            sessionStorage.isLogin = true
          }, 1000)
        } else {
          Notify({ type: 'danger', message: '登录失败', duration: 1000 })
        }
      }
    }
    return { username, password, handleLogin }
  },
  components: {
    [Form.name]: Form,
    [Field.name]: Field
  }
}
</script>

<style lang="scss" scoped>
.form__wrapper {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .btn__wrapper {
    margin: .16rem;
  }
}

</style>
