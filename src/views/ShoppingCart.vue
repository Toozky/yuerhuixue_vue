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
          <el-menu-item index="6-3" v-show="isLogin" @click="userModifyPwd(id)">修改密码</el-menu-item>
          <el-menu-item index="6-4" v-show="isLogin">查看购物车</el-menu-item>
          <el-menu-item index="6-5" v-show="isLogin" @click="userLogout">注销登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: "ShoppingCart",
  data(){
    return{
      //菜单活动标签索引
      activeIndex2: '',
      //登录状态 切换菜单用户功能显示
      isLogin: false,
      token: '',
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
    }
  },
  methods:{
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
          id: id,
        }
      });
    },
    //菜单用户方法 ↑
  },
  created() {
    const _this = this
    // 获取登录状态
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
      _this.id = _this.form.userId
    }else {
      this.$router.push('/UserLogin');
      _this.$message({
        showClose: true,
        type: 'info',
        message: '您未登录，请先登录'
      });
    }
  }
}
</script>

<style scoped>
/*menu*/
#menu {
  width: 100%;
  height: 60px;
  background-color: #545c64;
}

#menuText {
  width: 1200px;
  height: auto;
  margin: 0px auto;
}
</style>