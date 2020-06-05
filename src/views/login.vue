//首页
<template>
  <div class="wrap">
     <div class="login">
         <h2>用户登录</h2>
       <el-input class="vivi" v-model="username" placeholder="请输入用户名"></el-input>
       <el-input class="vivi" v-model="password" placeholder="请输入密码"></el-input>
       <el-button class="viviyi" type="primary" @click="landBtn">登录</el-button>
     </div>
  </div>
</template>

<script>
// vue的写法
// import {login} from "../api/index";
// vuex的写法
import {mapActions} from "vuex"
export default {
   data(){
       return{
           username:"",
           password:""
       }
   },
   methods: {
     //vuex的写法
     ...mapActions("login",["land"]),
     landBtn(){
        console.log(this.land({username:this.username,password:this.password,$router:this.$router}))
     }
    //vue的写法
    //  async land(){
    //      let data=await login({username:this.username,password:this.password})
    //      console.log(data)
    //      if(data.code==0){
    //        this.$router.push("/home")
    //      }
    //   }
},
mounted(){
  
}
}
</script>

<style scoped>
.wrap{
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: aqua;
}
.login{
  width: 400px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -200px;
  background-color: #fff;
  padding: 20px;
}
.login h2{
  display: block;
  width: 400px;
  text-align: center;
  margin: 20px auto 40px;
}
.vivi{
  margin-bottom: 20px;
}
.viviyi{
  display: block;
  width: 400px;
  margin: 0 auto;
}
</style>


