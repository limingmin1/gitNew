<template>
    <div>
       <div class="slide">
           <LeftMenu></LeftMenu>
       </div>
       <div class="content">
           <Indexyi></Indexyi>
       </div>
    </div>
</template>
<script>
import LeftMenu from "../components/LftMenu"
import Indexyi from "./indexyi"
export default {
    components:{LeftMenu,Indexyi}
}
</script>
<style>
  .slide{
      float: left;
      height: 100vh;
      background-color: rgb(84, 92, 100)
  }
  .content{
      width: 70%;
      float: left;
      height: 100vh;
  }
</style>