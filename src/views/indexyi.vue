<template>
  <div class="guoba">
    <!-- <h3 class="guoh3">角色管理</h3>
    <div>
      <el-button type="primary">创建角色</el-button>
      <el-button>设置角色权限</el-button>
    </div>
    <div class="guoxi">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="角色名称" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="创建时间" width="120"></el-table-column>
        <el-table-column prop="address" label="授权时间" show-overflow-tooltip></el-table-column>
         <el-table-column prop="address" label="授权人" show-overflow-tooltip></el-table-column>
      </el-table>
      <div style="margin-top: 20px;" class="gunding">
            <div class="block">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage3"
                :page-size="100"
                layout="prev, pager, next, jumper"
                :total="1000">
                </el-pagination>
            </div>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  // data() {
  //   return {
  //     tableData: [
  //       {
  //         date: "2016-05-02",
  //         name: "王小虎",
  //         address: "上海市普陀区金沙江路 1518 弄"
  //       }
  //     ],
  //     currentRow: null
  //   };
  // },

  // methods: {
  //   setCurrent(row) {
  //     this.$refs.singleTable.setCurrentRow(row);
  //   },
  //   handleCurrentChange(val) {
  //     this.currentRow = val;
  //   }
  // }
}
</script>
<style>
.guoba {
  margin: 0px 0px 0px 30px;
  width: 100%;
}
.guoh3 {
  font-size: 18px;
  font-weight: 200;
}
.guoxi {
  width: 100%;
  height: 400px;
  background-color: aqua;
  margin-top: 20px;
  position: relative;
}
.gunding{
    position: absolute;
    right: 0px;
    bottom: 0px
}
</style>