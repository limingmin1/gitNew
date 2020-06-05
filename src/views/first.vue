<template>
    <div>
        <div class="top">
           <div class="topzuo">
              <div class="topli1">
                  <p class="shangpi">商品总量</p>
                  <h2 class="her-h2">1,128,163个</h2>
                  <p class="her-pp">周同15%</p>
                  <p class="her-pp">日同比10%</p>
              </div>
           </div>
           <div id="topYou">

           </div>
        </div>
        <div class="xia">
            <div class="xiatop">
               <p class="xiao1 xiaox">访问量</p>
               <p class="xiao1">销售量</p>
               <p class="xiao2">2018/01/01-2019/01/01</p>
            </div>
            <div id="xiazuo">

            </div>
            <div class="xiayou">
                <div class="xiayouli">
                     <p class="shangpi">任务</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
let echarts = require("echarts/lib/echarts");
export default {
  methods:{
     bar(){
    let topYou = echarts.init(document.getElementById("topYou"));
    let xiazuo = echarts.init(document.getElementById("xiazuo"));
    topYou.setOption({
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
  xiazuo.setOption({
       color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',"aa","bb","cc","dd","ee"],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [40, 52, 60, 140, 50, 38, 30,40,70,40,60,40]
        }
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
.top{
    width: 1000px;
    height: 300px;
}
.topzuo{
    width: 300px;
    height: 300px;
    float: left;
}
.shangpi{
    widows: 100%;
    height: 40px;
    border-bottom:.5px solid #ccc; 
    padding-left: 20px;
    line-height: 40px;
}
.her-h2{
    margin-left: 10px;
    margin-bottom: 8px;
    margin-top: 10px;
}
.xiayouli{
    width: 300px;
    height: 300px;
    border: 0.5px solid #ccc;
}
.topli1{
    width: 200px;
    height: 200px;
    border: 0.5px solid #ccc;
    margin: 40px auto;
}
.her-pp{
    margin-left: 10px;
    margin-bottom: 8px;
    margin-top: 10px;
}
#topYou{
    width: 700px;
    height: 300px;
    float: left;
}
.xia{
    width: 1000px;
    height: 370px;
    border: 1px solid #ccc;
    margin-top: 20px;
}
#xiazuo{
    width: 700px;
    height: 300px;
    overflow: hidden;
     float: left;
}
.xiayou{
    width: 300px;
    height: 300px;
    float: left;
}
.xiatop{
    width: 100%;
    height: 50px;
}
.xiao1{
    float: left;
    margin-right: 30px;
}
.xiao2{
     float: right;
     width: 200px;
     height: 30px;
     border: 0.5px solid #cccc;
     padding-right: 20px;
     line-height: 30px;
     color: #ccc;
     font-size: 12px;
}
.xiaox{
    color: aqua;
}
</style>