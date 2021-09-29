<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="头像">
        <img style="width: 200px; height: 200px" :src="headImg" class="avatar">
        <el-upload
            class="avatar-uploader"
            :action="this.baseUrl+'/user/uploadhead'"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess">
          <el-button slot="trigger" style="margin-right:20px ">选择文件</el-button>
          <el-button type="success" @click="submitHead">确认上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>

    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="用户ID" v-show="false" prop="userId">
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
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入员工姓名"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="userNickname">
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
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="userModify('form')">确认修改</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {setCookie} from "@/utils/cookie";

export default {
  name: "UserInfo",
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
    return {
      isLogin: false,
      token: '',
      headImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      newImg: '',
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
          {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
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
    resetForm(form) {
      const _this = this
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

      _this.headImg = this.headImgUrl + _this.form.userImg
    },
    userModify(form) {
      const _this = this
      _this.$refs[form].validate((valid) => {
        if (!valid) {
          _this.$alert('请检查输入信息是否正确', '提示', {
            confirmButtonText: '确定',
          });
        }
      })
      _this.$confirm('您确定要修改为当前信息吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        /*userinfo.userId = _this.form.userId,
        userinfo.userAge = _this.form.userAge,
        userinfo.userEmail = _this.form.userEmail,
        userinfo.userGender = _this.form.userGender,
        userinfo.userImg = _this.form.userImg,
        userinfo.userName = _this.form.userName,
        userinfo.userNickname = _this.form.userNickname,
        userinfo.userTel = _this.form.userTel,*/
        axios({
          method: 'put',
          url: '/user/modify',
          headers: {
            token: _this.token
          },
          data: {
            userId: _this.form.userId,
            userAge: _this.form.userAge,
            userEmail: _this.form.userEmail,
            userGender: _this.form.userGender,
            userImg: _this.form.userImg,
            userName: _this.form.userName,
            userNickname: _this.form.userNickname,
            userTel: _this.form.userTel

          }
        }).then((resp) => {
          if (resp.data.code === 10000) {
            const user = resp.data.data
            setCookie("userId", user.userId, 30)
            setCookie("userName", user.userName, 30)
            setCookie("userNickname", user.userNickname, 30)
            setCookie("userAge", user.userAge, 30)
            setCookie("userTel", user.userTel, 30)
            setCookie("userEmail", user.userEmail, 30)
            setCookie("userGender", user.userGender, 30)
            setCookie("userImg", user.userImg, 30)
            _this.$message({
              type: 'success',
              message: '修改成功!'
            })
            setTimeout(() => {
              _this.$router.push('/Main')
            }, 3000);
          }
          if (resp.data.code === 10001) {
            _this.$message({
              type: 'error',
              message: '修改失败!'
            })
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    handleAvatarSuccess(res, file) {
      const _this = this
      _this.headImg = this.headImgUrl + res.data
      _this.newImg = res.data
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/jpg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    submitHead() {
      const _this = this;
      console.log(_this.newImg)
      _this.form.userImg=_this.newImg

      axios({
        method: 'put',
        url: '/user/modify',
        headers: {
          token: _this.token
        },
        data: {
          userId: _this.form.userId,
          userImg: _this.form.userImg,
          userAge: _this.form.userAge,
          userEmail: _this.form.userEmail,
          userGender: _this.form.userGender,
          userName: _this.form.userName,
          userNickname: _this.form.userNickname,
          userTel: _this.form.userTel
        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          const user = resp.data.data
          setCookie("userId", user.userId, 30)
          setCookie("userName", user.userName, 30)
          setCookie("userNickname", user.userNickname, 30)
          setCookie("userAge", user.userAge, 30)
          setCookie("userTel", user.userTel, 30)
          setCookie("userEmail", user.userEmail, 30)
          setCookie("userGender", user.userGender, 30)
          setCookie("userImg", user.userImg, 30)
          _this.$message({
            type: 'success',
            message: '修改成功!'
          });
        }
        if (resp.data.code === 10001) {
          _this.$message({
            type: 'error',
            message: '修改失败!'
          })
        }
      });

    }
  },
  created() {
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

      _this.headImg = this.headImgUrl + _this.form.userImg
    }
  }
}
</script>

<style scoped>

</style>