<template>
  <div>
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
        <el-button type="primary" @click="userModifyPwd('ruleForm')">确认修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "UserModifyPwd",

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.ruleForm.pwd === this.ruleForm.checkPass) {
          callback(new Error('新密码不能与旧密码一致！'));
        }
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }

        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入一次新密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        id: '',
        pwd: '',
        pass: '',
        checkPass: ''
      },
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
    userModifyPwd(formName) {
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
              url: '/user/modifyPwd',
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
                _this.$clearCookie('token')
                _this.$clearCookie('userId')
                _this.$router.push('/UserLogin')
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      const _this = this
      _this.ruleForm.id = _this.$route.params.id
    }
  },

  created() {
    const _this = this
    _this.ruleForm.id = this.$route.params.id
  }

}
</script>

<style scoped>

</style>