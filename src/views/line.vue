<template>
  <div>
    <h3 class="hsan">折线图一</h3>
    <hr/>
    <div id="myChart" :style="{width: '1000px', height: '300px'}"></div>
    <hr/>
    <h3 class="hsan">折线图二</h3>
    <hr/>
    <div id="syErt" :style="{width: '1000px', height: '300px'}"></div>
  </div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
export default {
  methods:{
     bar(){
    let myChart = echarts.init(document.getElementById("myChart"));
    let syErt = echarts.init(document.getElementById("syErt"));
    myChart.setOption( {
    title: {
        text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: [ '销量', '库存']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['衬衫', '羊毛衫', '雪纺纱', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '销量',
            type: 'line',
            stack: '总量',
            data: [15, 30, 45, 20, 20, 40]
        },
        {
            name: '库存',
            type: 'line',
            stack: '总量',
            data: [5, 20, 35, 10, 10, 20]
        }
    ]
  }),
   syErt.setOption( {
       xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [880, 900, 900, 900, 1300, 1320, 1320],
        type: 'line',
        areaStyle: {}
    }]
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
  margin-top: 10px;
}
</style>