<template>
  <div>
    <Menu :activeIndex2=activeIndex2 :form=form></Menu>

    <div id="user-order">
      <el-card>
        <div style="text-align: center;opacity: 0.75;margin: 20px auto;">
          <a style="font-size: x-large;">我的订单</a>
          <br>

        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  name: "OrderInfo",
  components: {
    Menu,
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

    }
  },

  data() {
    return {
      //菜单活动标签索引
      activeIndex2: '5',
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
    }
  },

  methods: {}


}
</script>

<style scoped>
#user-order{
  width: 1200px;
  margin: 75px auto;
}
</style>