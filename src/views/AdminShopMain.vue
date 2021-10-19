<template>
  <div id="shop-main">
    <div id="ins-total-type">

    </div>
    <div id="ins-most-expensive">

    </div>
  </div>
</template>

<script>
export default {
  name: "AdminShopMain",

  data(){
    return {
      //各乐器类型乐器个数
      insTotalByType:[
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
      ],

      //最贵乐器top5
      expensiveIns:[
        ['a', 'b', 'c', 'd', 'e'],
        [120, 200, 150, 80, 70]
      ],

    }
  },

  methods:{
    getInsTotalByType(){
      var insTotalByTypeOption = {
        title: {
          text: '各类型乐器占比',
          subtext: '',
          left: 'center'
        },
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data:
            this.insTotalByType
          }
        ]
      };

      return insTotalByTypeOption;
    },

    getExpensiveInsOption(){
      //获取最贵乐器TOP5 echarts参数
      var expensiveInsOption = {
        title: {
          text: '最贵乐器TOP5',
          subtext: '',
          left: 'center'
        },
        dataset: [
          {
            dimensions: ['typeName',  'price'],
            source: [
              [this.expensiveIns[0][0],this.expensiveIns[1][0]],
              [this.expensiveIns[0][1],this.expensiveIns[1][1]],
              [this.expensiveIns[0][2],this.expensiveIns[1][2]],
              [this.expensiveIns[0][3],this.expensiveIns[1][3]],
              [this.expensiveIns[0][4],this.expensiveIns[1][4]],
            ]
          },
          {
            transform: {
              type: 'sort',
              config: { dimension: 'price', order: 'desc' }
            }
          }
        ],
        xAxis: {
          type: 'category',
          axisLabel: { interval: 0, rotate: 30 }
        },
        yAxis: {},
        series: {
          type: 'bar',
          encode: { x: 'typeName', y: 'price' },
          datasetIndex: 1
        }
      };

      return expensiveInsOption;
    },

    eChartInitSetOption() {
      let expensiveInsEchart = this.$echarts.init(
          document.getElementById("ins-most-expensive"),
      )
      let insTotalByTypeEchart = this.$echarts.init(
          document.getElementById("ins-total-type"),
      )

      expensiveInsEchart.setOption(this.getExpensiveInsOption())
      insTotalByTypeEchart.setOption(this.getInsTotalByType())

    }
  },

  created() {
    const _this = this
    //获取各种乐器类型的乐器个数
    axios.get('/insType/insTotalByType').then((resp) => {
      _this.insTotalByType=resp.data.data
      _this.eChartInitSetOption();
    });


    // 获取最贵乐器TOP5
    axios.get('/ins/mostFiveExpensive').then((resp) => {
      _this.expensiveIns=resp.data.data
      _this.eChartInitSetOption();
    });
  }

}
</script>

<style scoped>
#shop-main {

}

#ins-total-type,#ins-most-expensive  {
  margin-top: 50px;
  float: left;
  width: 700px;
  height: 700px
}

#ins-most-expensive {
  margin-left: 100px;
}
</style>