<template>
  <div>
    <h3 class="hsan">柱状图一</h3>
    <hr/>
    <div id="myChart" :style="{width: '1000px', height: '400px'}"></div>
  </div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
export default {
  methods:{
     bar(){
    let myChart = echarts.init(document.getElementById("myChart"));
    myChart.setOption( {
    legend: {},
    tooltip: {},
    dataset: {
        source: [
            ['product', '销量', '库存'],
            ['衬衫', 5, 15],
            ['羊毛衫', 20, 30],
            ['雪纺衫', 35, 45],
            ['裤子', 10, 20],
            ['高跟鞋', 10, 20],
            ['袜子', 20, 40]
        ]
    },
    xAxis: {type: 'category'},
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
        {type: 'bar'},
        {type: 'bar'},
        // {type: 'bar'}
    ]
  })
     }
  },
  mounted() {
    this.bar();
}
}
</script>
<style scoped>
.hsan{
  font-weight: 600;
  margin-bottom: 10px;
}
</style>