<template>
  <div>
    <div class="usernav">
      <el-button type="success" @click="createuser">创建用户</el-button>
      <el-button type="info" :disabled="isopen" @click="setauth">设置角色</el-button>
    </div>
    <div>
      <el-table :data="tableData" border @row-click="choose">
        <el-table-column width="55">
            <!-- 老师说别改但是我改了 -->
          <template slot-scope="scope">
            <el-radio v-model="radio" :label="scope.row._id"></el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称" width="180"></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="phone" label="授权时间"></el-table-column>
        <el-table-column prop="createAt" label="授权人"></el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div>
      <el-pagination
        @current-change="currentChange"
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="50"
      ></el-pagination>
    </div>
    <!-- 模态框 -->
    <div>
      <el-dialog title="创建角色" :visible.sync="formdialogvisible">
        <el-form :model="form" :rules="rules" ref="forms">
          <el-form-item label="角色名称" prop="rolename">
            <el-input v-model="form.rolename"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button>cancel</el-button>
          <el-button @click="addrole">ok</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 设置角色模态框 -->
    <div>
      <el-dialog title="设置角色" :visible.sync="dialogvisible">
        <el-form :model="form" :rules="rules" ref="forms">
          <el-form-item label="角色名称" prop="rolename">
            <el-input v-model="form.rolename"></el-input>
          </el-form-item>
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
          ></el-tree>
        </el-form>
        <div slot="footer">
          <el-button>cancel</el-button>
          <el-button @click="addrole">ok</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { createroleuser, getrolelist } from "../api/index";
import router from "../router";
export default {
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      pageNum: 1,
      pageSize: 3,
      tableData: [],
      total: 0,
      formdialogvisible: false,
      //设置角色
      dialogvisible: false,
      radio: null,
      isopen: true,
      form: {
        rolename: ""
      },
      rules: {
        rolename: [{ required: true, message: "请输入用户名" }]
      }
    };
  },
  methods: {
    setauth() {
      this.dialogvisible = true;
    },
    choose(row) {
      this.radio = row._id;
      if (row._id) {
        this.isopen = false;
      }
    },
    createuser() {
      this.formdialogvisible = true;
    },
    async addrole() {
      let defaultParams = {
        rolename: this.form.rolename
      };
      let { roledata } = await createroleuser(defaultParams);
      this.formdialogvisible = false;
      this.form = {};
      //    console.log(roledata)
    },
    async rolelist(val) {
      let listData = await getrolelist({
        pageNum: val,
        pageSize: this.pageSize
      });
      //    console.log(listData)
      this.tableData = listData.data.list;
      this.total = listData.data.total;
    },
    currentChange(val) {
      // console.log(val)
      this.rolelist(val);
    }
  },
  mounted() {
    this.rolelist(1);
  }
};
</script>
<style scoped>
</style>