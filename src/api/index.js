import {get,post,upload} from "../axios/http.js"
// import { response } from "express"
import jsonp from "jsonp"
import router from "../router/index.js"
//用户登录
function login(params){
    return post("/api/login",params)
}
//获取用户信息
function getUserInfo(params){
    return get("/api/getuserinfo",params)
}
//退出登录
function loginout(params){
    return get("/api/loginout",params)
}
//添加用户
function addUser(params){
    return post("/api/adduser",params)
}
//获取用户信息
function getlist(params){
   return get("/api/getuserlist",params) 
}
//删除用户
function deleteuser(params){
    return post("/api/delete",params)
}
//更新用户
function updateuser(params){
    return post("/api/update",params)
}
//创建角色
function createroleuser(params){
   return post("/api/role/add",params)
}
//获取角色列表
function getrolelist(params){
return get("/api/role/list",params)
}
//商品
function addcategory(params){
    return  post("/api/category/add",params)
}
//获取分类列表
function getcategorylist(params){
    return get("/api/category/list",params)
}
//更新分类列表
function updatecategory(params){
    return post("/api/category/update",params)
}
//产品
function addproduct(params){
    return post("/api/product/add",params)
}
//获取产品列表
function productlist(params){
    return get("/api/product/list",params)
}
//更新产品状态
function changeStatus(params){
    return post("/api/product/updataStatus",params)
}
//查询产品
function productSearch(params){
  return get("/api/product/search",params)
}
// 上传图片
function picUpload(params,handle){
    return upload("/api/img/upload",params,handle)
}
//商品管理更改用户信息
function upgaibian(params){
   return post("/api/upstxiuga",params)
}
export {
    login,
    getUserInfo,
    loginout,
    addUser,
    getlist,
    deleteuser,
    updateuser,
    createroleuser,
    getrolelist,
    addcategory,
    getcategorylist,
    updatecategory,
    addproduct,
    productlist,
    changeStatus,
    productSearch,
    picUpload,
    upgaibian
}
export function reqweather(city){
   const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
   return new Promise((resolve,reject)=>{
       jsonp(url,{
           params:'callback'
       },(error,response)=>{
           if(!error &&response.status=="success"){
               const {dayPictureUrl,weather}=response.results[0].weather_data[0]
               resolve({dayPictureUrl,weather})
           }else{
               alert("获取天气")
           }
       })
   })
}