<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">主页</el-menu-item>

      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>

      <el-menu-item index="3" disabled>消息中心</el-menu-item>

      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>

      <el-submenu index="5" style="float: right">
        <template slot="title">
          <el-avatar :size="40" :src="circleUrl"/>
        </template>
        <el-menu-item index="5-1" v-show="!isLogin" @click="userLogin">登录</el-menu-item>
        <el-menu-item index="5-2" v-show="isLogin" @click="userInfo">修改信息</el-menu-item>
        <el-menu-item index="5-3" v-show="isLogin">查看购物车</el-menu-item>
        <el-menu-item index="5-4" v-show="isLogin" @click="userLogout">注销登录</el-menu-item>
      </el-submenu>
    </el-menu>

<!--    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户ID">
        <el-input v-model="form.userId" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.userName" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="form.userPwd" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称">
        <el-input v-model="form.userNickname" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户性别">
        <el-input v-model="form.userGender" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户年龄">
        <el-input v-model="form.userAge" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户电话">
        <el-input v-model="form.userTel" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱">
        <el-input v-model="form.userEmail" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户头像">
        <el-avatar :src="form.userImg"></el-avatar>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-input v-model="form.createTime" disabled></el-input>
      </el-form-item>
      <el-form-item label="更新时间">
        <el-input v-model="form.updateTime" disabled></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>-->

  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      isLogin: false,
      token: '',
      form: {
        createTime: "",
        updateTime: "",
        userAge: "",
        userEmail: "",
        userGender: "",
        userId: "",
        userImg: "",
        userName: "",
        userNickname: "",
        userPwd: "",
        userTel: "",
      }
    };
  },
  methods: {
    userLogin() {
      const _this = this
      _this.$router.push('/UserLogin')
    },
    userLogout() {
      const _this = this
      _this.$message({
        showClose: true,
        message: '用户退出登录!',
      });
      _this.$clearCookie('token')
      _this.$router.go(0)
    },
    userInfo(){
      const _this = this
      _this.$router.push('/UserInfo')
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    onSubmit() {
      console.log('submit!');
    }
  },
  created() {
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

      _this.circleUrl = this.headImgUrl+_this.form.userImg
    }
    // this.form=_this.$route.query.user
  }
}
</script>

<style scoped>

</style>