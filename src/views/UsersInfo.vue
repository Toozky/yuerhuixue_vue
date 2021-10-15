<template>
  <div>
    <div id="userList">
      <el-table
          :data="usersData"
          border>
        <el-table-column
            fixed
            prop="userId"
            label="用户ID"
            width="70">
        </el-table-column>

        <el-table-column
            prop="userImg"
            label="用户头像"
            width="120">
          <template width="90" slot-scope="scope">
            <img style="width:90px;height: 90px" :src="headImgUrl+scope.row.userImg">
          </template>
        </el-table-column>

        <el-table-column
            prop="userName"
            label="用户名"
            width="150">
        </el-table-column>

        <el-table-column
            prop="userNickname"
            label="用户昵称"
            width="150">
        </el-table-column>

        <el-table-column
            prop="userPwd"
            label="用户密码"
            width="100">
        </el-table-column>

        <el-table-column
            prop="userAge"
            label="用户年龄"
            width="80">
        </el-table-column>

        <el-table-column
            prop="userGender"
            label="用户性别"
            width="80">
        </el-table-column>

        <el-table-column
            prop="userTel"
            label="用户电话"
            width="150">
        </el-table-column>

        <el-table-column
            prop="userEmail"
            label="用户邮箱"
            width="200">
        </el-table-column>

        <el-table-column
            prop="createTime"
            label="创建时间">
        </el-table-column>

        <el-table-column
            prop="updateTime"
            label="最后更新时间">
        </el-table-column>

        <el-table-column
            fixed="right"
            label="操作"
            width="200">
          <template slot-scope="scope">
            <el-button @click="editUser(scope.row)" type="text" size="small">修改</el-button>

            <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>

          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          background
          layout="total, sizes, prev, pager, next"
          :page-sizes="[5, 10, 20]"
          :page-size=pageSize
          :total=total
          @current-change=page
          @size-change="handleSizeChange">
      </el-pagination>
    </div>
    <div>
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible">

        <el-form label-width="80px" :model="user">
          <el-form-item label="头像">
            <img style="width: 200px; height: 200px" :src="headImg" class="avatar">
            <el-upload
                class="avatar-uploader"
                :action="this.baseUrl+'/user/uploadimg'"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-error="handleAvatarError"
                :on-success="handleAvatarSuccess">
              <el-button slot="trigger" style="margin-right:20px ">选择文件</el-button>
              <el-button type="success" :disabled="imgOK" @click="submitHead(user)">确认上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>

        <el-form :model="user">
          <el-form-item label="用户ID" disabled prop="userId">
            <el-input v-model="user.userId" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户密码" disabled prop="userPwd">
            <el-input v-model="user.userPwd" disabled></el-input>
          </el-form-item>
          <el-form-item label="创建时间" disabled prop="updateTime">
            <el-input v-model="user.updateTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="更新时间" disabled prop="updateTime">
            <el-input v-model="user.updateTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="user.userName" placeholder="请输入员工姓名"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="userNickname">
            <el-input v-model="user.userNickname"></el-input>
          </el-form-item>
          <el-form-item label="用户性别" prop="userGender">
            <el-select v-model="user.userGender">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
              <el-option label="保密" value=''></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户年龄" prop="userAge">
            <el-input v-model.number="user.userAge"></el-input>
          </el-form-item>
          <el-form-item label="用户电话" prop="userTel">
            <el-input v-model.number="user.userTel"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="userEmail">
            <el-input v-model="user.userEmail"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import {setCookie} from "@/utils/cookie";

export default {
  name: "UsersInfo",
  data() {
    return {
      //菜单活动标签索引
      activeIndex2: '1',

      usersData: [
        {
          userId: '1',
          userImg: '2',
          userName: '3',
          userNickname: '4',
          userPwd: '5',
          userAge: '6',
          userGender: '7',
          userTel: '19922578281',
          userEmail: '9',
          createTime: '10',
          updateTime: '11',
        },
      ],

      //分页 ↓
      //查询数据总数
      total: 1,
      //当前分页页数
      currentPage: 1,
      //每页数据个数
      pageSize: 10,
      //分页 ↑
      //第一页 点击分类菜单调用pageNum（不写这个变量，方法里直接传1也可以）
      pageNum: 1,

      //dialog
      dialogFormVisible: false,
      formLabelWidth: '120px',

      //单个用户数据
      user: {
        userId: '1',
        userImg: '2',
        userName: '3',
        userNickname: '4',
        userPwd: '5',
        userAge: '6',
        userGender: '7',
        userTel: '19922578281',
        userEmail: '9',
        createTime: '10',
        updateTime: '11',
      },

      //切换确认上传按钮可用状态
      imgOK: true,
      //头像是否修改的中间变量
      newImg: '',

      headImg:'',

    }
  },

  methods: {

    //每页xx条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      // console.log(this.pageSize)
      this.page(this.pageNum, val)
    },

    //分页（页码翻页部分）
    page(currentPage) {
      const _this = this
      this.getUserList(currentPage, _this.pageSize)
    },

    //分页获取用户列表
    getUserList(pageNum, pageSize) {
      const _this = this
      axios({
        method: 'get',
        url: '/admin/userList',
        params: {
          pageNum: pageNum,
          pageSize: pageSize
        }
      }).then((resp) => {
        // console.log(resp.data)
        if (resp.data.code === 10000) {
          _this.usersData = resp.data.data.list
          _this.total = resp.data.data.total
          console.log(resp.data.data.list)
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

    editUser(user) {
      const _this = this
      this.dialogFormVisible = true
      this.user = user
      _this.headImg = this.headImgUrl + user.userImg
    },

    deleteUser(row) {

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

    //头像上传回显
    handleAvatarSuccess(res, file) {
      const _this = this
      _this.imgOK = !_this.imgOK
      _this.headImg = this.headImgUrl + res.data
      _this.newImg = res.data
    },

    //头像上传错误捕获
    handleAvatarError(err, file, fileList) {
      const _this = this
      if (err.status === 500) {
        this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        _this.imgOK = !_this.imgOK
      }
      if (err.status === 404) {
        this.$message.error('上传头像失败!');
        _this.imgOK = !_this.imgOK
      }
    },

    //确认修改头像
    submitHead(user) {
      const _this = this;
      user.userImg = _this.newImg

      console.log(user)

      axios({
        method: 'put',
        url: '/admin/userModify',
        headers: {
          token: _this.token
        },
        data: {
          /*userId: user.userId,
          userImg: user.userImg,
          userAge: user.userAge,
          userEmail: user.userEmail,
          userGender: user.userGender,
          userName: user.userName,
          userNickname: user.userNickname,
          userTel: user.userTel,
          createTime:user.createTime,
          updateTime:user.updateTime,*/
          user:user

        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.getUserList(_this.currentPage, _this.pageSize)
          _this.$message({
            showClose: true,
            type: 'success',
            message: '修改成功!'
          });
        }
        if (resp.data.code === 10001) {
          _this.$message({
            showClose: true,
            type: 'error',
            message: '修改失败!'
          })
        }
      });


    },
  },
  created() {
    this.getUserList(this.pageNum, this.pageSize)
    this.token=this.getCookie('AdminToken')

  }

}
</script>

<style scoped>
#userList {
  width: 1680px;
}
</style>