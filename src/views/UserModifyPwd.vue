<template>
  <div>

    <div id="menu">
      <div id="menuText">
        <el-menu :default-active="activeIndex2"
                 class="el-menu-demo"
                 mode="horizontal"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">

          <el-menu-item index="1" @click="Main">商城首页</el-menu-item>

          <el-menu-item index="2" @click="insType">乐器心选</el-menu-item>

          <el-menu-item index="3">音乐课程</el-menu-item>

          <el-menu-item index="4">悦耳论坛</el-menu-item>

          <el-menu-item index="5">我的订单</el-menu-item>

          <el-submenu index="6" style="float: right">
            <template slot="title">
              <span v-if="form.userNickname===''">请登录！　</span>
              <span v-else>欢迎用户：{{form.userNickname}}　</span>
              <el-avatar :size="40" :src="circleUrl"/>
            </template>
            <el-menu-item index="6-1" v-show="!isLogin" @click="userLogin">登录</el-menu-item>
            <el-menu-item index="6-2" v-show="isLogin" @click="userInfo">修改信息</el-menu-item>
            <el-menu-item index="6-3" v-show="isLogin" @click="userModifyPwd(form.userId)">修改密码</el-menu-item>
            <el-menu-item index="6-4" v-show="isLogin">查看购物车</el-menu-item>
            <el-menu-item index="6-5" v-show="isLogin" @click="userLogout">注销登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>

    <div id="userLoginImg">
      <img :src="userLoginImg">
    </div>

    <div id="userModifyPwd">
      <el-card shadow="hover">
        <div style="text-align: center;opacity: 0.75;margin: 10px auto 40px auto;">
          <a style="font-size: x-large;">修改密码</a>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="ID" prop="id" v-show="false">
            <el-input type="password" v-model="ruleForm.id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="旧密码" prop="pwd">
            <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="userModifyPwd('ruleForm')">确认修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

  </div>
</template>

<script>
export default {
  name: "UserModifyPwd",

  data() {
    //录入信息自定义验证规则 ↓
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.ruleForm.pwd === this.ruleForm.checkPass) {
          callback(new Error('新密码不能与旧密码一致！'));
        }
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }

        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入一次新密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    //录入信息自定义验证规则 ↑
    return {
      //菜单活动标签索引
      activeIndex2: '6-1',
      //登录状态 切换菜单用户功能显示
      isLogin: false,
      //用户登录页背景
      userLoginImg:require('@/assets/img/login/userloginimg.jpg'),
      //用户信息表
      form: {
        createTime: '',
        updateTime: '',
        userAge: '',
        userEmail: '',
        userGender: '',
        userId: '',
        userImg: '',
        userName: '',
        userNickname: '',
        userPwd: '',
        userTel: '',
      },
      // 修改密码表
      ruleForm: {
        id: '',
        pwd: '',
        pass: '',
        checkPass: ''
      },
      //验证规则绑定
      rules: {
        pass: [
          {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      }

    }
  },

  methods: {
    //菜单跳转 ↓
    //跳转至首页
    Main() {
      const _this = this
      _this.$router.push('/Main')
    },
    //跳转乐器类型页
    insType() {
      const _this = this
      _this.$router.push('/InsType')
    },
    //菜单跳转 ↑

    //菜单用户方法 ↓
    // 用户登录
    userLogin() {
      const _this = this
      _this.$router.push('/UserLogin')
    },
    //用户注销登录
    userLogout() {
      const _this = this
      _this.$message({
        showClose: true,
        message: '用户退出登录!',
      });
      _this.$clearCookie('token')
      _this.$clearCookie('userId')
      _this.$router.push('/Main')
    },
    //用户信息修改
    userInfo() {
      const _this = this
      _this.$router.push('/UserInfo')
    },
    //用户密码修改
    userModifyPwd(id) {
      const _this = this
      // console.log(_this.id)
      this.$router.push({
        name: 'UserModifyPwd',
        headers: {
          token: _this.token
        },
        params: {
          id: _this.id,
        }
      });
    },
    //菜单用户方法 ↑

    //用户修改密码
    userModifyPwd(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          _this.$confirm('请确认修改密码', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            axios({
              method: 'put',
              url: '/user/modifyPwd',
              headers: {
                token: _this.token
              },
              params: {
                id: _this.ruleForm.id,
                pwd: _this.ruleForm.pwd,
                newPwd: _this.ruleForm.pass
              }
            }).then((resp) => {
              if (resp.data.code === 10000) {
                const _this = this
                _this.$message({
                  showClose: true,
                  type: 'success',
                  message: '修改成功!',
                });
                _this.$clearCookie('token')
                _this.$clearCookie('userId')
                _this.$router.push('/UserLogin')
              }
              if (resp.data.code === 10001) {
                _this.$message({
                  showClose: true,
                  type: 'error',
                  message: '修改失败，请检查原密码是否输入正确！'
                });
              }
            });
          });
        } else {
          _this.$alert('请检查输入信息是否正确', '提示', {
            confirmButtonText: '确定',
          });
          return false;
        }
      });
    },
    //重置表格
    resetForm(formName) {
      this.$refs[formName].resetFields();
      const _this = this
      _this.ruleForm.id = _this.$route.params.id
    }
  },

  created() {
    //检测登录状态
    const _this = this
    _this.token = _this.$getCookie('token')
    if (_this.token !== '') {
      _this.isLogin = true
      _this.form.createTime = _this.$getCookie('createTime')
      _this.form.updateTime = _this.$getCookie('updateTime')
      _this.form.userAge = _this.$getCookie('userAge')
      _this.form.userEmail = _this.$getCookie('userEmail')
      _this.form.userGender = _this.$getCookie('userGender')
      _this.form.userId = _this.$getCookie('userId')
      _this.form.userImg = _this.$getCookie('userImg')
      _this.form.userName = _this.$getCookie('userName')
      _this.form.userNickname = _this.$getCookie('userNickname')
      _this.form.userPwd = _this.$getCookie('userPwd')
      _this.form.userTel = _this.$getCookie('userTel')

      //菜单显示头像
      _this.circleUrl = this.headImgUrl + _this.form.userImg

      //获取用户id
      _this.ruleForm.id = this.$route.params.id
    }
  }

}
</script>

<style scoped>
/*menu*/
#menu{
  width: 100%;
  height: 60px;
  background-color:#545c64;
}
#menuText{
  width: 1200px;
  height: auto;
  margin: 0px auto;
}

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

/*修改密码*/
#userModifyPwd{
  position: relative;
  z-index: 2;
  width: 400px;
  margin-top: 250px;
  margin-right: 150px;
  float: right;
}
</style>