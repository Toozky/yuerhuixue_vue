<template>
  <el-container>


    <div id="admin-menu">
      <AdminMenu :activeIndex2=activeIndex2
                 @admin-nickname-change=form.adminNickname
                 @circle-url-change=circleUrl></AdminMenu>
    </div>


    <div id="admin-aside">
      <el-aside style="height: auto;width: auto">
        <div>
          <el-menu
              :collapse="verticalMenu"
              class="el-menu-vertical-demo"
              router
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

          </el-menu>
        </div>
      </el-aside>
      <el-main style="height: auto;width:auto;padding-top:60px;">
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
      verticalMenu: false,

      circleUrl: '',
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
      shopRouterList: [],
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
      if (result.path === "/AdminShopIndex") {
        return result;
      }
    })
    this.shopRouterList = ShopIndex;

    const bus = this.$bus
    const _this = this
    bus.$on('verticalMenuChange', (verticalMenu) => {
      _this.verticalMenu = verticalMenu
    })
  }
}
</script>

<style scoped>
/*横向菜单*/
#admin-menu {
  width: 100%;
  position: absolute;
  z-index: 2;
}

#admin-menu >>> .el-menu {
  border-bottom: 0px;
}

/*菜单高100%*/
.el-menu {
  height: 100vh;
}

/*菜单选中背景*/
.el-menu-item.is-active {
  background-color: #09B4C5 !important;
}
.el-container{
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}
.el-aside {
  float: left;
  background-color: #222222;
  position: relative;
  z-index: 1;
}
.el-main {
  width: max-content;
  position: relative;
  z-index: 1;
}

/*纵向菜单展开折叠*/
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>