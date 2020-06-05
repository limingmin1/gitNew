const mongoose=require("mongoose")
//描述的文档结构schema
const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    phone:String,
    email:String
})
// 定义model与集合对用 操作集合
const UserModel=mongoose.model("user",userSchema)
// 初始化超级管理元
UserModel.findOne({username:"admin"}).then(user=>{
    if(!user){
        UserModel.create({username:"admin",password:"admin"}).then(user=>{
            console.log("初始化的用户名为admin  密码同样为admin")
        })
    }
})
module.exports=UserModel
