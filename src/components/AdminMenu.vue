<template>
  <div id="menu">

    <div id="menuText">
      <el-menu :default-active="activeIndex2"
               class="el-menu-demo"
               mode="horizontal"
               background-color="#222222"
               text-color="#fff"
               active-text-color="#fff">
        <el-menu-item style="width:65px;">
          <i
              style="color: #ffffff;font-size: x-large;" class="el-icon-s-operation"
              @click="verticalMenuShow"></i>
        </el-menu-item>

        <el-menu-item style="font-size: large">悦耳慧学后台管理系统</el-menu-item>

        <el-menu-item index="1" @click="AdminIndexPage">系统设置</el-menu-item>

        <el-menu-item index="2" @click="AdminShopIndexPage">商城设置</el-menu-item>


        <el-submenu index="6" style="float: right">
          <template slot="title">
            <span v-if="form.adminNickname===''">请登录！　</span>
            <span v-else>欢迎用户：{{ form.adminNickname }}　</span>
            <el-avatar :size="40" :src="circleUrl"/>
          </template>
          <el-menu-item index="6-1" v-show="!isLogin" @click="adminLogin">登录</el-menu-item>
          <el-menu-item index="6-2" v-show="isLogin" @click="adminInfo">修改信息</el-menu-item>
          <el-menu-item index="6-3" v-show="isLogin" @click="adminModifyPwdPage(form.adminId)">修改密码</el-menu-item>
          <el-menu-item index="6-4" v-show="isLogin" @click="adminLogout">注销登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

  </div>
</template>

<script>
export default {
  name: "AdminMenu",
  props: {
    'activeIndex2':String,
  },
  data() {
    return {
      index: '',
      // //菜单活动标签索引
      // activeIndex: '1',
      // activeIndex2: '1',
      // 菜单头像
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      //登录状态 切换菜单用户功能显示
      isLogin: false,
      token: '',
      //用户信息表
      form: {
        adminAge: "",
        adminId: "",
        adminImg: "",
        adminName: "",
        adminNickname: "",
        adminPwd: "",
      },
      //纵向菜单显示状态
      verticalMenu:false,
    }
  },

  methods:{
    //菜单跳转 ↓
    //跳转至系统设置页
    AdminIndexPage() {
      const _this = this
      _this.$router.push('/AdminIndex/AdminMainPage')
    },
    AdminShopIndexPage(){
      const _this = this
      _this.$router.push('/AdminShopIndex/AdminShopMain')
    },
    //菜单跳转 ↑

    //菜单用户方法 ↓
    //切换纵向菜单显示
    verticalMenuShow(){
      const bus=this.$bus
      const _this=this
      _this.verticalMenu=!_this.verticalMenu
      bus.$emit('verticalMenuChange',_this.verticalMenu)
    },
    // 用户登录
    adminLogin() {
      const _this = this
      _this.$router.push('/adminLogin')
    },
    //用户注销登录
    adminLogout() {
      const _this = this
      _this.$message({
        showClose: true,
        message: '用户退出登录!',
      });
      _this.$clearCookie('AdminToken')
      _this.$clearCookie('adminId')
      _this.$router.go(0)
    },
    //用户信息修改
    adminInfo() {
      const _this = this
      _this.$router.push('/AdminIndex/AdminInfo')

    },
    //用户密码修改
    adminModifyPwdPage(id) {
      const _this = this
      console.log(id)
      this.$router.push({
        path: '/AdminIndex/AdminModifyPwd',
        query: {
          adminID: id,
        },
        headers: {
          token: _this.token
        },
      });
    },
    
    //菜单用户方法 ↑

  },

  created() {
    const _this = this

    // 获取登录状态
    _this.token = _this.$getCookie('AdminToken')
    if (_this.token !== '') {
      _this.isLogin = true
      _this.form.adminGender = _this.$getCookie('adminGender')
      _this.form.adminId = _this.$getCookie('adminId')
      _this.form.adminImg = _this.$getCookie('adminImg')
      _this.form.adminName = _this.$getCookie('adminName')
      _this.form.adminNickname = _this.$getCookie('adminNickname')
      _this.form.adminPwd = _this.$getCookie('adminPwd')

      //菜单显示头像
      _this.circleUrl = this.headImgUrl + _this.form.adminImg
      //获取用户id
      _this.id = _this.form.adminId

      const bus=this.$bus

      bus.$on('circleUrlChange', (circleUrl)=>{
        _this.circleUrl=circleUrl
      })

      bus.$on('adminNicknameChange', (adminNickname)=>{
        _this.form.adminNickname=adminNickname
      })

      bus.$emit('adminIdChange',_this.form.adminId)
    }

  }
}
</script>

<style scoped>
/*menu*/
#menu {
  width: 100%;
  height: 60px;
}

#menuText {
  width: auto;
  height: auto;
  margin: 0px auto;
}
.el-menu{
  border: 0;
}
/*菜单选中背景*/
.el-menu-item.is-active {
  background-color: #1B1B1B !important;
}
</style>