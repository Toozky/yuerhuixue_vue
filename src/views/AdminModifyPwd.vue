<template>
  <div>
    <div id="adminModifyPwd">
      <el-card shadow="hover">
        <div style="text-align: center;opacity: 0.75;margin: 10px auto 40px auto;">
          <a style="font-size: x-large;">修改密码</a>
        </div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="ID" prop="id" v-show="false">
            <el-input type="password" v-model="ruleForm.id" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="旧密码" prop="pwd">
            <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="adminModifyPwd('ruleForm')">确认修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminModifyPwd",

  data() {
    //录入信息自定义验证规则 ↓
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      }
      if (this.ruleForm.pwd === this.ruleForm.checkPass) {
        callback(new Error('新密码不能与旧密码一致！'));
      }
      if (this.ruleForm.checkPass !== '') {
        this.$refs.ruleForm.validateField('checkPass');
      }

      callback();

    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入一次新密码'));
      }
      if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      }
      callback();

    };
    //录入信息自定义验证规则 ↑
    return {
      //菜单活动标签索引
      activeIndex2: '1',
      // 菜单头像
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      //登录状态 切换菜单用户功能显示
      isLogin: false,
      token: '',
      //用户信息页背景
      adminBackgroundImg: require('@/assets/img/user/userbackground.jpg'),
      //用户信息表
      form: {
        createTime: '',
        updateTime: '',
        adminId: '',
        adminImg: '',
        adminName: '',
        adminNickname: '',
        adminPwd: '',
      },
      // 修改密码表
      ruleForm: {
        id: '',
        pwd: '',
        pass: '',
        checkPass: ''
      },
      //验证规则绑定
      rules: {
        pass: [
          {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      }

    }
  },

  methods: {
    //用户修改密码
    adminModifyPwd(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          _this.$confirm('请确认修改密码', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            axios({
              method: 'put',
              url: '/admin/modifyPwd',
              headers: {
                token: _this.token
              },
              params: {
                id: _this.ruleForm.id,
                pwd: _this.ruleForm.pwd,
                newPwd: _this.ruleForm.pass
              }
            }).then((resp) => {
              if (resp.data.code === 10000) {
                const _this = this
                _this.$message({
                  showClose: true,
                  type: 'success',
                  message: '修改成功!',
                });
                _this.$clearCookie('AdminToken')
                _this.$clearCookie('adminId')
                _this.$router.push('/AdminLogin')
              }
              if (resp.data.code === 10001) {
                _this.$message({
                  showClose: true,
                  type: 'error',
                  message: '修改失败，请检查原密码是否输入正确！'
                });
              }
            });
          });
        } else {
          _this.$alert('请检查输入信息是否正确', '提示', {
            confirmButtonText: '确定',
          });
          return false;
        }
      });
    },
    //重置表格
    resetForm(formName) {
      this.$refs[formName].resetFields();
      const _this = this
      // _this.ruleForm.id = _this.$route.params.id
      _this.ruleForm.id=_this.form.adminId
    }
  },

  created() {
    // //将菜单索引发送至发送至AdminIndex
    // const bus = this.$bus
    // bus.$emit('activeIndex2Change', _this.activeIndex2)

    //检测登录状态
    const _this = this
    _this.token = _this.$getCookie('AdminToken')
    if (_this.token !== '') {
      _this.isLogin = true
      _this.form.createTime = _this.$getCookie('adminCreateTime')
      _this.form.updateTime = _this.$getCookie('adminUpdateTime')
      _this.form.adminId = _this.$getCookie('adminId')
      _this.form.adminImg = _this.$getCookie('adminImg')
      _this.form.adminName = _this.$getCookie('adminName')
      _this.form.adminNickname = _this.$getCookie('adminNickname')
      _this.form.adminPwd = _this.$getCookie('adminPwd')


      //菜单显示头像
      _this.circleUrl = this.headImgUrl + _this.form.adminImg

      //获取用户id

      // _this.ruleForm.id = _this.$route.query.adminID
      // console.log(_this.ruleForm.id)
      // console.log(_this.$route.query.adminID)
      _this.ruleForm.id=_this.form.adminId



    } else {
      this.$router.push('/AdminLogin');
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
/*背景图片*/
#adminBackgroundImg {
  width: 100%;
  margin-top: 100px;
  position: absolute;
  z-index: 1;
}

#adminBackgroundImg img {
  width: 100%;
}

/*修改密码*/
#adminModifyPwd {
  position: relative;
  z-index: 2;
  width: 400px;
  margin-top: 50px;
  margin-left: 50px;
  float: left;
}
</style>