<template>
<div>

  <Menu :activeIndex2=activeIndex2 :form=form></Menu>

</div>
</template>

<script>
import Menu from '@/components/Menu'
export default {
  name: "ShoppingCart",
  components: {
    Menu,
  },
  data(){
    return{
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
    }
  },
  methods:{

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