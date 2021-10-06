<template>
  <div>
    <div id="menu">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">商城首页</el-menu-item>

        <el-submenu index="2">
          <template slot="title">乐器分类</template>
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

        <el-menu-item index="3">悦耳论坛</el-menu-item>

        <el-menu-item index="4">音乐课程</el-menu-item>

        <el-menu-item index="5">我的订单</el-menu-item>

        <el-submenu index="5" style="float: right">
          <template slot="title">
            <el-avatar :size="40" :src="circleUrl"/>
          </template>
          <el-menu-item index="5-1" v-show="!isLogin" @click="userLogin">登录</el-menu-item>
          <el-menu-item index="5-2" v-show="isLogin" @click="userInfo">修改信息</el-menu-item>
          <el-menu-item index="5-3" v-show="isLogin" @click="userModifyPwd(form.userId)">修改密码</el-menu-item>
          <el-menu-item index="5-4" v-show="isLogin">查看购物车</el-menu-item>
          <el-menu-item index="5-5" v-show="isLogin" @click="userLogout">注销登录</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <div id="banner">
      <template>
        <el-carousel height="480px" arrow="never">
          <el-carousel-item v-for="banner in bannerSrc" :index="banner">
            <h3 class="small">
              <img style="height: 480px;width: 1200px" :src=banner.bannerUrl alt=""/></h3>
          </el-carousel-item>
<!--          <el-carousel-item v-for="(item,index) in bannerSrc" :key="index">
            <h3 class="small">
              <img style="height: 480px;width: 1200px" :src=getBannerUrl(index) alt=""/></h3>
          </el-carousel-item>-->
        </el-carousel>
      </template>
    </div>

    <div id="banner_menu">
      <el-row>
        <el-col :span="12">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              active-text-color="#ffd04b">
            <el-menu-item v-for="item in 8" id="el-menu-item" v-bind:key="item" :index="item">
              <span slot="title">导航{{ item }}</span>
            </el-menu-item>

          </el-menu>
        </el-col>
      </el-row>
    </div>

    <div id="insTable">
      <a style="font-size: xx-large">明星单品</a>
      <el-row :gutter="20" style="margin-left: 0px">
        <el-col v-for="ins in insData" style="width: 240px" offset="0">
          <el-card :body-style="{ padding: '0px'}" style="margin-top: 20px"
                   shadow="hover"
                   @click.native="test('123')">
            <img v-bind:src="insImgUrl+ins.insImg" alt="">
            <div style="margin:0 auto;width: 100%;height:42px;text-align: center;">
              <h4 style="padding: 0px 5px">{{ ins.insName }}</h4>
            </div>
            <p style="opacity: 0.7;height: 63px;padding: 0px 10px">　{{ins.insDesc}}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div id="insTypeTable">

    </div>

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
      },
      bannerSrc: [
        {bannerUrl: require('@/assets/img/banner/banner0.jpg')},
        {bannerUrl: require('@/assets/img/banner/banner1.jpg')},
        {bannerUrl: require('@/assets/img/banner/banner2.jpg')},
        {bannerUrl: require('@/assets/img/banner/banner3.jpg')},],
      insData:[
        {
          insName:'雅马哈 YCL-450/YCL-450N',
          insImg:'1ce16cb7f01b45a2af6e71a22e8bf7ac.jpg',
          insDesc:'标准型单簧管'
        },
        {
          insName:'雅马哈 YCL-450/YCL-450N',
          insImg:'1ce16cb7f01b45a2af6e71a22e8bf7ac.jpg',
          insDesc:'标准型单簧管'
        },{
          insName:'雅马哈 YCL-450/YCL-450N',
          insImg:'1ce16cb7f01b45a2af6e71a22e8bf7ac.jpg',
          insDesc:'标准型单簧管'
        },{
          insName:'雅马哈 YCL-450/YCL-450N',
          insImg:'1ce16cb7f01b45a2af6e71a22e8bf7ac.jpg',
          insDesc:'标准型单簧管'
        },{
          insName:'雅马哈 YCL-450/YCL-450N',
          insImg:'1ce16cb7f01b45a2af6e71a22e8bf7ac.jpg',
          insDesc:'标准型单簧管'
        }
      ]


    }
  },

  methods: {
    userLogin() {
      const _this = this
      _this.$router.push('/UserLogin')
    }
    ,
    userLogout() {
      const _this = this
      _this.$message({
        showClose: true,
        message: '用户退出登录!',
      });
      _this.$clearCookie('token')
      _this.$clearCookie('userId')
      _this.$router.go(0)
    }
    ,
    userInfo() {
      const _this = this
      _this.$router.push('/UserInfo')
    }
    ,
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
    ,
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
    }
    ,
    onSubmit() {
      console.log('submit!');
    },

    getBannerUrl(index) {
      return require("@/assets/img/banner/banner" + index + ".jpg");
    },

    test(text){
      alert(text)
    }

  }
  ,
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

      _this.circleUrl = this.headImgUrl + _this.form.userImg

      _this.id = _this.form.userId
    }
    // this.form=_this.$route.query.user
    axios.get('/ins/list').then(function (resp) {
      console.log(resp.data.data)

      _this.insData=resp.data.data
    })
  }
}
</script>

<style scoped>
#banner {
  width: 1200px;
  margin-top: 75px;
  margin-bottom: 50px;
  position: absolute;
  left: 17.5%;
  z-index: 1;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

#banner_menu {
  width: 480px;
  margin-top: 75px;
  opacity: 0.5;
  left: 17.5%;
  position: relative;
  z-index: 2;
}

#banner_menu_span {

}

#el-menu-item {
  height: 60px;
  color: white;
}

#insTable {
  margin: 0px auto;
  margin-top: 50px;
  width: 1200px;
  height: auto;
}

#insTable img{
  width: 220px;
  height: 230px;
}

</style>