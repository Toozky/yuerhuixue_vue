<template>
  <div>
    <div id="userLoginImg">
      <img :src="userLoginImg">
    </div>

    <div id="userLogin">
      <el-card shadow="hover">
        <div style="text-align: center;opacity: 0.75;margin: 20px auto;">
          <a style="font-size: x-large;">登　录</a>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
          <el-form-item label="账号" prop="text">
            <el-input type="text" v-model="ruleForm.text" autocomplete="off" :value="ruleForm.text"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" :value="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <div style="width: 100%;height: 40px">
            <div style="float:left;width: 50%">
              <el-form-item label="验证码" prop="code">
                <el-input type="text" v-model="ruleForm.code" :value="ruleForm.code" autocomplete="off"></el-input>
              </el-form-item>
            </div>
            <div style="width: 45%;float: right">
              <img :src="codeImg" @click="getCode"/><br>
              <a style="font-size: small;opacity: 0.7;cursor:default" @click="getCode">看不清?点击刷新</a>
            </div>
          </div>
          <div style="float: left;margin-top: 20px">
            <el-form-item>
              <el-button type="primary" @click="userLogin('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <el-button type="success" @click="userAdd">注册</el-button>
            </el-form-item>
          </div>

        </el-form>
      </el-card>
    </div>

<!--    <div id="logo">
      <img :src="logoImg">
    </div>-->

  </div>

</template>

<script>
import {setCookie} from "@/utils/cookie";

export default {
  name: "UserLogin",
  data() {
    //录入信息自定义验证规则 ↓
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
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } /*else {
        var verify = '';
        if (this.ruleForm.code !== verify) {
          callback(new Error('请输入正确格式的验证码'));
        }
        callback();
      }*/
      callback();
    };
    //录入信息自定义验证规则 ↑
    return {
      // 登录表
      ruleForm: {
        text: '',
        pass: '',
        code:''
      },
      //验证规则绑定
      rules: {
        text: [
          {validator: validateText, trigger: 'blur'}
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        code:[
          {validator: validateCode, trigger: 'blur'},
          {min: 4, max: 4, message: '长度4位字符', trigger: 'blur'},
        ]
      },
      //用户登录页背景
      userLoginImg:require('@/assets/img/login/userloginimg.jpg'),
      //logo图
      logoImg:require('@/assets/img/login/logo-words.png'),
      //验证码
      codeImg:'',
    };
  },
  methods: {
    //用户登录
    userLogin(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            method: 'get',
            url: '/user/login',
            params: {
              name: _this.ruleForm.text,
              pwd: _this.ruleForm.pass,
              code:_this.ruleForm.code
            }
          }).then((resp) => {
            // console.log(resp.data)
            if (resp.data.code === 10000) {
              _this.$setCookie("token", resp.data.data.token, 30);
              const user = resp.data.data.user
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
                message: resp.data.msg,
                type: 'error'
              });
              setTimeout(() => {
                // _this.resetForm('ruleForm')
                _this.getCode()
                _this.ruleForm.code=''
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
    //重置登录表
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //用户注册
    userAdd() {
      const _this = this
      _this.$router.push('/UserAdd')
    },
    //获取验证码
    getCode(){
      const _this=this
      axios({
        method: 'get',
        url: '/user/createCode',
        params: {
          // response: _this.ruleForm.text,
          d:new Date()
        },
        responseType:'blob'
      }).then((resp) => {
        // console.log(resp.data)
        _this.codeImg=window.URL.createObjectURL(resp.data)
      });
    },
  },
  created() {
    //检测登录状态
    const _this = this
    _this.token = _this.$getCookie('token')
    if (_this.token !== '') {
      this.$router.push('/Main')
    }
    this.getCode()
  }
}
</script>

<style scoped>
/*背景图片*/
#userLoginImg{
  width: 100%;
  margin-top: 150px;
  position: absolute;
  z-index: 1;
}
#userLoginImg img{
  width: 100%;
}

/*登录div*/
#userLogin{
  width: 400px;
  height: 600px;
  top: 260px;
  left: 70%;
  position: relative;
  z-index: 2;
}

/*左上logo*/
#logo{
  margin: 10px;
  width: 75px;
  position: fixed;
  z-index: 3;

}
#logo img{
  width: 100%;
}
</style>