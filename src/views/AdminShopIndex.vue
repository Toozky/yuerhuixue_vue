<template>
  <el-container>


    <div id="admin-menu">
      <AdminMenu :activeIndex2=activeIndex2
                 @admin-nickname-change=form.adminNickname
                 @circle-url-change=circleUrl></AdminMenu>
    </div>


    <div id="admin-aside">
      <el-aside width="201px" style="float: left">
        <div style="width: 200px;background-color: #222222">
          <el-menu
              router
              style="width: 200px;"
              default-active="2"
              @open="handleOpen"
              @close="handleClose"
              background-color="#222222"
              text-color="#fff"
              active-text-color="#fff"
              default-openeds="商品管理"
              :default-active="$route.path">

            <el-menu-item
                style="margin-top:60px;"
                index="/AdminShopIndex/AdminShopMain"
                :class="$route.path==='/AdminShopIndex/AdminShopMain'?'is-active':''">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <el-submenu
                v-for="(shoproute,index1) in shopRouterList"
                :index="shoproute.name+''"
                :key="index1">
              <template slot="title">
                <i :class="shoproute.icon"></i>
                <span>{{ shoproute.name }}</span>
              </template>
              <el-menu-item
                  v-for="(shoproutechild,index2) in shoproute.children"
                  :index="shoproute.path+'/'+shoproutechild.path"
                  :key="index1+'-'+index2"
                  v-show="shoproutechild.show"
                  :class="$route.path===shoproute.path+'/'+shoproutechild.path?'is-active':''">
                <i :class="shoproutechild.icon"></i>
                <span slot="title">{{ shoproutechild.name }}</span>
              </el-menu-item>
            </el-submenu>

            <!--            <el-submenu index="1">
                          <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                          </template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                            <el-menu-item index="1-3">选项3</el-menu-item>
                          <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                          </el-submenu>
                        </el-submenu>
                        <el-menu-item index="2">
                          <i class="el-icon-menu"></i>
                          <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="3" disabled>
                          <i class="el-icon-document"></i>
                          <span slot="title">导航三</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                          <i class="el-icon-setting"></i>
                          <span slot="title">导航四</span>
                        </el-menu-item>-->

          </el-menu>
        </div>
      </el-aside>

      <el-main style="height: 850px;margin-top:60px;">
        <router-view></router-view>
      </el-main>
    </div>



  </el-container>
</template>

<script>
import AdminMenu from '@/components/AdminMenu'
export default {
  name: "AdminShopIndex",
  components: {
    AdminMenu,
  },
  data() {
    return {
      circleUrl:'',
      formInline: {
        img: ''
      },
      activeIndex2: '2',
      form: {
        adminId: '',
        adminImg: '',
        adminName: '',
        adminNickname: '',
        adminPwd: '',
        adminCreateTime: '',
        adminUpdateTime: ''
      },
      shopRouterList:[],
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    //获取AdminShopIndex的子路由列表
    let ShopIndex = this.$router.options.routes.filter(result => {
      if(result.path ==="/AdminShopIndex"){
        return result;
      }
    })
    console.log(ShopIndex)
    this.shopRouterList=ShopIndex;
  }
}
</script>

<style scoped>
/*菜单选中背景*/
.el-menu-item.is-active {
  background-color: #09B4C5 !important;
}
#admin-menu{
  width: 100%;
  position: absolute;
  z-index: 2;
}
#admin-menu >>> .el-menu{
  border-bottom:0px ;
}

#admin-aside{

}

/*菜单高100%*/
.el-menu {
  height: 100vh;
  position: relative;
  z-index: 1;
}
</style>