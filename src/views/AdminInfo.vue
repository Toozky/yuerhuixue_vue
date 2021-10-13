<template>
  <div>

    <div v-show="!showEdit">
      <template>
        <el-table
            :data="adminForm"
            border
            max-height="170"
            style="width:560px;">
          <el-table-column
              prop="headImg"
              label="头像"
              width="100">
            <template width="90" slot-scope="scope">
              <img style="width:90px;height: 90px" :src="scope.row.headImg">
            </template>
          </el-table-column>
          <el-table-column
              prop="adminName"
              label="管理员账户名"
              width="150">
          </el-table-column>
          <el-table-column
              prop="adminNickname"
              label="管理员昵称"
              width="150">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="150">
            <template slot-scope="scope">
              <el-button type="primary" @click="editInfo">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <div id="admininfo" v-show="showEdit">

      <el-card shadow="hover">
        <div style="width: 350px;height: 50px">
          <el-button type="text"
                     style="color: black;opacity: 0.7;float: right"
                     @click="editInfo">< 取消修改</el-button>
        </div>


        <el-form label-width="120px">
          <el-form-item label="头像">
            <img style="width: 200px; height: 200px" :src="headImg" class="avatar">
            <el-upload
                class="avatar-uploader"
                :action="this.baseUrl+'/admin/uploadimg'"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-error="handleAvatarError"
                :on-success="handleAvatarSuccess">
              <el-button slot="trigger" style="margin-right:20px ">选择文件</el-button>
              <el-button type="success" :disabled="imgOK" @click="submitHead">确认上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>

        <el-form ref="form" :model="form" :rules="rules" label-width="120px">

          <el-form-item label="管理员账户名" prop="adminName">
            <el-input v-model="form.adminName" placeholder="请输入员工姓名"></el-input>
          </el-form-item>
          <el-form-item label="管理员昵称" prop="adminNickname">
            <el-input v-model="form.adminNickname"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="adminModify('form')">确认修改</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>

        </el-form>
      </el-card>

    </div>

  </div>
</template>

<script>
import {setCookie} from "@/utils/cookie";

