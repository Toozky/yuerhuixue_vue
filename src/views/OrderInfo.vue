<template>
  <div>
    <Menu :activeIndex2=activeIndex2 :form=form></Menu>

    <div id="user-order">
      <el-card>
        <div style="text-align: center;opacity: 0.75;margin: 20px auto;">
          <a style="font-size: x-large;">我的订单</a>
          <br>
          <br>
          <div v-for="(userOrder,index) in orderInfo">
            <el-card>
              订单{{ index + 1 }}<br>
              购买物品名称：{{ userOrder.allGoods }}丨收货人：{{ userOrder.receiverName }}丨收货电话：{{
                userOrder.receiverTel
              }}丨收货地址：{{ userOrder.receiverAddr }}丨实付：￥{{ userOrder.actualAmount }}元<br><br>
              <div v-for="orderDetail in userOrder.orderDetailList">
                <el-card>
                  <div style="float: left;width:160px">
                    <img style="width:160px;height:160px" :src="insImgUrl+orderDetail.insImg">
                  </div>
                  <div style="float: left;text-align: left;">

                    <p>商品名称：{{ orderDetail.insName }}</p>
                    <p>商品单价：{{ orderDetail.insPrice }}</p>
                    <p>购买数量：{{ orderDetail.buyNumber }}</p>
                    <p>商品总价：{{ orderDetail.totalAmount }}</p>

                  </div>
                </el-card>
                <br>
              </div>
            </el-card>
            <br>
          </div>
        </div>
        <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size=pageSize
            :total=total
            @current-change=page
            @size-change="handleSizeChange">
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  name: "OrderInfo",
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

      //菜单显示头像
      _this.circleUrl = this.headImgUrl + _this.form.userImg

      //获取订单
      _this.getOrderInfo(_this.pageNum, _this.pageSize)
    }
  },

  data() {
    return {
      //菜单活动标签索引
      activeIndex2: '5',
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

      orderInfo: {
        orderId: 0,
        userId: 0,
        allGoods: '',
        receiverName: '',
        receiverTel: '',
        receiverAddr: '',
        totalAmount: 0,
        actualAmount: 0,
        payType: '',
        orderRemark: '',
        status: '',
        createTime: '',
        updateTime: '',
        payTime: '',
        deliverTime: '',
        receiptTime: '',
        finishTime: '',
        orderDetailList: [
          {
            detailId: null,
            orderId: null,
            insId: null,
            insName: '',
            insImg: '',
            insPrice: '',
            buyNumber: '',
            totalAmount: ''
          },
        ],
      },

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
    }
  },

  methods: {
    //分页（页码翻页部分）
    page(currentPage) {
      const _this = this
      _this.currentPage = currentPage
      this.getOrderInfo(currentPage, _this.pageSize)
    },

    //每页xx条handle
    handleSizeChange(val) {
      const _this = this
      _this.pageSize = val;
      _this.page(_this.currentPage, val)
    },
    //获取订单
    getOrderInfo(pageNum, pageSize) {
      const _this = this
      axios({
        method: 'get',
        url: '/order/list',
        params: {
          pageNum: pageNum,
          pageSize: pageSize,
          userId: _this.form.userId,
        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.orderInfo = resp.data.data.list
          _this.total = resp.data.data.total
        }
        if (resp.data.code === 10001) {
          _this.$message({
            showClose: true,
            message: resp.data.msg,
            type: 'error'
          });
        }
      });
    }
  }


}
</script>

<style scoped>
#user-order {
  width: 1200px;
  margin: 75px auto;
}
</style>