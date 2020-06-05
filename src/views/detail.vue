<template>
  <div>
    <div>
      <h4>添加商品</h4>
    </div>
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="0" value="0"></el-option>
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品图片">
          <!-- <el-input type="file" v-model="form.pic"></el-input>
          -->
          <el-upload
            action
            class="avatar-uploader"
            list-type="picture-card"
            :auto-upload="false"
            :show-file-list="true"
            multiple
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadFile"
            ref="upload"
          >
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品详情"></el-form-item>
        <el-input type="textarea" v-model="form.detail"></el-input>
        <!-- <el-form-item>
          <el-button type="primary" @click="uploadFile">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item> -->
      </el-form>
    </div>
  </div>
</template>
<script>
import { addproduct, picUpload } from "../api/index";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { upload } from '../axios/http';
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        datail: "",
        price: "",
        pic: "",
        desc: ""
      },
      //接受成功返回的图片路径
      imageUrl: ""
    };
  },
  methods: {
    async createproduct() {
      // var formData=new FormData()
      // this.piclist.forEach(val=>{
      //   formData.append("file",val.row)
      // })
      let defaultParam = {
        name: this.form.name,
        status: this.form.region,
        detail: this.form.detail,
        price: this.form.price,
        imgurl: this.form.pic,
        desc: this.form.desc
      };
      // console.log(formData.get("file"))
      // let picData=await picUpload(formData)
      // console.log(picData)
      let productData = await addproduct(defaultParam);
    },
   handleAvatarSuccess(res, file) {
    this.imageUrl = URL.createObjectURL(file.raw);
  },
  
   async uploadFile(){
      const formData=new FormData()
      const file=this.$refs.upload.uploadFiles[0]
      if(!file){
        alert("请选择文件")
        return
      }
      formData.append("file",file.raw)
      await picUpload(formData,(res)=>{
        //多个的时候遍历
        // 如果是个单个的文件  可以采用  最终解决方案韩式才有遍历this.imageUrl=res.data[0].url
         this.imageUrl=res.data.url
         this.createproduct()
      })
   },

  beforeAvatarUpload(file) {
    console.log(file)
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error("上传头像图片只能是 JPG 格式!");
    }
    if (!isLt2M) {
      this.$message.error("上传头像图片大小不能超过 2MB!");
    }
    return isJPG && isLt2M;
  }
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>