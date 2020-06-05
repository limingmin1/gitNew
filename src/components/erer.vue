<template>
<div>
  <!-- <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
  </el-radio-group> -->

  <el-tabs :tab-position="tabPosition" style="height: 800px; width:100%;background:#ccc;">
    <el-tab-pane label="首页">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>       
    </el-tab-pane>
    <el-tab-pane label="商品">
        
        配置管理</el-tab-pane>
    <el-tab-pane label="图形图表">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
  export default {
    data() {
      return {
        tabPosition: 'left'
      };
    }
  };
</script>
<style>

</style>