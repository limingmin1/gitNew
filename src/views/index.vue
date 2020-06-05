<template>
    <div>
        <div class="youli">
          <h2 class="yongh">
            用户管理
          </h2>
          <el-button type="success">创建用户</el-button>
           <div class="youxi">
               <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="date"
                    label="用户名"
                    width="160">
                    </el-table-column>

                    <el-table-column
                    prop="name"
                    label="邮箱"
                    width="130">
                    </el-table-column>

                    <el-table-column
                    prop="name"
                    label="电话"
                    width="130">
                    </el-table-column>

                    <el-table-column
                    prop="name"
                    label="注册时间"
                    width="140">
                    </el-table-column>

                    <el-table-column
                    prop="name"
                    label="所属角色"
                    width="140">
                    </el-table-column>

                    <el-table-column
                    prop="address"
                    label="操作">
                    </el-table-column>
              </el-table>
           </div>
        </div>
        
    </div>
</template>
<script >

export default {
     
    data(){
        return{
            tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
        }

    }
    
</script>
<style scoped>
    .youli{
        margin: 0px 0px 0px 30px;
    }
  .yongh{
      font-weight: 200;
      font-size: 18px;
  }
  .youxi{
      width: 90%;
      height: 400px;
      background-color: yellow;
      margin-top:20px; 
      
  }
</style>