const express=require("express")
const UserModel=require("./model/usermodel")
const RoleModel=require("./model/rolemodel")
const CategoryModel=require("./model/categorymodel")
const ProductModel=require("./model/productmodel")
const router=express.Router()
//指定过滤的属性   password
const filter={password:0,__v:0}
router.all("*",(req,res,next)=>{
    res.setHeader("Access-Controll-Allow-Origin","http://localhost:8081")
    res.setHeader("Access-Controll-Allow-Headers","Content-type")
    res.setHeader("Access-Controll-Allow-Method","get,post,put,delete,patch,options")
    res.setHeader("Access-Controll-Allow-Credentials","true")
    next()
})
　
 

//加的该删就删
// Axios.defaults.withCredentials=true
//password  加密  md5
router.post("/login",(req,res)=>{
    //quer   body
    const {username,password}=req.body
    //findOne
    //登录的逻辑操作
    UserModel.findOne({username,password})
    .then((user)=>{
        console.log(user)
        // res.send("234")
        if(user){  //登录成功
            res.cookie("userid",user._id,{maxAge:1000*60*60*24})
            // 角色管理
            res.send({data:"登录成功",code:0})
        }else{
            res.send({code:1,err:"登录失败"})
        }
    })
})
// 获取用户信息
router.get("/getuserinfo",(req,res)=>{
    const userId=req.cookies.userid
    // 判断   如果当前的用户id不存在，直接返回一个提示，提示未登录
    if(!userId){
        return res.send({code:1,msg:"未登录"})
    }
    // 根据用户模型取查找用户信息
    console.log(userId)
    UserModel.findOne({_id:userId},filter).then(user=>{

        if(user){
            res.send({code:0,data:user})
        }else{
            // 告诉浏览器   清除userId
            res.clearCookie("userid")
            res.send({coode:1,msg:"获取用户失败,请重新登录"})
        }
    }).catch(err=>{
        if(err){
            res.send({code:1,msg:"获取用户信息"})
        }
    })
    // res.send({"id":userId})
})



// 退出登录
router.get("/loginout",(req,res)=>{
    res.cookie("userid")
    res.send({code:0,msg:"退出登录"})
})
// 添加用户
// 获取前端数据
// 判断用户是否存在  
router.post("/adduser",(req,res)=>{
     const {username,password}=req.body
     UserModel.findOne({username}).then(user=>{
         if(user){
             res.send({code:1,msg:"该用户已存在"})
         }else{
             return UserModel.create(req.body)
         }
     }).then(user=>{
         res.send({code:0,data:user})
     }).catch(error=>{
         res.send({code:1,msg:"添加用户异常"})
     })
})
//获取普通用户列表
router.get("/getuserlist",(req,res)=>{
    //页数    每页显示的条数
    const {pageNum,pageSize}=req.query
    UserModel.find({username:{"$ne":"admin"}}).then(user=>{
        RoleModel.find().then(roles=>{
            res.send({code:0,data:pageFilter(user,pageNum,pageSize)})
        })
    }).catch(error=>{
        res.send({code:1,msg:"获取用户列表异常"})
    })
})

// 删除用户
router.post("/delete",(req,res)=>{
    //代表曾前端王后端传递的字段需要userId
    const {userId}=req.body
    UserModel.deleteOne({_id:userId}).then(user=>{
        res.send({code:0,msg:"删除成功"})
    })
})
//更新用户
router.post("/update",(req,res)=>{
    var user=req.body
    UserModel.findOneAndUpdate({_id:user._id},user).then(olduser=>{
        const data=Object.assign(olduser,user)  //新的去工改旧的
        res.send({code:0,data})
    }).catch(error=>{
        res.send({code:1,msg:"更新用户异常"})
    })
})
//分装分页函数
//arr显示条数  pageNum是页数  pageSize条数
function pageFilter(arr,pageNum,pageSize){
    pageNum=pageNum*1   
    pageSize=pageSize*1
    const total=arr.length  //一页的条数
    //求出它的页数  
    const pages=Math.floor((total+pageSize-1)/pageSize)
    // 从第几页开始    一页的条数
    const start=pageSize*(pageNum-1)
    // 达倒个数往后走
    const end=start+pageSize<=total?start+pageSize:total
    const list=[];
    for(var i=start;i<end;i++){
      list.push(arr[i])
    }
    return{
        pageNum,
        total,
        pages,
        pageSize,
        list
    }
}


