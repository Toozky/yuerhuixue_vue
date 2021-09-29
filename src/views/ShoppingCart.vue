<template>
<div>

</div>
</template>

<script>
export default {
  name: "ShoppingCart",
  data(){
    return{
      token:''
    }
  },
  created(){
    var baseUrl='http://localhost:8181';
    const _this = this
    _this.token=_this.$getCookie('token')
    console.log(_this.token)
    axios({
      method:"get",
      url:baseUrl+'/user/modify',
      header:{
        token:_this.token
      }
    }).then(function (resp) {
      console.log(resp)
    })
  }
}
</script>

<style scoped>

</style>