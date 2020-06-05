<template>
  <div>
    <div class="usernav">
      <el-button type="success" @click="dialogvisible">添加分类</el-button>
    </div>
    <div>
      <!-- 判断是否是一级分类   parentId="0"   tableData  盛放一级分类内容 subtableData后面的内容-->
      <!-- <el-table :data="tableData" border style="width: 100%"> -->
        <el-table :data="parentId=='0'?tableData:subtableData" border style="width: 100%">
        <el-table-column prop="name" label="分类名称" width="500"></el-table-column>
        <el-table-column label="操作" width="500">
          <template slot-scope="scope">
            <el-button @click="cateroyupdate(scope.row)" type="text" size="small">修改分类</el-button>
            <el-button type="text" size="small" @click="showSubCates(scope.row)">查看子分类</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div>
      <!-- <el-pagination @current-change="currentChange" :page-size="20" :pager-count="11" layout="prev, pager, next" :total="50"></el-pagination> -->
    </div>
    <!-- 模态框 -->
    <div>
      <!-- <el-dialog :title="title" :visible.sync="formdialogvisible"> -->
      <el-dialog title="添加分类" :visible.sync="formdialogvisible">
        <el-form :model="form" :rules="rules" ref="forms">
          <el-form-item label="所属分类">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类名称" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button>cancel</el-button>
          <el-button @click="add">ok</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 更新数据 -->
    <div>
      <el-dialog title="更新分类" :visible.sync="updatedialogvisible">
        <el-form :model="form" :rules="rules" ref="forms">
          <el-form-item label="分类名称" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button>cancel</el-button>
          <el-button @click="dialogadd">ok</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { addcategory,getcategorylist,updatecategory } from "../api/index"
export default {
  data() {
    return {
      options: [
        {
          _id: "0",
          name: "一级分类"
        }
      ],
      //父类id
      categoryname:null,
      value: "",
      parentId:"0",
      form: {
        username: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }]
      },
      formdialogvisible: false,
      //控制更新分类
      updatedialogvisible:false,
      tableData: [],
      //二级分类数据
      subtableData:[],
      title: "",
      row:""
    };
  },
  methods: {
    showSubCates(category){
      console.log(category)
        this.parentId=category._id
        this.categoryname=category.name
        this.getlist(category._id)
       

    },
    dialogvisible() {
      this.formdialogvisible = true;
    },
   async add(){
      let defaultParams={
          categoryName:this.form.username,
          parentId:this.value
      }
      let categorydata=await addcategory(defaultParams)
      console.log(categorydata)
      this.getlist()
      this.formdialogvisible=false
    },
    // 获取品类管理列表
    async getlist(value){
     let categorylist=await getcategorylist({parentId:value})
     console.log(categorylist)
     
     if(categorylist.code==0){ 
       this.options=categorylist.data
      
      if(categorylist.data[0]){
//  判断是不是一级分类 
      
        if(categorylist.data[0].parentId=="0"){
       //tableData  定义为以及分类
          this.tableData=categorylist.data
        }else{
      //  集合listdata  定义二级分类或其他级别的分类
            this.subtableData=categorylist.data
        }
        }else{
         alert("没有数据")
      }
     }
     
    },
    cateroyupdate(row){
    this.updatedialogvisible=true
    this.form.username=row.name 
    this.row=row 
    },
   async dialogadd(){
      let defaultParams={
      categoryId:this.row._id,
      categoryName:this.form.username
    }
    let categorydateDate=await updatecategory(defaultParams)
    console.log(categorydateDate)
    this.getlist()
    this.updatedialogvisible=false
    }
   
  },
  mounted(){
      this.getlist()
  }
};
</script>
<style scoped>
/deep/.el-dialog {
  width: 40%;
}
.usernav {
  height: 100px;
  background-color: #fff;
}
</style>