//开始角色管理界面接口
//创建角色
router.post("/role/add",(req,res)=>{
    const {rolename}=req.body
    //创建 create
    RoleModel.create({name:rolename}).then(role=>{
      res.send({code:0,data:role})
    }).catch(error=>{
        res.send({code:1,msg:"创建异常"})
    })
})
//获取角色列表
router.get("/role/list",(req,res)=>{
    const {pageNum,pageSize}=req.query
    RoleModel.find().then(roles=>{
        res.send({code:0,data:pageFilter(roles,pageNum,pageSize)})
    }).catch(error=>{
       res.send({code:1,msg:"获取角色列表异常"})
    })
})
//设置角色权限
router.post("/role/update",(req,res)=>{
    const role=req.body
    role.auth_time=Date.now()
    //设置到更新
    RoleModel.findOneAndUpdate({_id:role._id},role).then(oldRole=>{
        //有什么作用?
        res.send({code:0,data:{...oldRole._doc,...role}})
    }).catch(error=>{
        res.send({code:1,msg:"更新角色异常"})
    })
})
//一下为商品下面的品类管理
router.post("/category/add",(req,res)=>{
    const {categoryName,parentId}=req.body
    CategoryModel.create({name:categoryName,parentId:parentId||'0'})
    .then(category=>{
        res.send({code:0,data:category})
    }).catch(error=>{
        res.send({code:1,msg:"添加异常"})
    })
})
// 获取分类
router.get("/category/list",(req,res)=>{
    const parentId=req.query.parentId||'0'
    console.log('eeee'+req.query.parentId)
    CategoryModel.find({parentId}).then(categorys=>{
        res.send({code:0,data:categorys})
    }).catch(error=>{
        res.send({code:1,msg:"获取分类异常"})
    })
})
// 更新分类
router.post("/category/update",(req,res)=>{
    const{categoryId,categoryName}=req.body
    CategoryModel.findOneAndUpdate({_id:categoryId},{name:categoryName})
    .then(categorys=>{
        res.send({code:0,data:categorys})
    }).catch(error=>{
        res.send({code:1,msg:"更新异常"})
    })
})
//以下是添加商品接口
//添加产品
router.post("/product/add",(req,res)=>{
    const product=req.body
    ProductModel.create(product).then(product=>{
        res.send({code:0,data:product})
    }).catch(error=>{
     res.send({code:1,msg:"添加产品异常"})
    })

})
//获取产品列表
router.get("/product/list",(req,res)=>{
    const {pageNum,pageSize}=req.query
    ProductModel.find().then(products=>{
        res.send({code:0,data:pageFilter(products,pageNum,pageSize)})
    }).catch(error=>{
        res.send({code:1,msg:"获取产品列表异常"})
    })
})
//更新产品状态
router.post("/product/updataStatus",(req,res)=>{
    const {productId,status}=req.body
    ProductModel.findOneAndUpdate({_id:productId},{status}).then(oldProduct=>{
        res.send({code:0})
    }).catch(error=>{
        res.send({code:1,msg:"更新状态异常"})
    })
})
//搜索
router.get("/product/search",(req,res)=>{
    const {pageNum,pageSize,searchName,prodcuctName,productDesc}=req.query
    let condition={}
    if(prodcuctName){
        condition={name:new RegExp(`^.*${prodcuctName}.*$`)}
    }else if(productDesc){
       condition={desc:new RegExp(`^.*${productDesc}.*$`)}
    }
    ProductModel.find(condition).then(products=>{
        res.send({code:0,data:pageFilter(products,pageNum,pageSize)})
    }).catch(error=>{
        res.send({code:1,msg:"搜索列表异常"})
    })
})
// 商品管理更改用户信息
router.post("/upstxiuga",(req,res)=>{
    var user=req.body
    UserModel.findOneAndUpdate({_id:user._id},user).then(olduser=>{
        const data=Object.assign(olduser,user)  //新的去工改旧的
        res.send({code:0,data})
    }).catch(error=>{
        res.send({code:1,msg:"更新用户异常"})
    })
})
require("./file-upload")(router)
module.exports=router
