const mongoose=require("mongoose")
//定义schema  描述文档结构
const categorySchema=new mongoose.Schema({
    name:{type:String,required:true},
    //根据parentid怕断当前分类的级别  默认值为0
    parentId:{type:String,required:true,default:'0'}
})
const CategoryModel=mongoose.model("categorys",categorySchema)
module.exports=CategoryModel