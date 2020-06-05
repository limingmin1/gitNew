<template>
<div>
    <el-container class="color-zuo">
        <el-aside width="200px">
            <div class="slide">
                <LeftMenu></LeftMenu>
            </div> 
       </el-aside>
       <el-container class="color-you">
           <el-header class="hegao-top">
               <SystemHeader></SystemHeader>
           </el-header>
       <el-main>
        <div class="content">
            <router-view class="backgroun-con"></router-view>
        </div> 
        </el-main>
      </el-container>
     </el-container>
</div>
</template>
<script>
import LeftMenu from "../components/LftMenu"
import SystemHeader from "../components/SystemHeader"
export default {
    // components:{LeftMenu,SystemHeader}
}
</script>
<style>
   *{
       margin: 0;
       padding: 0;
   }
   .slide{
       float: left;
       /* height: 100vh; */
       background-color: rgb(84, 92, 100);
   }
   .content{
       /* width: 70%; */
       width: 1000px;
       float: left;
   }
   .color-you{
       background-color: #f1f2f5;
   }
   .color-zuo{
       background-color: #041528;
   }
   .backgroun-con{
       width: 1050px;
       background-color: #fff;
       padding: 10px;
   }
   .hegao-top{
       height: 80px;
       background-color: #fff;
   }
</style>