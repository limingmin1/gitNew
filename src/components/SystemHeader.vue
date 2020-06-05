<template>
  <div class="ttop">
   <div class="waiinfo">
    <div class="userinfo">
      欢迎
      <span class="color">{{username}}</span> 登录
      <el-button type="text" class="ondian" @click="open">退出</el-button>
    </div>
   </div>
    <div>
      <h3 class="aa1 yongy">用户管理</h3>
      <div class="aa1 yunyou">
        <img class="aa2" :src="dayPictureUrl">
        {{weather}}
      </div>
    </div>
  </div>
</template>
<script>
import { getUserInfo, loginout, reqweather } from "../api/index";
export default {
  data() {
    return {
      username: "tom",
      weather:"",
      dayPictureUrl:""
    };
  },
  async mounted() {
    let res = await getUserInfo();
    this.username = res.data.username;
    //获取天气
    const {dayPictureUrl,weather}=await reqweather("北京")
    console.log(dayPictureUrl)
    console.log(weather)
    this.weather=weather
    this.dayPictureUrl=dayPictureUrl
  },
  methods: {
    async open() {
      let data = await loginout();
      console.log(data)
      if (data.code == 0) {
      this.$alert(data.msg, "退出登录", {
        confirmButtonText: "确定",
        callback: action => {
          this.$router.push("/");
        }
      });
      }
    }
  },
  
};
</script>
<style scoped>
.ttop{
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  padding-bottom: 5px;
  padding-top: 10px;
}
.yongy{
  float: left;
}
.yunyou{
  float: right;
  padding-right:30px; 
  line-height:20px; 
}
.waiinfo{
  height: 30px;
  border-bottom: 1px solid #4ea27d;
}
.userinfo {
  float: right;
}
.color {
  color: red;
  padding: 5px;
  border-radius: 10%;
}
.aa1{
  margin-top: 10px;
}
.ondian{
  background-color: red;
  padding: 5px;
  border-radius: 5%;
  color: #fff;
}
.aa2{
  width: 30px;
  height: 20px;
  display: block;
  float: left;
  margin-right: 10px;
}
</style>