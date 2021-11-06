<template>
  <div>
    <Menu :activeIndex2=activeIndex2
          @form-chage=form></Menu>

    <div id="userBackgroundImg">
      <img :src="userBackgroundImg">
    </div>

    <div id="userAddrInfo">
      <el-card>
        <div style="text-align: center;opacity: 0.75;margin: 20px auto;">
          <a style="font-size: x-large;">地址管理</a>
          <br>
          <br>
          <el-button type="success" @click="showAddAddr(form.userId)" round>添加地址</el-button>
        </div>

        <div v-for="userAddr in userAddresses">
          <div style="float:left">
            <el-card style="height:120px;width:auto;margin-left: 10px;margin-top: 10px">
              <div style="float:left;width:400px">
                姓名：{{userAddr.receiverName}}<br>
                地址：{{userAddr.receiverAddr}}<br>
                电话：{{userAddr.receiverTel}}<br>
              </div>
              <div style="float:left;margin-left: 10px;line-height:90px">
                <el-button type="primary" icon="el-icon-edit" @click="showUpdateAddr(userAddr)" circle></el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteAddr(userAddr.addrId)" circle></el-button>
              </div>
            </el-card>
          </div>
        </div>

        <div style="float:left">
          <br>
          <el-pagination
              background
              layout="total, prev, pager, next"
              :page-size=pageSize
              :total=total
              @current-change=page
              @size-change="handleSizeChange">
          </el-pagination>
          <br>
        </div>
      </el-card>
    </div>

    <div id="userAddr-edit">
      <el-dialog title="修改收货地址" :visible.sync="addrEditFormVisible" :modal-append-to-body='false' :close-on-click-modal='false'>
        <el-form :model="userAddress">
          <el-form-item label="收货人姓名">
            <el-input v-model="userAddress.receiverName" placeholder="请输入收货人姓名"></el-input>
          </el-form-item>
          <el-form-item label="收货人地址">
            <el-input v-model="userAddress.receiverAddr" placeholder="请输入收货人地址"></el-input>
          </el-form-item>
          <el-form-item label="收货人电话">
            <el-input v-model="userAddress.receiverTel" placeholder="请输入收货人电话"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="updateUserAddress(userAddress)">确认修改</el-button>
      </el-dialog>
    </div>

    <div id="userAddr-add">
      <el-dialog title="添加收货地址" :visible.sync="addrAddFormVisible" :modal-append-to-body='false' :close-on-click-modal='false'>
        <el-form :model="userAddress">
          <el-form-item label="收货人姓名">
            <el-input v-model="userAddress.receiverName" placeholder="请输入收货人姓名"></el-input>
          </el-form-item>
          <el-form-item label="收货人地址">
            <el-input v-model="userAddress.receiverAddr" placeholder="请输入收货人地址"></el-input>
          </el-form-item>
          <el-form-item label="收货人电话">
            <el-input v-model="userAddress.receiverTel" placeholder="请输入收货人电话"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="addUserAddress(userAddress)">确认添加</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/Menu";
import {setCookie} from "@/utils/cookie";

