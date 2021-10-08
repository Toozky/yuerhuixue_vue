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
          <p style="background-color: #F3F3F3;width: 100%;height:60px;line-height: 60px;margin-top: 0px">{{ instrument.insDesc }}</p><br>
          <a >价格　</a>
          <a style="font-size: xx-large;color: red">{{instrument.insPrice}}</a>
          <a>　元</a>
          <br>
          <br>
          <br>
          <br>
          <div>
            <a style="margin:5px 0;line-height: 30px">类型　{{insType.typeName}}</a><br>
            <a style="margin:5px 0;line-height: 30px">品牌　{{instrument.insBrand}}</a><br>
            <a style="margin:5px 0;line-height: 30px">库存　{{instrument.insStock}}　个</a><br>
          </div>
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
      insType:{
        typeId: 1,
        typeName: '木管乐器',
        typeImg: 'f4bc5aa9cbf04d3bafbc67763c191b28.jpg',
        typeDesc: '木管乐器',
        typeLevel: 1
      }
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
          _this.insType=resp.data.data.insType
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

      //获取乐器信息
      _this.insId = this.$route.params.insId
      _this.getInsInfo(_this.insId)

    } /*else {
      this.$router.push('/UserLogin');
      _this.$message({
        showClose: true,
        type: 'info',
        message: '您未登录，请先登录'
      });
    }*/

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
#insImg{
  float: left;
  width: 33%;
  height: 490px;
}
#insImg img{
  width: 100%;
  height: 100%;
}
#insInfo{
  float: left;
  width: 62%;
  padding: 0px 0px 20px 40px;
}

#insBuyBtn{
  float: none;
  width: 760px;
  height: 50px;
  margin: 410px 0 0 420px;
}

#footer{
  width: 1200px;
  height: 100px;
  margin: 0 auto;
}
</style>