<template>
  <div>

    <div id="adminLoginImg">
      <img :src="adminLoginImg">
    </div>

    <div id="adminAdd">
      <el-card shadow="hover">
        <div style="text-align: center;opacity: 0.75;margin: 10px auto 40px auto;height: 40px">
          <el-button type="text" style="float: left;color: black;margin-right: 20px" @click="adminLogin">< 返回登录</el-button>
          <a style="font-size: x-large;padding-right: 68px">注　册</a>
        </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="用户名" prop="adminName">
            <el-input v-model="form.adminName" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="adminPwd">
            <el-input type="password" v-model="form.adminPwd" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="adminPwd2">
            <el-input type="password" v-model="form.adminPwd2" placeholder="请再输入一次密码"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="adminAdd('form')">确认注册</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

  </div>
</template>

<script>
export default {
  name: "AdminAdd",

  data() {
    //录入信息自定义验证规则 ↓
    var checkAdminPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.adminPwd !== '') {
          this.$refs.form.validateField('adminPwd2');
        }
        callback();
      }
    };
    var checkAdminPwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.adminPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    //录入信息自定义验证规则 ↑
    return {
      //登录状态 切换菜单用户功能显示
      isLogin: false,
      token: '',
      //用户登录页背景
      adminLoginImg:require('@/assets/img/login/userloginimg.jpg'),
      //用户信息表
      form: {
        adminCreateTime: '',
        adminUpdateTime: '',
        adminId: '',
        adminImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        adminName: '',
        adminNickname: '',
        adminPwd: '',
        adminPwd2:'',
      },
      //验证规则绑定
      rules: {
        adminName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'},
        ],
        adminPwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
          { validator: checkAdminPwd, trigger: 'blur' }
        ],
        adminPwd2: [
          { validator: checkAdminPwd2, trigger: 'blur' }
        ],
        adminNickname: [
          {required: true, message: '请输入用户昵称', trigger: 'blur'},
          {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
        ],
      }
    }
  },

  methods: {
    //用户注册
    adminAdd(form) {
      const _this = this
      _this.$refs[form].validate((valid) => {
        if (valid) {
          axios({
            method:'post',
            url:'/admin/regist',
            params:{
              name:_this.form.adminName,
              pwd:_this.form.adminPwd
            }
          }).then((resp)=>{
            console.log(resp.data.code)
            if (resp.data.code === 10000) {
              _this.$message({
                type: 'success',
                message: _this.form.adminName + ' 注册成功!'
              })
              setTimeout(() => {
                _this.$router.push('/adminLogin')
              }, 3000);
            }
            if (resp.data.code === 10001) {
              _this.$message({
                type: 'error',
                message: '用户名：　'+_this.form.adminName + '　已存在!'
              })
            }
          });
        } else {
          const _this = this
          _this.$alert('请检查输入信息是否正确', '提示', {
            confirmButtonText: '确定',
          });
          return false;
        }
      })
    },
    adminLogin(){
      this.$router.push('/adminLogin')
    },
  }

}
</script>

<style scoped>
/*背景图片*/
#adminLoginImg{
  width: 100%;
  margin-top: 150px;
  position: absolute;
  z-index: 1;
}
#adminLoginImg img{
  width: 100%;
}

/*用户注册div*/
#adminAdd{
  position: relative;
  z-index: 2;
  width: 400px;
  margin-top: 250px;
  margin-right: 150px;
  float: right;
}
</style>