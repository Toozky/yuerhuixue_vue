<template>
  <div>
    <div id="insTypeList">
      <el-table
          :data="insTypesData"
          border
          height="671px">
        <el-table-column
            fixed
            prop="typeId"
            label="类型ID"
            width="100">
        </el-table-column>

        <el-table-column
            prop="typeImg"
            label="类型图片"
            width="120">
          <template width="90" slot-scope="scope">
            <img style="width:90px;height: 90px" :src="insTypeImgUrl+scope.row.typeImg">
          </template>
        </el-table-column>

        <el-table-column
            prop="typeName"
            label="类型名"
            width="150">
        </el-table-column>

        <el-table-column
            prop="typeDesc"
            label="类型描述"
            width="600">
        </el-table-column>

        <el-table-column
            prop="typeLevel"
            label="类型等级"
            width="100">
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
            width="200">
          <template slot="header">
            操作
            <el-button style="margin-left: 10px" type="success" @click="showAddInsType" icon="el-icon-plus"
                       circle></el-button>
          </template>
          <template slot-scope="scope">
            <el-button @click="editInsType(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>

            <el-button @click="deleteInsType(scope.row.typeId)" type="danger" icon="el-icon-delete" circle></el-button>
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

    <div id="insType-edit">
      <el-dialog title="乐器类型信息" :visible.sync="editInsTypeFormVisible" :modal-append-to-body='false'>

        <el-form label-width="80px">
          <el-form-item label="类型图片">
            <img style="width: 200px; height: 200px" :src="insTypeImg" class="avatar">
            <el-upload
                class="avatar-uploader"
                :action="this.baseUrl+'/insType/uploadimg'"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess">
              <el-button slot="trigger" style="margin-right:20px ">选择文件</el-button>
              <el-button type="success" :disabled="imgNotOK" @click="modifyInsTypeImg(insType)">确认上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>

        <el-form :model="insType">
          <el-form-item label="类型ID" disabled prop="typeId">
            <el-input v-model="insType.typeId" disabled></el-input>
          </el-form-item>
          <el-form-item label="创建时间" disabled prop="updateTime">
            <el-input v-model="insType.createTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="更新时间" disabled prop="updateTime">
            <el-input v-model="insType.updateTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="类型描述" prop="typeDesc">
            <el-input v-model="insType.typeDesc"></el-input>
          </el-form-item>
          <el-form-item label="类型名" prop="typeName">
            <el-input v-model="insType.typeName" placeholder="请输入乐器类型名"></el-input>
          </el-form-item>
          <el-form-item label="等级" prop="typeLevel">
            <el-input v-model="insType.typeLevel" placeholder="请输入乐器类型等级"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editInsTypeFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="insTypeModify(insType)">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id="insType-add">
      <el-dialog title="乐器类型添加" :visible.sync="insTypeAddDFVisible" :modal-append-to-body='false'>

        <el-form label-width="80px">
          <el-form-item label="类型图片">
            <img style="width: 200px; height: 200px" :src="insTypeImg" class="avatar">
            <el-upload
                class="avatar-uploader"
                :action="this.baseUrl+'/insType/uploadimg'"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess">
              <el-button slot="trigger" style="margin-right:20px ">选择文件</el-button>
              <el-button type="success" :disabled="imgNotOK" @click="submitInsTypeImg(insTypeForm)">确认上传</el-button>
              <br>
              <el-button style="margin-top: 20px" @click="resetImg">恢复默认</el-button>
            </el-upload>
          </el-form-item>
        </el-form>

        <el-form :model="insTypeForm">
          <el-form-item label="类型名" prop="typeName">
            <el-input v-model="insTypeForm.typeName" placeholder="请输入乐器类型名"></el-input>
          </el-form-item>
          <el-form-item label="类型描述" prop="typeDesc">
            <el-input v-model="insTypeForm.typeDesc" placeholder="请输入乐器类型描述"></el-input>
          </el-form-item>
          <el-form-item label="类型等级" prop="typeLevel">
            <el-input v-model="insTypeForm.typeLevel" placeholder="请输入乐器类型等级等级"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="insTypeAddDFVisible = false">取 消</el-button>
          <el-button type="primary" @click="addInsType(insTypeForm)">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  name: "AdminInsType",

  data() {
    return {
      //菜单活动标签索引
      activeIndex2: '1',

      //乐器类型表
      insTypesData: [
        {
          typeId: '',
          typeName: '',
          typeImg: this.defaultImgName,
          typeDesc: '',
          typeLevel: '',
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

      //编辑乐器类型dialog
      editInsTypeFormVisible: false,
      formLabelWidth: '120px',

      //添加乐器dialog
      insTypeAddDFVisible: false,

      //添加乐器类型数据
      insTypeForm: {
        typeName: '',
        typeImg: this.defaultImgName,
        typeDesc: '',
        typeLevel: '',
        createTime: '',
        updateTime: '',
      },

      //单个乐器类型数据
      insType: {
        typeId: '',
        typeName: '',
        typeImg: '',
        typeDesc: '',
        typeLevel: '',
        createTime: '',
        updateTime: '',
      },

      //切换确认上传按钮可用状态
      imgNotOK: true,

      //类型图片是否修改的中间变量
      nowImg: '',

      //类型图片链接
      insTypeImg: '',

    }
  },

  methods: {
    //分页获取乐器类型列表
    getInsTypeList(pageNum, pageSize) {
      const _this = this
      axios({
        method: 'get',
        url: '/insType/pageList',
        params: {
          pageNum: pageNum,
          pageSize: pageSize
        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.insTypesData = resp.data.data.list.filter(insType=>{
            //格式化日期显示 原格式ISO日期
            insType.createTime=this.moment(insType.createTime).format("YYYY年MM月DD日 HH:mm:ss")
            insType.updateTime=this.moment(insType.updateTime).format("YYYY年MM月DD日 HH:mm:ss")

            return insType
          })
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

    //分页（页码翻页部分）
    page(currentPage) {
      const _this = this
      _this.currentPage = currentPage
      this.getInsTypeList(currentPage, _this.pageSize)
    },

    //每页xx条handle
    handleSizeChange(val) {
      const _this = this
      _this.pageSize = val;
      _this.page(_this.currentPage, val)
    },

    //显示编辑dialog
    editInsType(insType) {
      const _this = this
      _this.editInsTypeFormVisible = true
      _this.insType = insType
      _this.insTypeImg = this.insTypeImgUrl + _this.insType.typeImg
    },

    //显示乐器类型添加dialog
    showAddInsType() {
      const _this = this
      _this.insTypeAddDFVisible = true
      _this.insTypeImg = this.insTypeImgUrl + this.defaultImgName
    },

    //类型图片上传检查
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传乐器类型图片大小不能超过 2MB!');
      }
      return isLt2M;
    },

    //类型图片上传回显
    handleAvatarSuccess(res) {
      const _this = this
      if (res.code === 10000) {
        _this.imgNotOK = false
        _this.insTypeImg = this.insTypeImgUrl + res.data
        _this.newImg = res.data
      }
      if (res.code === 10001) {
        this.$message.error(res.msg);
      }
    },

    //确认修改类型图片
    modifyInsTypeImg(insType) {
      const _this = this;
      insType.typeImg = _this.newImg

      axios({
        method: 'put',
        url: '/insType/modify',
        headers: {
          token: _this.token
        },
        data: {
          typeId: insType.typeId,
          typeName: insType.typeName,
          typeImg: insType.typeImg,
          typeDesc: insType.typeDesc,
          typeLevel: insType.typeLevel,
          createTime: insType.createTime,
          updateTime: insType.updateTime,
          // insType: insType
        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.getInsTypeList(_this.currentPage, _this.pageSize)
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

    //乐器类型信息修改
    insTypeModify(insType) {
      const _this = this

      _this.$confirm('您确定要修改为当前信息吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'put',
          url: '/insType/modify',
          headers: {
            token: _this.token
          },
          data: {
            typeId: insType.typeId,
            typeName: insType.typeName,
            typeImg: insType.typeImg,
            typeDesc: insType.typeDesc,
            typeLevel: insType.typeLevel,
            createTime: insType.createTime,
            updateTime: insType.updateTime,
          }
        }).then((resp) => {
          if (resp.data.code === 10000) {

            _this.$message({
              showClose: true,
              type: 'success',
              message: resp.data.msg
            })
            setTimeout(() => {
              _this.getInsTypeList(_this.currentPage, _this.pageSize)
              _this.editInsTypeFormVisible = false
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

    //根据id删除乐器类型
    deleteInsType(id) {
      const _this = this
      _this.$confirm('您确定要删除当前乐器类型吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'delete',
          url: '/insType/delete',
          headers: {
            token: _this.token
          },
          params: {
            insTypeId: id,
          }
        }).then((resp) => {
          if (resp.data.code === 10000) {
            _this.$message({
              showClose: true,
              type: 'success',
              message: resp.data.msg
            })
            setTimeout(() => {
              _this.getInsTypeList(_this.currentPage, _this.pageSize)
              _this.editInsTypeFormVisible = false
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

    //确认上传乐器类型图片
    submitInsTypeImg(insType) {
      const _this = this
      insType.typeImg = _this.newImg
    },

    //重置乐器类型图片
    resetImg() {
      const _this = this
      _this.insType.typeImg = this.defaultImgName
      _this.insTypeImg = this.insTypeImgUrl + this.defaultImgName
    },

    //添加乐器类型
    addInsType(insTypeForm) {
      const _this = this
      axios({
        method: 'post',
        url: '/insType/add',
        data: {
          typeName: insTypeForm.typeName,
          typeImg: insTypeForm.typeImg,
          typeDesc: insTypeForm.typeDesc,
          typeLevel: insTypeForm.typeLevel,


        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.insTypeAddDFVisible = false
          _this.$message({
            type: 'success',
            message: resp.data.msg
          })
          setTimeout(() => {
            _this.getInsTypeList(_this.currentPage, _this.pageSize)
          }, 1500);
        }
        if (resp.data.code === 10001) {
          _this.$message({
            type: 'error',
            message: resp.data.msg
          })
        }
      });
    }

  },

  created() {
    //分页获取乐器类型列表
    this.getInsTypeList(this.pageNum, this.pageSize)
  }

}
</script>

<style scoped>
#insTypeList >>> .el-table {
  width: 1850px;
}

#insType-add >>> .el-dialog {
  width: 600px;
}
</style>
