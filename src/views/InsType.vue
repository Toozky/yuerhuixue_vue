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

          <el-menu-item index="2" @click="insTypePage">乐器心选</el-menu-item>

          <el-menu-item index="3">悦耳论坛</el-menu-item>

          <el-menu-item index="4">音乐课程</el-menu-item>

          <el-menu-item index="5">我的订单</el-menu-item>

          <el-submenu index="6" style="float: right">
            <template slot="title">
              <span v-if="form.userNickname===''">请登录！　</span>
              <span v-else>欢迎用户：{{ form.userNickname }}　</span>
              <el-avatar :size="40" :src="circleUrl"/>
            </template>
            <el-menu-item index="6-1" v-show="!isLogin" @click="userLogin">登录</el-menu-item>
            <el-menu-item index="6-2" v-show="isLogin" @click="userInfo">修改信息</el-menu-item>
            <el-menu-item index="6-3" v-show="isLogin" @click="userModifyPwd(id)">修改密码</el-menu-item>
            <el-menu-item index="6-4" v-show="isLogin" @click="userShoppingCart(id)">查看购物车</el-menu-item>
            <el-menu-item index="6-5" v-show="isLogin" @click="userLogout">注销登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>

    <div id="rushBuy">
      <img style="height: 120px;width: 1200px" :src=rushBuyImg alt=""/>
    </div>

    <div id="typeMenu">
      <el-tabs v-model="activeType" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0"></el-tab-pane>
        <el-tab-pane v-for="instype in typeList"
                     :label="instype.typeName"
                     :name="instype.typeId+''"
                     :key="instype.typeId+''">
        </el-tab-pane>
      </el-tabs>
    </div>

    <div id="insTable">
      <el-row :gutter="20" style="margin-left: 0px">
        <el-col style="width: 240px;height: 420px;"
                v-for="ins in insList"
                :key="ins.insId+''">
          <el-card :body-style="{ padding: '0px'}"
                   style="cursor: pointer"
                   shadow="hover"
                   @click.native="GoodBuy(ins.insId)">
            <img v-bind:src="insImgUrl+ins.insImg" alt="">
            <div style="margin:0px auto;width: 100%;">
              <h5 style="padding: 0px 10px;">名称：{{ ins.insName }}</h5>
            </div>
            <div id="descText">
              <p>描述：{{ ins.insDesc }}</p>
              <a>价格：</a>
              <a style="color: red;">{{ ins.insPrice + '' }}</a>
              <a>&nbsp;元</a>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div id="pageHand">
      <el-pagination
          background
          layout="total,prev, pager, next,jumper"
          :total="total"
          @current-change=page>
      </el-pagination>
    </div>

    <div id="footer">

    </div>
  </div>
</template>

