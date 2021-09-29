<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="text">
        <el-input type="text" v-model="ruleForm.text" autocomplete="off" :value="ruleForm.text"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" :value="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userLogin('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="userAdd">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {setCookie} from "@/utils/cookie";

export default {
  name: "UserLogin",
  data() {

    var validateText = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        if (this.ruleForm.checkText !== '') {
          this.$refs.ruleForm.validateField('checkText');
        }
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };

    return {
      ruleForm: {
        text: '',
        pass: ''
      },
      rules: {
        text: [
          {validator: validateText, trigger: 'blur'}
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    userLogin(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            method: 'get',
            url: '/user/login',
            params: {
              name: _this.ruleForm.text,
              pwd: _this.ruleForm.pass
            }
          }).then((resp) => {
            if (resp.data.code === 10000) {
              _this.$setCookie("token", resp.data.msg, 30);

              const user = resp.data.data
              setCookie("userId", user.userId, 30)
              setCookie("userName", user.userName, 30)
              setCookie("userNickname", user.userNickname, 30)
              setCookie("userAge", user.userAge, 30)
              setCookie("userTel", user.userTel, 30)
              setCookie("userEmail", user.userEmail, 30)
              setCookie("userGender", user.userGender, 30)
              setCookie("userImg", user.userImg, 30)

              setCookie("createTime", user.createTime, 30)
              setCookie("updateTime", user.updateTime, 30)
              setCookie("userPwd", user.userPwd, 30)

              _this.$message({
                showClose: true,
                message: '登录成功！',
                type: 'success'
              });

              _this.$router.push('/Main')
            }
            if (resp.data.code === 10001) {
              _this.$message({
                showClose: true,
                message: '账号或密码有误！',
                type: 'error'
              });
              setTimeout(() => {
                _this.resetForm('ruleForm')
              }, 2000)
            }
          });
        } else {
          const _this = this
          _this.$alert('请检查输入信息是否正确', '提示', {
            confirmButtonText: '确定',
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    userAdd() {
      const _this = this
      _this.$router.push('/UserAdd')
    }
  }
}
</script>

<style scoped>

</style>