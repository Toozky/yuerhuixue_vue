<template>
  <div>

    <Menu :activeIndex2=activeIndex2 :form=form></Menu>

    <div id="shoppingCartList">
      <el-card>
        <div style="text-align: center;opacity: 0.75;margin: 20px auto;">
          <a style="font-size: x-large;">我的购物车</a>
          <br>
          <br>
        </div>

        <div v-for="cart in shoppingCartList">
          <el-card>
            <div style="float:left;width:160px;">
              <img style="width:160px;height:160px" :src="insImgUrl+cart.ins.insImg">
            </div>
            <div style="float: left;width: 650px;">
              名称：{{ cart.ins.insName }}<br>
              单价：{{ cart.ins.insPrice }}<br>
              总价：{{ cart.ins.insPrice * cart.cartNumber }}<br>
            </div>
            <div style="float:left;line-height: 150px">
              数量：
              <el-button-group>
                <el-button :disabled="cart.cartNumber===1?true:false" icon="el-icon-minus"
                           @click="--cart.cartNumber,modifyCart(cart.cartId,cart.cartNumber)"
                           circle
                ></el-button>
                <el-button style="width:80px">{{ cart.cartNumber }}</el-button>
                <el-button icon="el-icon-plus"
                           @click="++cart.cartNumber,modifyCart(cart.cartId,cart.cartNumber)"
                           circle></el-button>
              </el-button-group>
              <el-button style="margin-left:20px;" type="danger" icon="el-icon-delete"
                         @click="deleteCart(cart.cartId)"
                         circle></el-button>
            </div>
          </el-card>
          <br>
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

    <div id="buyerInfo">
      <el-card>
        <div style="float:left;width:1000px;">
          <div style="margin-top: 20px;">
            <el-dropdown>
  <span class="el-dropdown-link" style="font-size: medium;margin-left: 20px;margin-bottom: 20px">
    配送至<i class="el-icon-arrow-down el-icon--right"></i><br>
  </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    v-for="address in userAddr"
                    :index="address.addrId"
                    :key="address.addrId"
                    @click.native="
                      ckeckAddr(address.receiverAddr),
                      receiverNameChecked=address.receiverName,
                      receiverTelChecked=address.receiverTel">
                  {{ address.receiverAddr }}
                </el-dropdown-item>
                <el-dropdown-item></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <br>
          <div style="margin: 20px">收货人：{{ receiverNameChecked }}</div>
          <div style="margin: 20px">电话：{{ receiverTelChecked }}</div>
          <div style="margin: 20px">收货地址：{{ receiverAddrChecked }}</div>
        </div>

        <div style="float: left">
          <el-button style="margin-top:80px" type="success" @click="buyGoods" round>购买</el-button>
        </div>

      </el-card>
    </div>

  </div>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  name: "ShoppingCart",
  components: {
    Menu,
  },
  data() {
    return {
      //菜单活动标签索引
      activeIndex2: '6-1',
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

      //用户购物车列表
      shoppingCartList: [
        {
          cartId: null,
          cartNumber: 1,
          userId: null,
          createTime: null,
          ins: {
            insId: null,
            insName: '',
            insImg: '',
            insDesc: '',
            insBrand: '',
            insPrice: '',
            insStock: '',
            typeId: '',
            createTime: '',
            updateTime: '',
          }
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

      //用户地址表
      userAddr: [
        {
          addrId: '',
          userId: '',
          receiverName: '',
          receiverTel: '',
          receiverAddr: '',
        },
      ],
      receiverAddrChecked: '',
      receiverNameChecked: '',
      receiverTelChecked: '',

      //订单表
      orders: {
        orderId: null,
        userId: null,
        allGoods: '',
        receiverName: '',
        receiverTel: '',
        receiverAddr: '',
        totalAmount: 1,
        actualAmount: 1,
        payType: '1',
        orderRemark: '',
        status: '4',
        createTime: null,
        updateTime: null,
        payTime: null,
        deliverTime: null,
        receiptTime: null,
        finishTime: null,
      },

      //订单明细
      orderDetail: {
        detailId: null,
        orderId: null,
        insId: null,
        insName: '',
        insImg: '',
        insPrice: '',
        buyNumber: '',
        totalAmount: '',
      },
      orderDetailList: [],
    }
  },
  methods: {
    //分页（页码翻页部分）
    page(currentPage) {
      const _this = this
      _this.currentPage = currentPage
      this.getShoppingCartList(currentPage, _this.pageSize)
    },

    //每页xx条handle
    handleSizeChange(val) {
      const _this = this
      _this.pageSize = val;
      _this.page(_this.currentPage, val)
    },
    //获取购物车列表
    getShoppingCartList(pageNum, pageSize) {
      const _this = this
      axios({
        method: 'get',
        url: '/shoppingCart/list',
        params: {
          pageNum: pageNum,
          pageSize: pageSize,
          userId: _this.form.userId,
        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          console.log(resp.data.data.list)
          _this.shoppingCartList = resp.data.data.list
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
    },

    //修改购物车商品数量
    modifyCart(cartId, cartNumber) {
      const _this = this
      axios({
        method: 'put',
        url: '/shoppingCart/modify',
        params: {
          cartId: cartId,
          cartNumber: cartNumber,
        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.shoppingCartList = resp.data.data.list
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
    },

    //删除购物车
    deleteCart(cartId) {
      const _this = this
      axios({
        method: 'delete',
        url: '/shoppingCart/delete',
        params: {
          cartId: cartId,
        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.getShoppingCartList(_this.pageNum, _this.pageSize)
        }
        if (resp.data.code === 10001) {
          _this.$message({
            showClose: true,
            message: resp.data.msg,
            type: 'error'
          });
        }
      });
    },

    //选中收货地址
    ckeckAddr(text) {
      const _this = this
      _this.receiverAddrChecked = text
    },

    //购买
    buyGoods() {
      const _this = this
      let orders = _this.orders
      orders.userId = _this.form.userId
      // orders.allGoods = _this.shoppingCartList

      let shoppingCartList = _this.shoppingCartList

      let allGoods = ''
      let totalAmount = 0
      let actualAmount = 0
      for (let j = 0; j < shoppingCartList.length; j++) {
        allGoods += shoppingCartList[j].ins.insName + ','
        totalAmount += shoppingCartList[j].ins.insPrice * shoppingCartList[j].cartNumber
      }
      actualAmount = totalAmount
      orders.allGoods = allGoods
      orders.actualAmount=actualAmount
      orders.totalAmount=totalAmount
      orders.receiverName = _this.receiverNameChecked
      orders.receiverAddr = _this.receiverAddrChecked
      orders.receiverTel = _this.receiverTelChecked

      console.log(orders)

      axios({
        method: 'post',
        url: '/order/addOrder',
        data: {
          orderId: orders.orderId,
          userId: orders.userId,
          allGoods: orders.allGoods,
          receiverName: orders.receiverName,
          receiverTel: orders.receiverTel,
          receiverAddr: orders.receiverAddr,
          totalAmount: orders.totalAmount,
          actualAmount: orders.actualAmount,
          payType: orders.payType,
          orderRemark: orders.orderRemark,
          status: orders.status,
          createTime: orders.createTime,
          updateTime: orders.updateTime,
          payTime: orders.payTime,
          deliverTime: orders.deliverTime,
          receiptTime: orders.receiptTime,
          finishTime: orders.finishTime,
        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          //主订单id
          // console.log(resp.data.data)

          let shoppingCartList = _this.shoppingCartList
          for(let i = 0; i < shoppingCartList.length; i++){
            let orderDetail = new Object
            orderDetail.detailId= 0
            orderDetail.orderId=resp.data.data
            orderDetail.insId=shoppingCartList[i].ins.insId
            orderDetail.insName=shoppingCartList[i].ins.insName
            orderDetail.insImg=shoppingCartList[i].ins.insImg
            orderDetail.insPrice=shoppingCartList[i].ins.insPrice
            orderDetail.buyNumber=shoppingCartList[i].cartNumber
            orderDetail.totalAmount=orderDetail.buyNumber*orderDetail.insPrice
            // console.log(shoppingCartList[i].ins.insName)
            _this.orderDetailList.push(orderDetail)
          }
          console.log(_this.orderDetailList)
          const formData = new FormData
          let orderDetailListToString = JSON.stringify(_this.orderDetailList)
          formData.append('orderDetailListToString', orderDetailListToString)
          axios({
            method: 'post',
            url: '/order/addOrderDetail',
            data: formData,
            headers: {
              'ContentType': 'multipart/form-data',
            }
          }).then((resp) => {
            if (resp.data.code === 10000) {
              _this.getShoppingCartList(_this.pageNum, _this.pageSize)
            }
            if (resp.data.code === 10001) {
              _this.$message({
                showClose: true,
                message: resp.data.msg,
                type: 'error'
              });
            }
          });

          _this.$message({
            showClose: true,
            message: resp.data.msg,
            type: 'success'
          });

        }
        if (resp.data.code === 10001) {
          _this.$message({
            showClose: true,
            message: resp.data.msg,
            type: 'error'
          });
        }
      });
    },
  },
  created() {
    const _this = this
    // 获取登录状态
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
      //获取用户id
      _this.id = _this.form.userId

      //获取购物车列表
      _this.getShoppingCartList(_this.pageNum, _this.pageSize)

      //获取收货地址
      axios({
        method: 'get',
        url: '/userAddr/list',
        params: {
          userId: _this.form.userId
        }
      }).then((resp) => {
        _this.userAddr = resp.data.data
      });

    } else {
      this.$router.push('/UserLogin');
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
#shoppingCartList, #buyerInfo {
  width: 1200px;
  margin: 75px auto;

}

#buyerInfo {
  padding-bottom: 75px;
}
</style>