export default {
  name: "UserAddr",

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

      //上传回显头像
      _this.headImg = this.headImgUrl + _this.form.userImg

      //获取用户地址
      _this.getUserAddresses(_this.pageNum, _this.pageSize)

    } else {
      this.$router.push('/UserLogin');
      _this.$message({
        showClose: true,
        type: 'info',
        message: '您未登录，请先登录'
      });
    }
  },

  data() {
    return {
      //菜单活动标签索引
      activeIndex2: '6-4',
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
      imgNotOK: true,
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
      //用户地址
      userAddress: {
        addrId: '',
        userId: '',
        receiverName: '',
        receiverTel: '',
        receiverAddr: '',
        createTime: '',
        updateTime: '',
      },
      userAddresses: [
        {
          addrId: '',
          userId: '',
          receiverName: '',
          receiverTel: '',
          receiverAddr: '',
          createTime: '',
          updateTime: '',
        },
      ],

      //分页 ↓
      //查询数据总数
      total: 1,
      //当前分页页数
      currentPage: 1,
      //每页数据个数
      pageSize: 5,
      //分页 ↑
      //第一页 点击分类菜单调用pageNum（不写这个变量，方法里直接传1也可以）
      pageNum: 1,

      //编辑用户地址dialog
      addrEditFormVisible:false,

      //添加用户地址dialog
      addrAddFormVisible:false,
    }
  },

  methods: {
    //分页（页码翻页部分）
    page(currentPage) {
      const _this = this
      _this.currentPage = currentPage
      this.getUserAddresses(currentPage, _this.pageSize)
    },

    //每页xx条handle
    handleSizeChange(val) {
      const _this = this
      _this.pageSize = val;
      _this.page(_this.currentPage, val)
    },

    //分页获取用户地址
    getUserAddresses(pageNum, pageSize) {
      const _this = this
      axios({
        method: 'get',
        url: '/userAddr/pageList',
        params: {
          pageNum: pageNum,
          pageSize: pageSize,
          userId:_this.form.userId,
        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.userAddresses = resp.data.data.list
          _this.total = resp.data.data.total
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

    //编辑地址信息
    showUpdateAddr(userAddr){
      const _this=this
      _this.userAddress=userAddr
      _this.addrEditFormVisible=true
    },

    //修改用户地址
    updateUserAddress(userAddress){
      const _this = this
      _this.$confirm('您确定要修改当前地址信息吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'put',
          url: '/userAddr/modify',
          data: {
            addrId: userAddress.addrId,
            createTime:null,
            receiverAddr:userAddress.receiverAddr,
            receiverName:userAddress.receiverName,
            receiverTel:userAddress.receiverTel,
            updateTime:null,
            userId: userAddress.userId,
          }
        }).then((resp) => {
          if (resp.data.code === 10000) {
            _this.$message({
              showClose: true,
              type: 'success',
              message: resp.data.msg
            })
            setTimeout(() => {
              _this.getUserAddresses(_this.currentPage, _this.pageSize)
              _this.addrEditFormVisible = false
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

    //显示添加用户地址
    showAddAddr(userId){
      const _this=this
      _this.userAddress.userId=userId
      _this.addrAddFormVisible=true
    },

    //添加用户地址
    addUserAddress(userAddress){
      const _this = this
      _this.$confirm('您确定要添加当前地址信息吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        console.log(userAddress.receiverAddr)
        console.log(userAddress.receiverName)
        axios({
          method: 'post',
          url: '/userAddr/add',
          data: {
            addrId: null,
            createTime:null,
            receiverAddr:userAddress.receiverAddr,
            receiverName:userAddress.receiverName,
            receiverTel:userAddress.receiverTel,
            updateTime:null,
            userId: _this.userAddress.userId,
          }
        }).then((resp) => {
          if (resp.data.code === 10000) {
            _this.$message({
              showClose: true,
              type: 'success',
              message: resp.data.msg
            })
            setTimeout(() => {
              _this.getUserAddresses(_this.currentPage, _this.pageSize)
              _this.addrAddFormVisible = false
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

    //删除用户地址
    deleteAddr(addrId){
      const _this = this
      _this.$confirm('您确定要删除当前地址信息吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'delete',
          url: '/userAddr/delete',
          params: {
            userAddrId: addrId,
          }
        }).then((resp) => {
          if (resp.data.code === 10000) {
            _this.$message({
              showClose: true,
              type: 'success',
              message: resp.data.msg
            })
            setTimeout(() => {
              _this.getUserAddresses(_this.currentPage, _this.pageSize)
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

}
</script>

<style scoped>
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

#userAddrInfo{
  width:auto;
  position: absolute;
  z-index: 2;
  margin-top: 10px;
  margin-left:200px;
}
</style>