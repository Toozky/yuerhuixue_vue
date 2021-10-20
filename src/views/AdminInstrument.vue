<template>
  <div>
    <div id="instrumentList">
      <el-table
          :data="instrumentsData"
          border
          height="690px">
        <el-table-column
            fixed
            prop="insId"
            label="乐器ID"
            width="70">
        </el-table-column>

        <el-table-column
            prop="insImg"
            label="乐器图片"
            width="100">
          <template width="90" slot-scope="scope">
            <img style="width:90px;height: 90px" :src="insImgUrl+scope.row.insImg">
          </template>
        </el-table-column>

        <el-table-column
            prop="insName"
            label="乐器名称"
            width="230">
        </el-table-column>

        <el-table-column
            prop="insDesc"
            label="乐器描述"
            width="300">
        </el-table-column>

        <el-table-column
            prop="insBrand"
            label="乐器品牌">
        </el-table-column>

        <el-table-column
            prop="insPrice"
            label="乐器单价">
        </el-table-column>

        <el-table-column
            prop="insStock"
            label="库存">
        </el-table-column>

        <el-table-column
            prop="typeId"
            label="乐器类型">
          <template slot-scope="scope">
            <!--在乐器类型列表中找到类型id相等的乐器类型对象，输出其类型名-->
            <span>{{
                insTypeList.filter(result => {
                  if (result.typeId === scope.row.typeId) {
                    return result
                  }
                })[0].typeName
              }}</span>
          </template>
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
            width="200">
          <template slot="header">
            操作
            <el-button style="margin-left: 10px" type="success" @click="showAddInstrument" icon="el-icon-plus"
                       circle></el-button>
          </template>
          <template slot-scope="scope">
            <el-button @click="editInstrument(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>

            <el-button @click="deleteInstrument(scope.row.insId)" type="danger" icon="el-icon-delete"
                       circle></el-button>
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

    <div id="instrument-edit">
      <el-dialog title="乐器信息" :visible.sync="editInsFormVisible" :modal-append-to-body='false'>

        <el-form label-width="80px">
          <el-form-item label="乐器图片">
            <img style="width: 200px; height: 200px" :src="instrumentImg" class="avatar">
            <el-upload
                class="avatar-uploader"
                :action="this.baseUrl+'/ins/uploadimg'"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess">
              <el-button slot="trigger" style="margin-right:20px ">选择文件</el-button>
              <el-button type="success" :disabled="imgNotOK" @click="modifyInsImg(instrument)">确认上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>

        <el-form :model="instrument">
          <el-form-item label="乐器ID" disabled prop="insId">
            <el-input v-model="instrument.insId" disabled></el-input>
          </el-form-item>
          <el-form-item label="创建时间" disabled prop="updateTime">
            <el-input v-model="instrument.updateTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="更新时间" disabled prop="updateTime">
            <el-input v-model="instrument.updateTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="乐器名称" prop="insName">
            <el-input v-model="instrument.insName" placeholder="请输入乐器名称"></el-input>
          </el-form-item>
          <el-form-item label="品牌" prop="insBrand">
            <el-input v-model="instrument.insBrand" placeholder="请输入乐器品牌"></el-input>
          </el-form-item>
          <el-form-item label="乐器描述" prop="insDesc">
            <el-input v-model="instrument.insDesc"></el-input>
          </el-form-item>

          <el-form-item label="乐器价格" prop="insPrice">
            <el-input v-model="instrument.insPrice"></el-input>
          </el-form-item>
          <el-form-item label="乐器库存" prop="insStock">
            <el-input v-model="instrument.insStock"></el-input>
          </el-form-item>
          <el-form-item label="乐器类型" prop="typeId">
            <el-select v-model="instrument.typeId">
              <div v-for="insType in insTypeList">
                <el-option :label="insType.typeName" :value="insType.typeId">{{insType.typeName}}</el-option>
              </div>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editInsFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="instrumentModify(instrument)">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div id="instrument-add">
      <el-dialog title="乐器类型添加" :visible.sync="instrumentAddDFVisible" :modal-append-to-body='false'>

        <el-form label-width="80px">
          <el-form-item label="乐器图片">
            <img style="width: 200px; height: 200px" :src="instrumentImg" class="avatar">
            <el-upload
                class="avatar-uploader"
                :action="this.baseUrl+'/ins/uploadimg'"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess">
              <el-button slot="trigger" style="margin-right:20px ">选择文件</el-button>
              <el-button type="success" :disabled="imgNotOK" @click="submitInsImg(instrumentForm)">确认上传</el-button>
              <br>
              <el-button style="margin-top: 20px" @click="resetImg">恢复默认</el-button>
            </el-upload>
          </el-form-item>
        </el-form>

        <el-form :model="instrumentForm">
          <el-form-item label="乐器名称" prop="insName">
            <el-input v-model="instrumentForm.insName" placeholder="请输入乐器乐器名称"></el-input>
          </el-form-item>
          <el-form-item label="乐器描述" prop="insDesc">
            <el-input v-model="instrumentForm.insDesc" placeholder="请输入乐器乐器描述"></el-input>
          </el-form-item>
          <el-form-item label="乐器品牌" prop="insBrand">
            <el-input v-model="instrumentForm.insBrand" placeholder="请输入乐器品牌"></el-input>
          </el-form-item>
          <el-form-item label="乐器价格" prop="insPrice">
            <el-input v-model="instrumentForm.insPrice" placeholder="请输入乐器价格"></el-input>
          </el-form-item>
          <el-form-item label="乐器库存" prop="insStock">
            <el-input v-model="instrumentForm.insStock" placeholder="请输入乐器库存"></el-input>
          </el-form-item>
          <el-form-item label="乐器类型" prop="typeId">
            <el-select v-model="instrumentForm.typeId">
              <div v-for="insType2 in insTypeList">
                <el-option :label="insType2.typeName" :value="insType2.typeId"></el-option>
              </div>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="instrumentAddDFVisible = false">取 消</el-button>
          <el-button type="primary" @click="addInstrument(instrumentForm)">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  name: "AdminInstrument",

  data() {
    return {
      //菜单活动标签索引
      activeIndex2: '1',

      //乐器表
      instrumentsData: [
        {
          insId: '',
          insName: '',
          insImg: this.defaultImgName,
          insDesc: '',
          insBrand: '',
          insPrice: '',
          insStock: '',
          typeId: '',
          createTime: '',
          updateTime: '',
        },
      ],
      //乐器类型表
      insTypeList: [
        {
          typeId: '',
          typeName: '',
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

      //编辑乐器dialog
      editInsFormVisible: false,
      formLabelWidth: '120px',

      //添加乐器dialog
      instrumentAddDFVisible: false,

      //添加乐器数据
      instrumentForm: {
        insName: '',
        insImg: this.defaultImgName,
        insDesc: '',
        insBrand: '',
        insPrice: '',
        insStock: '',
        typeId: '',
        createTime: '',
        updateTime: '',
      },

      //单个乐器数据
      instrument: {
        insId: '',
        insName: '',
        insImg: '',
        insDesc: '',
        insBrand: '',
        insPrice: '',
        insStock: '',
        typeId: '',
        createTime: '',
        updateTime: '',
      },

      //切换确认上传按钮可用状态
      imgNotOK: true,

      //乐器图片是否修改的中间变量
      nowImg: '',

      //乐器图片链接
      instrumentImg: '',

    }
  },

  methods: {

    //分页获取乐器类型列表
    getInstrumentList(pageNum, pageSize) {
      const _this = this
      axios({
        method: 'get',
        url: '/ins/pageList',
        params: {
          pageNum: pageNum,
          pageSize: pageSize
        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.instrumentsData = resp.data.data.list.filter(insType=>{
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
      this.getInstrumentList(currentPage, _this.pageSize)
    },

    //每页xx条handle
    handleSizeChange(val) {
      const _this = this
      _this.pageSize = val;
      _this.page(_this.currentPage, val)
    },

    //显示编辑dialog
    editInstrument(instrument) {
      const _this = this
      _this.editInsFormVisible = true
      _this.instrument = instrument
      _this.instrumentImg = this.insImgUrl + _this.instrument.insImg
    },

    //显示乐器类型添加dialog
    showAddInstrument() {
      const _this = this
      _this.instrumentAddDFVisible = true
      _this.instrumentImg = this.insImgUrl + this.defaultImgName
    },

    //乐器图片上传检查
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传乐器乐器图片大小不能超过 2MB!');
      }
      return isLt2M;
    },

    //乐器图片上传回显
    handleAvatarSuccess(res) {
      const _this = this
      if (res.code === 10000) {
        _this.imgNotOK = false
        _this.instrumentImg = this.insImgUrl + res.data
        _this.newImg = res.data
      }
      if (res.code === 10001) {
        this.$message.error(res.msg);
      }
    },

    //确认修改乐器图片
    modifyInsImg(instrument) {
      const _this = this;
      instrument.insImg = _this.newImg

      axios({
        method: 'put',
        url: '/ins/modify',
        headers: {
          token: _this.token
        },
        data: {
          insId: instrument.insId,
          insName: instrument.insName,
          insImg: instrument.insImg,
          insDesc: instrument.insDesc,
          insBrand: instrument.insBrand,
          insPrice: instrument.insPrice,
          insStock: instrument.insStock,
          typeId: instrument.typeId,
          createTime: null,
          updateTime: null,
          // instrument: instrument
        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.getInstrumentList(_this.currentPage, _this.pageSize)
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

    //乐器信息修改
    instrumentModify(instrument) {
      const _this = this

      console.log(instrument)
      _this.$confirm('您确定要修改为当前信息吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'put',
          url: '/ins/modify',
          headers: {
            token: _this.token
          },
          data: {
            insId: instrument.insId,
            insName: instrument.insName,
            insImg: instrument.insImg,
            insDesc: instrument.insDesc,
            insBrand: instrument.insBrand,
            insPrice: instrument.insPrice,
            insStock: instrument.insStock,
            typeId: instrument.typeId,
            createTime: null,
            updateTime: null,
          }
        }).then((resp) => {
          if (resp.data.code === 10000) {

            _this.$message({
              showClose: true,
              type: 'success',
              message: resp.data.msg
            })
            setTimeout(() => {
              _this.getInstrumentList(_this.currentPage, _this.pageSize)
              _this.editInsFormVisible = false
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

    //根据id删除乐器
    deleteInstrument(id) {
      console.log(id)
      const _this = this
      _this.$confirm('您确定要删除当前乐器类型吗？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        axios({
          method: 'delete',
          url: '/ins/delete',
          headers: {
            token: _this.token
          },
          params: {
            insId: id,
          }
        }).then((resp) => {
          if (resp.data.code === 10000) {
            _this.$message({
              showClose: true,
              type: 'success',
              message: resp.data.msg
            })
            setTimeout(() => {
              _this.getInstrumentList(_this.currentPage, _this.pageSize)
              _this.editInsFormVisible = false
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

    //确认上传乐器图片
    submitInsImg(instrument) {
      const _this = this
      instrument.insImg = _this.newImg
    },

    //重置乐器图片
    resetImg() {
      const _this = this
      _this.instrument.insImg = this.defaultImgName
      _this.insImg = this.insImgUrl + this.defaultImgName
    },

    //添加乐器
    addInstrument(instrumentForm) {
      const _this = this

      console.log(instrumentForm)
      axios({
        method: 'post',
        url: '/ins/add',
        data: {
          insName: instrumentForm.insName,
          insImg: instrumentForm.insImg,
          insDesc: instrumentForm.insDesc,
          insBrand: instrumentForm.insBrand,
          insPrice: instrumentForm.insPrice,
          insStock: instrumentForm.insStock,
          typeId: instrumentForm.typeId,
          createTime: null,
          updateTime: null,

        }
      }).then((resp) => {
        if (resp.data.code === 10000) {
          _this.instrumentAddDFVisible = false
          _this.$message({
            type: 'success',
            message: resp.data.msg
          })
          setTimeout(() => {
            _this.getInstrumentList(_this.currentPage, _this.pageSize)
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
    const _this = this
    //分页获取乐器列表
    this.getInstrumentList(this.pageNum, this.pageSize)

    //获取乐器类型列表list  insTypeList
    axios.get('/insType/list').then(function (resp) {
      // console.log(resp.data.data)
      _this.insTypeList = resp.data.data
    });
  },

}
</script>

<style scoped>
#instrumentList {
  width: auto;
}

#instrumentList >>> .el-table {
  width: 1850px;
}

#instrument-add >>> .el-dialog {
  width: 600px;
}
</style>