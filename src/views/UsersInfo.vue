<template>
<div>
  用户管理
</div>
</template>

<script>
export default {
  name: "UsersInfo",
  created() {
    //将活动菜单索引发送至菜单组件
    const bus=this.$bus
    bus.$emit('activeIndex2Change','1')
  }
}
</script>

<style scoped>

</style>