<template>
  <div>
    <div id="GenderCount">

    </div>
  </div>
</template>

<script>
export default {
  name: "AdminMain",


  data() {
    return {
      //用户性别统计表
      userGenderTotal: {
        maleCount: 0,
        femaleCount: 0,
        nullCount: 1
      },


    }
  },

  methods: {
    getUserGenderEcharts() {
      //用户性别统计echarts参数
      var userGenderOption= {
        title: {
          text: '用户性别人数统计',
              subtext: '',
              left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
              left: 'left'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: '50%',
            data: [
              {value: this.userGenderTotal.nullCount, name: '保密'},
              {value: this.userGenderTotal.maleCount, name: '男'},
              {value: this.userGenderTotal.femaleCount, name: '女'},
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      // 获取dom对象并初始化
      let userGenderChart = this.$echarts.init(
          document.getElementById("GenderCount")
      );

      //设置option
      userGenderChart.setOption(userGenderOption)
    },
  },

  created() {
    const _this = this
    //获取用户性别人数统计
    axios.get('/admin/userGenderTotal').then((resp) => {
      _this.userGenderTotal = resp.data.data
      console.log(_this.userGenderTotal)
      _this.getUserGenderEcharts()
    });


  }
}
</script>

<style scoped>
#GenderCount{
  width: 500px;
  height: 500px
}
</style>