<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <!--      <el-form-item label="头像">
              <el-image :src="form.userImg" prop="userImg"></el-image>
            </el-form-item>
            <el-form-item>
              <el-button @click="userUpdateImg()">上传头像</el-button>
            </el-form-item>-->


      <!--      <el-form-item label="用户ID" v-show="false" prop="userId">
              <el-input v-model="form.userId" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户密码" v-show="false" prop="userPwd">
              <el-input v-model="form.userPwd" disabled></el-input>
            </el-form-item>
            <el-form-item label="创建时间" v-show="false" prop="updateTime">
              <el-input v-model="form.updateTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="更新时间" v-show="false" prop="updateTime">
              <el-input v-model="form.updateTime" disabled></el-input>
            </el-form-item>-->
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPwd">
        <el-input type="password" v-model="form.userPwd" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="userPwd2">
        <el-input type="password" v-model="form.userPwd2" placeholder="请再输入一次密码"></el-input>
      </el-form-item>

      <!--      <el-form-item label="用户昵称" prop="userNickname">
              <el-input v-model="form.userNickname"></el-input>
            </el-form-item>
            <el-form-item label="用户性别" prop="userGender">
              <el-select v-model="form.userGender">
                <el-option label="男" value="male"></el-option>
                <el-option label="女" value="female"></el-option>
                <el-option label="保密" value=''></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户年龄" prop="userAge">
              <el-input v-model.number="form.userAge"></el-input>
            </el-form-item>
            <el-form-item label="用户电话" prop="userTel">
              <el-input v-model.number="form.userTel"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" prop="userEmail">
              <el-input v-model="form.userEmail"></el-input>
            </el-form-item>-->


      <el-form-item>
        <el-button type="primary" @click="userAdd('form')">确认注册</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "UserAdd",
  data() {
    var checkUserAge = (rule, value, callback) => {
      setTimeout(() => {
        if (value === '') {
          callback();
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
        if (value < 18) {
          callback(new Error('必须年满18岁'));
        }
      }, 1000);
    };
    var checkUserEmail = (rule, value, callback) => {
      if (value === '') {
        callback();
      }
      var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (!verify.test(value)) {
        callback(new Error('请输入正确的邮箱格式！'));
      }
    };
    var checkUserTel = (rule, value, callback) => {
      setTimeout(() => {
        if (value === '') {
          callback();
        }
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
        if (value < 10000 || value > 999999999999) {
          callback(new Error('长度在 5 到 12 个字符'));
        }

      }, 1000);
    };
    var checkUserPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.userPwd !== '') {
          this.$refs.form.validateField('userPwd2');
        }
        callback();
      }
    };
    var checkUserPwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.userPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      isLogin: false,
      token: '',
      form: {
        createTime: '',
        updateTime: '',
        userAge: '',
        userEmail: '',
        userGender: '',
        userId: '',
        userImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        userName: '',
        userNickname: '',
        userPwd: '',
        userPwd2:'',
        userTel: '',
      },
      rules: {
        userAge: [
          {validator: checkUserAge, trigger: 'blur'}
        ],
        userEmail: [
          {validator: checkUserEmail, trigger: 'blur'}
        ],
        userGender: [],
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'},
        ],
        userPwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'},
          { validator: checkUserPwd, trigger: 'blur' }
        ],
        userPwd2: [
          { validator: checkUserPwd2, trigger: 'blur' }
        ],
        userNickname: [
          {required: true, message: '请输入用户昵称', trigger: 'blur'},
          {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
        ],
        userTel: [
          {validator: checkUserTel, trigger: 'blur'},
        ]
      }
    }
  },
  methods: {
    userAdd(form) {
      const _this = this
      _this.$refs[form].validate((valid) => {
        if (valid) {
          // alert('校验通过!');
          // console.log(_this.form.userName)
          // console.log(_this.form.userPwd)
          axios({
            method:'post',
            url:'/user/regist',
            params:{
              name:_this.form.userName,
              pwd:_this.form.userPwd
            }
          }).then((resp)=>{
            console.log(resp.data.code)
            if (resp.data.code === 10000) {
              _this.$message({
                type: 'success',
                message: _this.form.userName + ' 注册成功!'
              })
              setTimeout(() => {
                _this.$router.push('/UserLogin')
              }, 3000);
            }
            if (resp.data.code === 10001) {
              _this.$message({
                type: 'error',
                message: '用户名：　'+_this.form.userName + '　已存在!'
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
    }
  }
}
</script>

<style scoped>

</style>