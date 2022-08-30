<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <img class="logo" src="../assets/images/home/logo.png" />
        <div class="name">
          <div class="title">便民服务站</div>
          <div class="tips">后台管理系统</div>
        </div>
      </div>
      <el-form label-position="top" :rules="rules" :model="ruleForm" ref="loginForm" class="login-form">
        <el-form-item label="手机号" prop="phone">
          <el-input type="text" v-model.trim="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%; margin-top: 20px;" type="primary" @click="submitForm">立即登录</el-button>
          <el-checkbox v-model="checked" @change="!checked">下次自动登录</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { _login } from '../api/auth'
export default {
  name: 'Login',
  setup() {
    const loginForm = ref(null)
    const state = reactive({
      ruleForm: {
        phone: '',
        password: ''
      },
      checked: true,
      rules: {
        phone: [
          { required: 'true', message: '账户不能为空', trigger: 'blur' }
        ],
        password: [
          { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ]
      }
    })
    const submitForm = () => {
      loginForm.value.validate((valid) => {
        if (valid) {
            const { phone, password } = state.ruleForm;
            _login({ phone: phone, password })
                .then(res => {
                    if(res.success) {
                        const { token, uid } = res.msg;
                        localStorage.setItem('token', token);
                        localStorage.setItem('uid', uid);
                        location.href = '/'
                    }
                });
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    }
    const resetForm = () => {
      loginForm.value.resetFields();
    }
    return {
      ...toRefs(state),
      loginForm,
      submitForm,
      resetForm
    }
  }
}
</script>

<style lang="less" scoped>
  .login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw; height: 100vh;
    background: url(../assets/images/login/video-cover.jpeg) 100% 100%;
  }
  .login-container {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
  }
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
  }
  .head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .head .title {
    font-size: 28px;
    color: #1BAEAE;
    font-weight: bold;
  }
  .head .tips {
    font-size: 16px;
    color: #999;
  }
  .login-form {
    width: 70%;
    margin: 0 auto;
  }
</style>
<style>
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .login-form .el-form-item {
    margin-bottom: 12px;
  }
</style>