<script>
export default {
  name: "InsType",

  data() {
    return {
      //菜单活动标签索引
      activeIndex2: '2',
      // 菜单头像
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      //登录状态 切换菜单用户功能显示
      isLogin: false,
      token: '',
      //乐器类型
      typeId: '1',
      //类型菜单 活动标签索引
      activeType: '1',
      //用户信息表
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
      //乐器数组
      insList: [
        {
          insId: 0,
          insName: '雅马哈 YCL-450/YCL-450N',
          insImg: '1ce16cb7f01b45a2af6e71a22e8bf7ac.jpg',
          insDesc: '标准型单簧管',
          insBrand: '',
          insPrice: '9999.99',
          insStock: '',
          typeId: ''
        },
      ],
      //乐器类型数组
      insTypeData: [
        {
          typeId: 1,
          typeName: '木管乐器',
          typeImg: 'f4bc5aa9cbf04d3bafbc67763c191b28.jpg',
          typeDesc: '木管乐器',
          typeLevel: 1
        },
      ],
      typeList: [
        {
          typeId: 1,
          typeName: '木管乐器',
          typeImg: 'f4bc5aa9cbf04d3bafbc67763c191b28.jpg',
          typeDesc: '木管乐器',
          typeLevel: 1
        },
      ],
      //抢购图片 banner
      rushBuyImg: require('@/assets/img/instype/goodsBackground.jpg'),

      //分页 ↓
      //查询数据总数
      total: 1,
      //分页页数
      currentPage: 1,
      //每页数据个数
      pageSize: 10,
      //分页 ↑

      //第一页 点击分类菜单调用pageNum（不写这个变量，方法里直接传1也可以）
      pageNum:1,
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
    insTypePage() {
      const _this = this
      _this.$router.go(0)
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
      _this.$router.go(0)
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
    //购物车页面
    userShoppingCart(userId){
      const _this = this
      this.$router.push({
        name: 'ShoppingCart',
        headers: {
          token: _this.token
        },
        params: {
          id: userId,
        }
      });
    },
    //菜单用户方法 ↑

    //根据乐器类型id分页获取乐器列表 ↓
    getInsList(typeId,pageNum,pageSize) {
      const _this = this
      axios({
        method: 'get',
        url: '/insType/insByType',
        params: {
          insTypeId: typeId,
          pageNum: pageNum,
          pageSize: pageSize
        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.insList = resp.data.data.list
          _this.total = resp.data.data.total
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
    //乐器类型菜单跳转
    handleClick(tab, event) {
      const _this=this
      // console.log(tab.name)
      if (tab.name === '0') {
        this.getAllIns(_this.pageNum,_this.pageSize)
      } else {
        _this.typeId=tab.name
        this.getInsList(_this.typeId,_this.pageNum,_this.pageSize)
      }
    },
    //根据乐器类型id分页获取乐器列表 ↑

    //分页查询所有乐器
    getAllIns(pageNum, pageSize) {
      const _this = this
      axios({
        method: 'get',
        url: '/ins/pageList',
        params: {
          pageNum: pageNum,
          pageSize: pageSize
        }
      }).then((resp) => {
        // console.log(resp.data)
        if (resp.data.code === 10000) {
          _this.insList = resp.data.data.list
          _this.total = resp.data.data.total
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

    //分页（页码部分）
    page(currentPage) {
      const _this = this
      _this.currentPage = currentPage
      this.getAllIns(currentPage, _this.pageSize)
    },
    test(text) {
      alert(text)
    },

    //跳转至购买页
    GoodBuy(insId){
      const _this = this
      this.$router.push({
        name: 'GoodBuy',
        headers: {
          token: _this.token
        },
        params: {
          insId: insId,
        }
      });
    },
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
    }

    //是否从首页点击乐器类型图片跳转至乐器类型页
    _this.typeId = this.$route.params.typeId
    if (_this.typeId == null) {
      /* //获取第一个乐器类型的乐器列表
       axios.get('/insType/list').then(function (resp) {
         _this.typeList = resp.data.data
         _this.getInsList(_this.typeList[0].typeId)
       });*/
      //获取全部乐器
      this.getAllIns(_this.currentPage, _this.pageSize);
      _this.activeType = '0'
      axios.get('/insType/list').then(function (resp) {
        _this.typeList = resp.data.data
      });
    } else {
      //获取相应类型的乐器列表
      axios.get('/insType/list').then(function (resp) {
        _this.typeList = resp.data.data
        _this.getInsList(_this.typeId,_this.currentPage,_this.pageSize)
      });
      _this.activeType = _this.typeId + ''
    }

  },

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

/*悦耳商城图片div*/
#rushBuy {
  width: 1200px;
  margin: 40px auto 20px auto;
}


/*乐器分类菜单*/
#typeMenu {
  width: 1200px;
  height: 75px;
  margin: 50px auto 0 auto;
  /*position: absolute;*/
  /*left: 17.5%;*/
  /*z-index: 1;*/
}

/*乐器列表*/
#insTable {
  position: relative;
  margin: 0 auto;
  width: 1200px;
  height: auto;
}

#insTable img {
  width: 220px;
  height: 230px;
}

#descText {
  font-size: small;
  opacity: 0.7;
  padding: 0 10px 10px 10px;
  float: left;
}

#pageHand {
  width: 1200px;
  height: auto;
  margin: 0 auto;
}

#footer {
  width: 100%;
  height: 200px;
}
</style>