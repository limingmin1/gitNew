const mongoose=require("mongoose")
const productSchema=new mongoose.Schema({
    // productId:{type:String,required:true},
    name:{type:String,required:true},
    desc:{type:String,required:true},
    price:{type:Number,required:true},
    status:{type:String,default:1},  //1  下架  0在售
    imgurl:{type:Array,default:[]},
    default:{type:String}
})
// 定义model      
const productModel=mongoose.model("products",productSchema)
// const productModel=mongoose.model("products";productSchema)
module.exports=productModel