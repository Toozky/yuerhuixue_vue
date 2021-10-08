<template>
  <div>

    <Menu :activeIndex2=activeIndex2 @form-change=form></Menu>

    <input @change="uploadPhoto($event)" type="file" class="kyc-passin">
    <img style=" height: 200px" :src="formInline.img" alt="">
    <el-button @click="base64ToFile(formInline.img)">下载</el-button>

  </div>
</template>
<script>
import {VueCropper} from 'vue-cropper'
import Menu from '@/components/Menu'
export default {
  components: {
    VueCropper,
    Menu,
  },
  data(){
    return{
      formInline:{
        img:''
      },
      activeIndex2: '3',
      form: {
        createTime: "",
        updateTime: "",
        userAge: "",
        userEmail: "",
        userGender: "",
        userId: "",
        userImg: "",
        userName: "",
        userNickname: "",
        userPwd: "",
        userTel: "",
      },
    }
  },
  methods: {
    uploadPhoto (e) {
      // 利用fileReader对象获取file
      var file = e.target.files[0];
      var filesize = file.size;
      var filename = file.name;
      // 2,621,440   2M
      if (filesize > 2101440) {
        // 图片大于2MB

      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {

        // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
        var imgcode = e.target.result;
        this.formInline.img=imgcode
        console.log(this.formInline.img);
      }
    },

    base64ToFile(dataurl) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], {type: mime})
    },


  },
  created() {
    const bus=this.$bus
    const _this=this
    bus.$on('formChange', (form)=>{
      console.log('++++++')
      console.log(form)
      _this.form=form
      console.log('******')
      console.log(_this.form)
    })
  }
}
</script>
<style scoped>

</style>