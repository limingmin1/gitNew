<template>
  <div>
    <div class="usernav">
      <div style="width:60%;float:left"></div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <!-- <el-select v-model="formInline.region" placeholder="搜索" @change="change">
            <el-option label="产品名称" value="productName"></el-option>
            <el-option label="商品描述" value="productDesc"></el-option>
          </el-select>-->
          <el-select v-model="value" placeholder="搜索" @change="change">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.user" placeholder="查询条件"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchProduct">查询</el-button>
        </el-form-item>
      </el-form>

      <div style="width:30%;float:right;margin-top: -60px;">
        <el-button type="success" @click="goDetail">添加商品</el-button>
      </div>
    </div>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="name" label="商品名称" width="180"></el-table-column>
        <el-table-column prop="desc" label="商品描述" width="180"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="status" label="状态" width="200">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="togglestatus(scope.row)"
            >{{scope.row.status=="0"?"下架":"上架"}}</el-button>
            <el-button type="text" size="small">{{scope.row.status=="0"?"在售":"已下架"}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <!-- 获取数据 -->
            <el-button type="text" size="small" @click="upxiangqing(scope.row)">详情</el-button>
             <!-- 修改数据  -->
            <el-button type="text" size="small" @click="productxian(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div>
      <el-pagination :page-size="20" :pager-count="11" layout="prev, pager, next" :total="50"></el-pagination>
    </div>
    <!-- 更新数据信息 -->
    <div>
      <el-dialog title="更新分类" :visible.sync="updateproduct">
        <el-form :model="form" :rules="rules" ref="forms">
          <el-form-item label="分类名称" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="passnam">
            <el-input v-model="form.passnam"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="jiage">
            <el-input v-model="form.jiage"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button>cancel</el-button>
          <el-button @click="produdom">ok</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 获取数据  -->
    <div>
      <el-dialog title="更新分类" :visible.sync="updatexiangqing">
        <el-form :model="form" :rules="rules" ref="forms">
          <el-form-item label="分类名称" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" prop="passnam">
            <el-input v-model="form.passnam"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="jiage">
            <el-input v-model="form.jiage"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button>cancel</el-button>
          <el-button @click="guanbi">ok</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { productlist, changeStatus, productSearch,upgaibian } from "../api/index";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      //修改的数据
      rules: {
        username: [{ required: true, message: "请输入用户名" }]
      },
      form: {
        username: "",
        passnam:"",
        jiage:""
      },

      tableData: [],
      pageNum: 1,
      pageSize: 3,
      status: "0",
      productName: "",
      options: [
        {
          value: "productName",
          label: "按名称搜索"
        },
        {
          value: "productDesc",
          label: "按描述搜索"
        }
      ],
      value: "",
      updateproduct: false,
      updatexiangqing:false
    };
  },
  methods: {
    //查询列表
    //参数传几个？
    // change(){
    //    this.productName=formInline.region
    // },
    // async searchProduct(){
    //     let defaultParams={

    //     }
    //     let searchData=await productSearch({productName:this.productName})
    //     console.log(searchData)
    // },
    change() {
      this.according = this.value;
    },
    async searchProduct() {
      let inp = this.input;
      if (this.according == "productName") {
        let sou = await productSearch({
          productName: inp,
          pageNum: 1,
          pageSize: 3
        });
        this.tableData = sou.data.list;
        this.total = sou.data.total;
        console.log(this.total);
      } else {
        let sou = await productSearch({
          productDesc: inp,
          pageNum: 1,
          pageSize: 3
        });
        this.total = sou.data.total;
        this.tableData = sou.data.list;
      }
    },
    //跳转  添加页面
    goDetail() {
      this.$router.push("/detail");
    },
    //下架
    async getplsit() {
      let defaultParams = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      let productlists = await productlist(defaultParams);
      console.log(productlists);
      this.tableData = productlists.data.list;
    },
    async togglestatus(row) {
      //需要的两个东西  productId  status
      // this.status  往后后台传递的值
      this.status = row.status == "0" ? "1" : "0";
      let productStatus = await changeStatus({
        productId: row._id,
        status: this.status
      });
      this.getplsit();
    },
    //详情修改数据   还没有写完
    productxian(row) {
      this.updateproduct = true;
      this.form.username = row.name;
      this.form.passnam=row.desc
      this.form.jiage=row.price
      this.row = row;
    },
    async produdom() {
      let defaultParam = {
        name: this.form.name,
        status: this.form.region,
        detail: this.form.detail,
        price: this.form.price,
        imgurl: this.form.pic,
        desc: this.form.desc
      };
      // let categorydateDates = await upgaibian(defaultParam);
      // console.log(categorydateDate)
      // this.getplsit()
      this.updateproduct = false;
    },
    // 获取详情  做好了
    upxiangqing(row){
      this.updatexiangqing=true
      this.form.username = row.name;
      this.form.passnam=row.desc
      this.form.jiage=row.price
      this.row = row;
    },
    guanbi(){
       this.updatexiangqing=false
    }
  },
  mounted() {
    this.getplsit();
  }
};
</script>
<style scoped>
/deep/.el-dialog {
  width: 40%;
}
.usernav {
  width: 100%;
  height: 100px;
  background-color: #fff;
}
</style>