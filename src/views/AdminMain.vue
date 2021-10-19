<template>
  <div id="admin-main">
    <div id="gender-count">

    </div>
    <div id="people-number">

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


      //用户数统计表
      userAndAdminTotal: {
        adminTotal: 1,
        userTotal: 1
      }

    }
  },

  methods: {
    getUserGenderOption() {
      //用户性别统计echarts参数
      var userGenderOption = {
        title: {
          text: '用户性别人数画像',
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

      return userGenderOption
    },

    getPeopleNumberOption() {
      //管理员用户人数统计echarts参数
      var peopleNumberOption = {
        title: {
          text: '人数统计（权限）',
          subtext: '',
          left: 'center'
        },
        xAxis: {
          data: ['管理员', '用户']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [this.userAndAdminTotal.adminTotal, this.userAndAdminTotal.userTotal],
            type: 'bar'
          }
        ]
      };
      return peopleNumberOption
    },

    eChartInitSetOption() {
      let genderCountEchart = this.$echarts.init(
          document.getElementById("gender-count"),
      )
      let peopleNumberEchart = this.$echarts.init(
          document.getElementById("people-number"),
      )

      genderCountEchart.setOption(this.getUserGenderOption())
      peopleNumberEchart.setOption(this.getPeopleNumberOption())

    }
  },

  created() {
    const _this = this

    // 获取用户性别人数统计
    axios.get('/admin/userGenderTotal').then((resp) => {
      _this.userGenderTotal = resp.data.data
      _this.eChartInitSetOption()
    });

    //获取人数统计（权限）
    axios.get('/admin/userAndAdminTotal').then((resp) => {
      _this.userAndAdminTotal = resp.data.data
      _this.eChartInitSetOption()
    });


  },

}
</script>

<style scoped>
#admin-main {

}

#gender-count, #people-number {
  margin-top: 50px;
  float: left;
  width: 700px;
  height: 700px
}

#people-number {
  margin-left: 100px;
}
</style>