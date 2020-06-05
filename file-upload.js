//处理文件上传
const multer=require("multer")
const path=require("path")
// 文件系统
const fs=require("fs")
// 存放上传图片文件
const dirPath=path.join(__dirname,"./public/upload")
const storage=multer.diskStorage({
    //destination   "upload"  服务启动自动创建文件夹
    destination:function(req,file,cb){
        //判断目录是否存在  不存在就创建
        if(!fs.existsSync(dirPath)){
             fs.mkdir(dirPath,{recursive:true},function(err){
                 if(err){
                     console.log(err)
                 }else{
                     cb(null,dirPath)
                 }
             })
        }else{
            //有了  就是手动创建好的
            cb(null,dirPath)
        }
    },
    filename:function(req,file,cb){
        //最原始的路径
        var ext=path.extname(file.originalname)
        //生成的图片不一样  路径
        cb(null,file.fieldname+'-'+Date.now()+ext)
    }
})
//将配置注入到multer中   将上面的拉下来
const upload=multer({storage})
//定义上传文件的类型   single 单文件  array  多文件  files
// const uploadSingle=upload.single("image")
const uploadSingle=upload.array("file")
module.exports=function fileUpload(router){
    //  上传图片
    router.post("/img/upload",(req,res)=>{
        uploadSingle(req,res,function(err){
            //错处理
            if(err){
                res.send({code:1,msg:"上传图片失败"})
            }
            
            var file=req.files
            // console.log(file)
            var picData=[]
            file.forEach((i)=>{
               picData.push({name:i.filename,url:"http://localhost:3000/public/upload"+i.filename}) 
            })
            res.send({code:0,data:picData})
        })
    })

    // 删除图片
    router.post("/img/delete",(req,res)=>{
        const {name}=req.body
        //fs.unlink 删除单个文件
        fs.unlink(path.join(dirPath,name),err=>{
            if(err){
                res.send({code:1,msg:"删除图片失败"})
            }else{
                res.send({code:0,msg:"删除图片成功"})
            }
        })
    })

}
