<template>
  <div>
    <div id="userList">
      <el-table
          :data="usersData"
          border
          height="671px">
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
            label="用户名">
        </el-table-column>

        <el-table-column
            prop="userNickname"
            label="用户昵称">
        </el-table-column>

        <el-table-column
            prop="userPwd"
            label="用户密码"
            width="100">
          <template>
            <span>******</span>
          </template>
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
          <template width="90" slot-scope="scope">
            <span v-show="scope.row.userGender==='male'">男</span>
            <span v-show="scope.row.userGender==='female'">女</span>
            <span v-show="scope.row.userGender===''">保密</span>
          </template>
        </el-table-column>

        <el-table-column
            prop="userTel"
            label="用户电话">
        </el-table-column>

        <el-table-column
            prop="userEmail"
            label="用户邮箱"
            width="200">
        </el-table-column>

        <el-table-column
            prop="createTime"
            label="创建时间"
            width="220">
        </el-table-column>

        <el-table-column
            prop="updateTime"
            label="最后更新时间"
            width="220">
        </el-table-column>

        <el-table-column
            fixed="right"
            label="操作"
            width="200">
          <template slot="header">
            操作
            <el-button style="margin-left: 10px" type="success" @click="userAddDFVisible=true" icon="el-icon-plus"
                       circle></el-button>
          </template>
          <template slot-scope="scope">
            <el-button @click="editUser(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>

            <el-button @click="deleteUser(scope.row.userId)" type="danger" icon="el-icon-delete" circle></el-button>

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

    <div id="user-edit">
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible" :modal-append-to-body='false'>

        <el-form label-width="80px">
          <el-form-item label="头像">
            <img style="width: 200px; height: 200px" :src="headImg" class="avatar">
            <el-upload
                class="avatar-uploader"
                :action="this.baseUrl+'/user/uploadimg'"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess">
              <el-button slot="trigger" style="margin-right:20px ">选择文件</el-button>
              <el-button type="success" :disabled="imgNotOK" @click="submitHead(user)">确认上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>

        <el-form :model="user">
          <el-form-item label="用户ID" disabled prop="userId">
            <el-input v-model="user.userId" disabled></el-input>
          </el-form-item>
          <el-form-item label="创建时间" disabled prop="updateTime">
            <el-input v-model="user.updateTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="更新时间" disabled prop="updateTime">
            <el-input v-model="user.updateTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户密码" disabled prop="userPwd">
            <el-input v-model="user.userPwd"></el-input>
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
          <el-button type="primary" @click="userModify(user)">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id="user-add">
      <el-dialog title="用户注册" :visible.sync="userAddDFVisible" :modal-append-to-body='false'>

        <el-form :model="userForm">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="userForm.userName" placeholder="请输入用户姓名"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" disabled prop="userPwd">
            <el-input v-model="userForm.userPwd" placeholder="请输入用户密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userAddDFVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser(userForm)">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import {setCookie} from "@/utils/cookie";