export default {
  name: "AdminInfo",

  data() {
    //录入信息自定义验证规则 ↑
    return {
      //菜单活动标签索引
      activeIndex2: '1',
      // 菜单头像
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      //登录状态 切换菜单用户功能显示
      isLogin: false,
      token: '',
      //头像回显
      headImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      //用户信息页背景
      userBackgroundImg: require('@/assets/img/user/userbackground.jpg'),
      //头像是否修改的中间变量
      newImg: '',
      //切换确认上传按钮可用状态
      imgOK: false,
      //用户信息表
      form: {
        adminId: '',
        adminImg: '',
        adminName: '',
        adminNickname: '',
        adminPwd: '',
        adminCreateTime: '',
        adminUpdateTime: ''
      },
      //展示信息
      adminForm: [
        {
          headImg: '',
          adminName: '',
          adminNickname: '',
        },
      ],

      //验证规则绑定
      rules: {
        adminName: [
          {required: true, message: '请输入管理员账户名名', trigger: 'blur'},
          {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
        ],
        adminNickname: [
          {required: true, message: '请输入管理员昵称', trigger: 'blur'},
          {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
        ],
      },

      //显示编辑区
      showEdit:false

    }
  },

  methods: {
    //重置表格
    resetForm(form) {
      const _this = this
      _this.form.adminId = _this.$getCookie('adminId')
      _this.form.adminImg = _this.$getCookie('adminImg')
      _this.form.adminName = _this.$getCookie('adminName')
      _this.form.adminNickname = _this.$getCookie('adminNickname')
      _this.form.adminPwd = _this.$getCookie('adminPwd')

      _this.headImg = this.headImgUrl + _this.form.adminImg
    },
    //用户信息修改
    adminModify(form) {
      const _this = this
      _this.$refs[form].validate((valid) => {
        if (valid) {
          _this.$confirm('您确定要修改为当前信息吗？', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            axios({
              method: 'put',
              url: '/admin/modify',
              headers: {
                token: _this.token
              },
              data: {
                adminId: _this.form.adminId,
                adminImg: _this.form.adminImg,
                adminName: _this.form.adminName,
                adminPwd: _this.form.adminPwd,
                adminNickname: _this.form.adminNickname,
                createTime: _this.form.adminCreateTime,
                updateTime: _this.form.adminUpdateTime
              }
            }).then((resp) => {

              // console.log(resp)

              if (resp.data.code === 10000) {
                const admin = resp.data.data
                admin.adminCreateTime = resp.data.data.createTime
                admin.adminUpdateTime = resp.data.data.updateTime
                setCookie("adminId", admin.adminId, 30)
                setCookie("adminName", admin.adminName, 30)
                setCookie("adminNickname", admin.adminNickname, 30)
                setCookie("adminImg", admin.adminImg, 30)
                setCookie("adminCreateTime", admin.createTime, 30)
                setCookie("adminUpdateTime", admin.updateTime, 30)

                //上传回显头像
                _this.headImg = this.headImgUrl + _this.form.adminImg
                //展示信息
                _this.adminForm[0].headImg = _this.headImg
                _this.adminForm[0].adminName = _this.$getCookie('adminName')
                _this.adminForm[0].adminNickname = _this.$getCookie('adminNickname')

                //切换编辑区显示状态
                _this.editInfo()

                //将昵称发送至菜单组件
                const bus=this.$bus
                bus.$emit('adminNicknameChange',_this.form.adminNickname)

                _this.$message({
                  showClose: true,
                  type: 'success',
                  message: '修改成功!'
                })
              }
              if (resp.data.code === 10001) {
                _this.$message({
                  showClose: true,
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

        } else {
          _this.$alert('请检查输入信息是否正确', '提示', {
            confirmButtonText: '确定',
          });
        }
      });

    },

    //头像上传错误捕获
    handleAvatarError(err, file, fileList) {
      const _this = this;
      // console.log(err.status)
      if (err.status === 500) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        _this.imgOK = !_this.imgOK
      }
      if (err.status === 404) {
        this.$message.error('上传头像失败!');
        _this.imgOK = !_this.imgOK
      }
    },
    //头像上传回显
    handleAvatarSuccess(res, file) {
      const _this = this
      _this.imgOK = !_this.imgOK
      _this.headImg = this.headImgUrl + res.data
      _this.newImg = res.data
    },
    //头像上传检查
    beforeAvatarUpload(file) {
      const isJPG = file.type === ('image/jpeg' || 'image/jpg' || 'image/png');
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    //确认修改头像
    submitHead() {
      const _this = this;
      // console.log(_this.newImg)
      _this.form.adminImg = _this.newImg

      axios({
        method: 'put',
        url: '/admin/modify',
        headers: {
          token: _this.token
        },
        data: {
          adminId: _this.form.adminId,
          adminImg: _this.form.adminImg,
          adminName: _this.form.adminName,
          adminNickname: _this.form.adminNickname,
          createTime: _this.form.adminCreateTime,
          updateTime: _this.form.adminUpdateTime
        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.circleUrl = this.headImgUrl + _this.form.adminImg
          const admin = resp.data.data
          admin.adminCreateTime = resp.data.data.createTime
          admin.adminUpdateTime = resp.data.data.updateTime
          setCookie("adminId", admin.adminId, 30)
          setCookie("adminName", admin.adminName, 30)
          setCookie("adminNickname", admin.adminNickname, 30)
          setCookie("adminImg", admin.adminImg, 30)
          setCookie("adminCreateTime", admin.adminCreateTime, 30)
          setCookie("adminUpdateTime", admin.adminUpdateTime, 30)

          //将头像链接发送至菜单组件
          const bus=this.$bus
          bus.$emit('circleUrlChange',_this.circleUrl)

          _this.$message({
            showClose: true,
            type: 'success',
            message: resp.data.msg
          });
        }
        if (resp.data.code === 10001) {
          _this.$message({
            showClose: true,
            type: 'error',
            message: resp.data.msg
          })
        }
      });

    },

    //显示编辑区
    editInfo(){
      this.showEdit=!this.showEdit
    }
  },

  created() {
    //将活动菜单索引发送至菜单组件
    const bus=this.$bus
    bus.$emit('activeIndex2Change','1')
    //检测登录状态
    const _this = this
    _this.token = _this.$getCookie('AdminToken')
    _this.form.adminCreateTime = _this.$getCookie('createTime')

    //默认关闭编辑区
    _this.showEdit=false
    if (_this.token !== '') {
      _this.isLogin = true
      _this.form.adminId = _this.$getCookie('adminId')
      _this.form.adminImg = _this.$getCookie('adminImg')
      _this.form.adminName = _this.$getCookie('adminName')
      _this.form.adminNickname = _this.$getCookie('adminNickname')
      _this.form.adminPwd = _this.$getCookie('adminPwd')
      _this.form.adminCreateTime = _this.$getCookie('adminCreateTime')
      _this.form.adminUpdateTime = _this.$getCookie('adminUpdateTime')

      // console.log(_this.form)

      //上传回显头像
      _this.headImg = this.headImgUrl + _this.form.adminImg
      _this.imgOK = !_this.imgOK

      //展示信息
      _this.adminForm[0].headImg = _this.headImg
      _this.adminForm[0].adminName = _this.$getCookie('adminName')
      _this.adminForm[0].adminNickname = _this.$getCookie('adminNickname')

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

/*背景图片*/
#userBackgroundImg {
  width: 100%;
  margin-top: 100px;
  position: absolute;
  z-index: 1;
}

#userBackgroundImg img {
  width: 100%;
}

/*信息修改div*/
#admininfo {
  position: relative;
  z-index: 2;
  width: 400px;
  margin-top: 75px;
  margin-left: 75px;
  float: left;
}
</style>