<template>
     <div class="lefemenu">
        <el-row>
        <el-col :span="4">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#041528"
            text-color="#fff"
            active-text-color="#fff">
            <el-submenu :index="item.index" v-for="(item,index) in list" :key="index">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span class="color-text"><router-link :to="item.key"> {{item.title}}</router-link></span>
                </template>
                <el-menu-item-group v-if="item.children">
                    <el-menu-item :index="item.index" v-for="(data,index) in item.children" :key="index">
                       <router-link class="link" :to="data.key"> {{data.title}} </router-link>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
         </el-col>
        </el-row>
</div>
</template>
<script>
import menuList from "../config/menulist"
export default {
    data(){
      return{
          list:""
      }
    },
    mounted(){
        this.list=menuList
        // this.list=menuList.menuList
    },
    methods:{
        handleOpen(){
        //    console.log(key)
        },
        handleClose(){
        //    console.log(key)
        },
        adder(){
            this.$router.push({ path:'../order'  }) 
        }
    }
}
</script>
<style>
.lefemenu{
    height: 100vh;
    background-color: #041528;
    color: #fff;
}
.color-text{
    color: #fff;
}
</style>