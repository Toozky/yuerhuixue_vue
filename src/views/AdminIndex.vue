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
                default-openeds="管理员管理"
                :default-active="$route.path">
              <el-menu-item
                  style="margin-top:60px;"
                  index="/AdminIndex/AdminMainPage"
                            :class="$route.path==='/AdminIndex/AdminMainPage'?'is-active':''">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
              </el-menu-item>
              <el-submenu
                  v-for="(adminroute,index1) in adminRouterList"
                  :index="adminroute.name+''"
                  :key="index1"
                  >
                <template slot="title">
                  <i :class="adminroute.icon"></i>
                  <span>{{ adminroute.name }}</span>
                </template>
                <el-menu-item
                    v-for="(adminroutechild,index2) in adminroute.children"
                    :index="adminroute.path+'/'+adminroutechild.path"
                    :key="index1+'-'+index2"
                    v-show="adminroutechild.show"
                    :class="$route.path===adminroute.path+'/'+adminroutechild.path?'is-active':''">
                  <i :class="adminroutechild.icon"></i>
                  <span slot="title">{{ adminroutechild.name }}</span>
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

        <el-main style="height: auto;width:auto;padding-top:60px;">
          <router-view></router-view>
        </el-main>
      </div>



  </el-container>
</template>

<script>
import AdminMenu from '@/components/AdminMenu'

export default {
  name: "AdminIndex",
  components: {
    AdminMenu,
  },
  data() {
    return {
      verticalMenu: false,

      circleUrl:'',
      formInline: {
        img: ''
      },
      activeIndex2: '1',
      form: {
        adminId: '',
        adminImg: '',
        adminName: '',
        adminNickname: '',
        adminPwd: '',
        adminCreateTime: '',
        adminUpdateTime: ''
      },
      adminRouterList:[],
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
    //获取AdminIndex的子路由列表
    let adminIndex = this.$router.options.routes.filter(result => {
      if(result.path ==="/AdminIndex"){
        return result;
      }
    })
    this.adminRouterList=adminIndex;
    // console.log(this.adminRouterList)
    // console.log(this.adminRouterList[0].name)

    // this.test()
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