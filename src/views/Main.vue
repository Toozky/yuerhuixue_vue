<template>
  <div>
    <div id="menu">
      <div id="menuText">
        <el-menu :default-active="activeIndex2"
                 class="el-menu-demo"
                 mode="horizontal"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 @select="handleSelect">
          <el-menu-item index="1" @click="Main">商城首页</el-menu-item>

          <!--
                 &lt;!&ndash;乐器按分类查询分级列表&ndash;&gt;
                  <el-submenu index="2">

                    <template slot="title">乐器分类</template>
                    <el-submenu v-for="(insType,index1) in insTypeList"
                                :index="'2-'+index1">
                      <template slot="title">
                        <span @mouseover="getInsList(insType.typeId)">{{ insType.typeName }}</span>
                      </template>
                      <el-menu-item v-for="(inst,index2) in insList"
                                    :index="'2-'+index1+'-'+index2">
                        {{ inst.insName }}
                      </el-menu-item>
                    </el-submenu>

                  </el-submenu>-->

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

    <div id="banner">
      <template>
        <el-carousel height="480px" arrow="never">
          <el-carousel-item v-for="banner in bannerSrc"
                            :index="banner.bannerUrl"
                            :key="banner.bannerUrl">
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
      <div id="banner_menu_background">

      </div>
      <el-row>
        <el-col :span="12">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              active-text-color="#ffd04b">
            <el-menu-item id="el-menu-item"
                          v-for="item in 8"
                          :key="item+''">
              <span slot="title">导航{{ item }}</span>
            </el-menu-item>

          </el-menu>
        </el-col>
      </el-row>
    </div>

    <div id="insTable">
      <a style="font-size: xx-large">明星单品</a>
      <el-row :gutter="20" style="margin-left: 0px">
        <el-col style="width: 240px"
                v-for="ins in insData"
                :key="ins.insId+''">
          <el-card :body-style="{ padding: '0px'}" style="margin-top: 20px"
                   shadow="hover"
                   @click.native="test(ins.insId)">
            <img v-bind:src="insImgUrl+ins.insImg" alt="">
            <div style="margin:0 auto;width: 100%;height:42px;text-align: center;">
              <h4 style="padding: 0px 5px">{{ ins.insName }}</h4>
            </div>
            <p style="opacity: 0.7;height: 63px;padding: 0px 10px">　{{ ins.insDesc }}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div id="insTypeTable">
      <a style="font-size: xx-large">爆款类型</a>
      <el-row :gutter="20" style="margin-left: 0px">
        <el-col style="width: 240px"
                v-for="instype in insTypeData"
                :key="instype.typeId+''">
          <el-card :body-style="{ padding: '0px'}" style="margin-top: 20px"
                   shadow="hover"
                   @click.native="toInsTypePage(instype.typeId)">
            <img v-bind:src="insTypeImgUrl+instype.typeImg" alt="">
            <div style="margin:0 auto;width: 100%;height:42px;text-align: center;">
              <h4 style="padding: 0px 5px">{{ instype.typeName }}</h4>
            </div>
            <p style="opacity: 0.7;height: 63px;padding: 0px 10px">　{{ instype.typeDesc }}</p>
          </el-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      index:'',
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
      insData: [
        {
          insId: 0,
          insName: '雅马哈 YCL-450/YCL-450N',
          insImg: '1ce16cb7f01b45a2af6e71a22e8bf7ac.jpg',
          insDesc: '标准型单簧管',
          insBrand: '',
          insPrice: '',
          insStock: '',
          typeId: ''
        },
      ],
      insTypeData: [
        {
          typeId: 0,
          typeName: '木管乐器',
          typeImg: 'f4bc5aa9cbf04d3bafbc67763c191b28.jpg',
          typeDesc: '木管乐器',
          typeLevel: 1
        },
      ],
      insTypeList: [
        {
          typeId: 0,
          typeName: '木管乐器',
          typeImg: 'f4bc5aa9cbf04d3bafbc67763c191b28.jpg',
          typeDesc: '木管乐器',
          typeLevel: 1
        },
      ],
      insList: [
        {
          insId: 1,
          insName: '',
          insImg: '',
          insDesc: '',
          insBrand: '',
          insPrice: '',
          insStock: '',
          typeId: ''
        },
      ]


    }
  },

  methods: {
    //菜单跳转 ↓
    //跳转至首页
    Main(){
      const _this = this
      _this.$router.push('/Main')
    },
    //跳转乐器类型页
    insType(){
      const _this = this
      _this.$router.push('/InsType')
    },
    //菜单跳转 ↑
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
      _this.$router.go(0)
    },
    //用户信息修改
    userInfo() {
      const _this = this
      _this.$router.push('/UserInfo')
    },
    //菜单跳转
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
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
    //根据乐器类型id查找乐器
    getInsList(typeId) {
      const _this = this
      axios({
        method: 'get',
        url: '/insType/insByType',
        params: {
          insTypeId: typeId
        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.insList = resp.data.data
        }
        if (resp.data.code === 10001) {
          _this.$message({
            showClose: true,
            message: '查询失败！',
            type: 'error'
          });
        }
      });
    },
    //根据乐器类型id跳转至乐器类型页
    toInsTypePage(typeId){
      // alert(typeId)
      this.$router.push({
        name: 'InsType',
        params: {
          typeId: typeId
        }
      })
    },
    onSubmit() {
      console.log('submit!');
    },

    getBannerUrl(index) {
      return require("@/assets/img/banner/banner" + index + ".jpg");
    },

    test(text) {
      alert(text)
    }
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

      _this.circleUrl = this.headImgUrl + _this.form.userImg

      _this.id = _this.form.userId
    }
    // 获取乐器单品数据
    axios.get('/ins/fiveList').then(function (resp) {
      // console.log(resp.data.data)
      _this.insData = resp.data.data
    })
    // 获取乐器类型五条数据
    axios.get('/insType/fiveList').then(function (resp) {
      // console.log(resp.data.data)
      _this.insTypeData = resp.data.data
    })
    // 获取乐器类型列表
    axios.get('/insType/list').then(function (resp) {
      // console.log(resp.data.data)
      _this.insTypeList = resp.data.data
    })
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

/*banner*/
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
  /*opacity: 0.5;*/
  background-color:#545c64;
  left: 17.5%;
  position: relative;
  z-index: 2;
}
#banner_menu_background{
  background-color: black;
  width: 100%;
  height: 100%;
}
#banner_menu span{
  color: rgba(255, 255, 2555, 1);
 }
#el-menu-item {
  height: 60px;
  color: white;
}

/*乐器单品*/
/*乐器类型*/
#insTable,
#insTypeTable {
  margin: 50px auto 0 auto;
  width: 1200px;
  height: auto;
}

#insTable img,
#insTypeTable img {
  width: 220px;
  height: 230px;
}

#insTypeTable {
  padding-bottom: 100px;
}

</style>