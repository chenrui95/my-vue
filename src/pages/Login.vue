<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="title">欢迎光临</div>
      <el-form :model="form" ref="loginForm" :rules="rules">
        <el-form-item label="用户名" prop="username" required>
          <el-input placeholder="请输入用户名" v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password" required>
          <el-input placeholder="请输入密码" show-password v-model="form.password" />
        </el-form-item>
      </el-form>
      <el-button style="width: 100%; margin-top: 12px" type="primary" @click="handleLogin">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>

<style scoped>
.login {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('../assets/login-bg.jpg');
  background-size: cover;
}

.login-wrapper {
  padding: 32px;
  background-color: #fff;
  width: 400px;
  border-radius: 4px;
}

.title {
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 16px;
}
</style>
