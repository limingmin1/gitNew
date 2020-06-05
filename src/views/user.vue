<template>
  <div>
    <div class="usernav">
      <el-button type="success" @click="dialogvisible">创建用户</el-button>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="createAt" label="注册时间"></el-table-column>
        <el-table-column prop="role" label="所属角色"></el-table-column>
        <el-table-column prop="操作" label="地址"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div>
      <el-pagination @current-change="currentChange" :page-size="20" :pager-count="11" layout="prev, pager, next" :total="50"></el-pagination>
    </div>
    <!-- 模态框 -->
    <div>
      <el-dialog :title="title" :visible.sync="formdialogvisible">
        <!-- <el-dialog title="添加用户" :visible.sync="formdialogvisible"> -->
        <el-form :model="form" :rules="rules" ref="forms">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="form.role" placeholder="选择角色">
              <el-option value="大哥"></el-option>
              <el-option value="二弟"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button>cancel</el-button>
          <el-button @click="add">ok</el-button>
          <el-button @click="updateedit">ok</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { addUser, getlist, deleteuser, updateuser } from "../api/index";
export default {
  data() {
    return {
      pageNum:1,
      pageSize:3,
      total:0,
      form: {
        username: "",
        password: "",
        phone: "",
        email: "",
        role: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }]
      },
      formdialogvisible: false,
      tableData: [],
      title: ""
    };
  },
  methods: {
    
    async currentChange(val){
      let listData=await getlist({pageNum:val,pageSize:this.pageSize});
      this.tableData=listData.data.list;
    },
    dialogvisible() {
      this.formdialogvisible = true;
      this.title = "添加用户";
    },
    async add() {
      console.log(addUser);
      let defaultParams = {
        username: this.form.username,
        password: this.form.password,
        phone: this.form.phone,
        email: this.form.email
      };

      let userdata = await addUser(defaultParams);
      this.formdialogvisible = false;
      this.form = {};
      //        console.log(userdata)
    },
    //弹出弹框，并且添加到row
    edit(row) {
      this.formdialogvisible = true;
      this.form = row;
      this.title = "修改用户信息";
    },
    //改变用户信息
    async updateedit() {
      /***
       * //前端
       * 1.如何判别是添加还是编辑
       * 2.针对添加或者编辑的框进行优化
       * 3.title 添加用户 点添加 添加用户   点编辑  编辑用户
       * //后端
       * 1._id 编辑     update
       */

      let updatedata = await updateuser(this.form);
      console.log(updatedata);
      this.formdialogvisible = false;
    },

    async del(row) {
      //  console.log(row)
      let delUserData = await deleteuser({ userId: row._id });
      console.log(delUserData);
      let listData = await getlist();
      this.tableData = listData.data.user;
      //  await getliet()
    }
  },
  async mounted() {
    let listData = await getlist({pageNum:this.pageNum,pageSize:this.pageSize});
    // this.tableData = listData.data.user;
    this.tableData = listData.data.list;
    this.total=listData.data.total;
    console.log(this.total)
  }
};
</script>
<style scoped>
/deep/.el-dialog{
  width: 40%;
}
.usernav {
  height: 100px;
  background-color: #fff;
}
</style>