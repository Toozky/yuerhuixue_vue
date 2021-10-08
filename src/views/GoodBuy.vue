<template>
  <div>

    <Menu :activeIndex2=activeIndex2 :form=form></Menu>

    <div id="instrumentInfo">
      <el-card>

        <div id="insImg">
          <el-card shadow="never">
            <img v-bind:src="insImgUrl+instrument.insImg" alt="">
          </el-card>
        </div>

        <div id="insInfo">
          <h2>{{ instrument.insName }}</h2>
          <p>描述　{{ instrument.insDesc }}</p><br>
          <div style="background-color: #F3F3F3;width: 100%;height:80px;line-height: 80px;margin-top: 0px">
            <a>价格　</a>
            <a style="font-size: xx-large;color: red">￥{{ instrument.insPrice }}</a>
            <a>　元</a>
          </div>
          <br>
          <br>
          <div>
            <a style="margin:5px 0;line-height: 30px;cursor: pointer" @click="toInsTypePage(insType.typeId)">类型　{{ insType.typeName }}</a><br>
            <a style="margin:5px 0;line-height: 30px">品牌　{{ instrument.insBrand }}</a><br>
            <a style="margin:5px 0;line-height: 30px">库存　{{ instrument.insStock }}　个</a><br>
          </div>
          <div style="margin-top: 20px;float: left" >
            <el-dropdown>
  <span class="el-dropdown-link" style="font-size: medium">
    配送至<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    v-for="address in userAddr"
                    :index="address.addrId"
                    :key="address.addrId"
                @click.native="ckeckAddr(address.receiverAddr)">
                  {{ address.receiverAddr }}
                </el-dropdown-item>
                <el-dropdown-item>    </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div style="margin: 20px">　{{receiverAddrChecked}}</div>
        </div>

        <div id="insBuyBtn">
          <el-button type="danger">　购买　</el-button>
          <el-button type="success">加入购物车</el-button>
        </div>

      </el-card>
    </div>

    <div id="footer"></div>

  </div>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  name: "GoodBuy",
  components: {
    Menu,
  },
  data() {
    return {
      //菜单活动标签索引
      activeIndex2: '6-1',
      // 菜单头像
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
      //传入页面的乐器ID
      insId: '',
      //乐器数据表
      instrument: {
        insId: 0,
        insName: '雅马哈 YCL-450/YCL-450N',
        insImg: '1ce16cb7f01b45a2af6e71a22e8bf7ac.jpg',
        insDesc: '标准型单簧管',
        insBrand: '',
        insPrice: '',
        insStock: '',
        typeId: ''
      },
      insType: {
        typeId: 1,
        typeName: '木管乐器',
        typeImg: 'f4bc5aa9cbf04d3bafbc67763c191b28.jpg',
        typeDesc: '木管乐器',
        typeLevel: 1
      },
      //用户地址表
      userAddr: [
        {
          addrId: '',
          userId: '',
          receiverName: '',
          receiverTel: '',
          receiverAddr: '',
        },
      ],
      receiverAddrChecked:'',
    }
  },

  methods: {

    //获取乐器信息
    getInsInfo(insId) {
      const _this = this;
      axios({
        method: 'get',
        url: '/ins/insInfo',
        params: {
          insId: insId
        }
      }).then((resp) => {
        // console.log(resp.data.data)
        // console.log(resp.data.data.insType)
        if (resp.data.code === 10000) {
          _this.instrument = resp.data.data
          _this.insType = resp.data.data.insType
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

    //选中收货地址
    ckeckAddr(text){
      const _this=this
      _this.receiverAddrChecked=text
    },

    //根据乐器类型id跳转至乐器类型页
    toInsTypePage(typeId) {
      // alert(typeId)
      this.$router.push({
        name: 'InsType',
        params: {
          typeId: typeId
        }
      })
    },

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

      axios({
        method: 'get',
        url: '/userAddr/list',
        params: {
          userId: _this.form.userId
        }
      }).then((resp) => {
        // console.log(resp.data)
        _this.userAddr=resp.data.data
      });
    } /*else {
      this.$router.push('/UserLogin');
      _this.$message({
        showClose: true,
        type: 'info',
        message: '您未登录，请先登录'
      });
    }*/
    //获取乐器信息
    _this.insId = this.$route.params.insId
    _this.getInsInfo(_this.insId)

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

/*乐器展示div*/
#instrumentInfo {
  width: 1200px;
  height: 500px;
  margin: 75px auto;
  /*background-color: #99a9bf;*/
  /*border: 1px black solid;*/
}

#insImg {
  float: left;
  width: 33%;
  height: 490px;
}

#insImg img {
  width: 100%;
  height: 100%;
}

#insInfo {
  opacity: 0.7;
  float: left;
  width: 62%;
  padding: 0px 0px 20px 40px;
}

#insBuyBtn {
  float: none;
  width: 760px;
  height: 50px;
  margin: 410px 0 0 420px;
}

#footer {
  width: 1200px;
  height: 100px;
  margin: 0 auto;
}
</style>