export default {
  name: "AdminUsersInfo",
  data() {
    return {
      //菜单活动标签索引
      activeIndex2: '1',

      //用户表
      usersData: [
        {
          userId: '1',
          userImg: 'headDefault.jpg',
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

      //用户信息修改dialog
      dialogFormVisible: false,
      formLabelWidth: '120px',

      //用户添加dialog
      userAddDFVisible: false,

      //编辑单个用户数据
      user: {
        userId: '1',
        userImg: 'headDefault.jpg',
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

      //添加用户表
      userForm: {
        userName: '',
        userPwd: ''
      },

      //切换确认上传按钮可用状态
      imgNotOK: true,

      //
      nowImg: '',
      //头像是否修改的中间变量

      headImg: '',

    }
  },

  methods: {

    //添加用户方法
    addUser(userForm) {
      const _this = this
      axios({
        method: 'post',
        url: '/user/regist',
        params: {
          name: userForm.userName,
          pwd: userForm.userPwd
        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.userAddDFVisible = false
          _this.$message({
            type: 'success',
            message: _this.userForm.userName + ' 注册成功!'
          })
          setTimeout(() => {
            _this.getUserList(_this.currentPage, _this.pageSize)
          }, 1500);
        }
        if (resp.data.code === 10001) {
          _this.$message({
            type: 'error',
            message: resp.data.msg
          })
        }
      });
    },

    //每页xx条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      const _this = this
      _this.pageSize = val;
      // console.log(this.pageSize)
      _this.page(_this.currentPage, val)

    },

    //分页（页码翻页部分）
    page(currentPage) {
      const _this = this
      _this.currentPage = currentPage
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
          _this.usersData = resp.data.data.list.filter(user=>{
            //格式化日期显示 原格式ISO日期
            user.createTime=this.moment(user.createTime).format("YYYY年MM月DD日 HH:mm:ss")
            user.updateTime=this.moment(user.updateTime).format("YYYY年MM月DD日 HH:mm:ss")

            return user
          })
          _this.total = resp.data.data.total
          // console.log(resp.data.data.list)
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

    //显示编辑用户dialog
    editUser(user) {
      const _this = this
      _this.dialogFormVisible = true
      _this.user = user
      _this.user.userPwd = '******'
      _this.headImg = this.headImgUrl + _this.user.userImg
    },

    //根据id删除用户
    deleteUser(id) {
      console.log(id)
      const _this = this
      _this.$confirm('您确定要删除当前用户吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'delete',
          url: '/admin/userDelete',
          headers: {
            token: _this.token
          },
          params: {
            id: id,
          }
        }).then((resp) => {
          if (resp.data.code === 10000) {
            _this.$message({
              showClose: true,
              type: 'success',
              message: resp.data.msg
            })
            setTimeout(() => {
              _this.getUserList(_this.currentPage, _this.pageSize)
              _this.dialogFormVisible = false
            }, 1500);
          }
          if (resp.data.code === 10001) {
            _this.$message({
              showClose: true,
              type: 'error',
              message: resp.data.msg
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

    //头像上传检查
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },

    //头像上传回显
    handleAvatarSuccess(res) {
      const _this = this
      if (res.code === 10000) {
        _this.imgNotOK = false
        _this.headImg = this.headImgUrl + res.data
        _this.newImg = res.data
      }
      if (res.code === 10001) {
        this.$message.error(res.msg);
      }
    },

    //确认修改头像
    submitHead(user) {
      const _this = this;
      user.userImg = _this.newImg

      // console.log(user)

      axios({
        method: 'put',
        url: '/admin/userModify',
        headers: {
          token: _this.token
        },
        data: {
          userId: user.userId,
          userImg: user.userImg,
          userAge: user.userAge,
          userEmail: user.userEmail,
          userGender: user.userGender,
          userName: user.userName,
          userNickname: user.userNickname,
          userTel: user.userTel,
          userPwd: user.userPwd

        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.getUserList(_this.currentPage, _this.pageSize)
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

    //用户信息修改
    userModify(user) {
      const _this = this
      _this.$confirm('您确定要修改为当前信息吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'put',
          url: '/admin/userModify',
          headers: {
            token: _this.token
          },
          data: {
            userId: user.userId,
            userAge: user.userAge,
            userEmail: user.userEmail,
            userGender: user.userGender,
            userImg: user.userImg,
            userName: user.userName,
            userNickname: user.userNickname,
            userTel: user.userTel,
            userPwd: user.userPwd
          }
        }).then((resp) => {
          if (resp.data.code === 10000) {

            _this.$message({
              showClose: true,
              type: 'success',
              message: resp.data.msg
            })
            setTimeout(() => {
              _this.getUserList(_this.currentPage, _this.pageSize)
              _this.dialogFormVisible = false
            }, 1500);
          }
          if (resp.data.code === 10001) {
            _this.$message({
              showClose: true,
              type: 'error',
              message: resp.data.msg
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
  },

  created() {
    this.getUserList(this.pageNum, this.pageSize)
    this.token = this.$getCookie('AdminToken')

  }

}
</script>

<style scoped>
#userList{
  width: auto;
}
#userList >>> .el-table {
  width: 1850px;
}

#user-add >>> .el-dialog {
  width: 300px;
}

</style>