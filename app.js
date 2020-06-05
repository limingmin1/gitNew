// const express=require("express")
// const mongoose=require("mongoose")
// const cookieParser=require("cookie-parser")
// const router=require("./router")
// // 设置跨域请求头  router  app  get   app.post
// // router.all('*',(req,res,next)=>{
// //     res.setHeader("Access-Control-Allow-Origin","*")
// //     res.setHeader("Access-Control-Allow-Hearers","content-type")
// //     res.setHeader("Access-Controll-Allow-Method","get post put delete patch")
// //     next()
// // })

// var app=express()
// app.use(cookieParser())
// app.use(express.json())
// //处理post请求
// app.use(express.urlencoded({extended:false}))
// app.use(express.json())
// console.log(mongoose)
// app.use(router)
// mongoose.connect("mongodb://127.0.0.1:27017/user",{useNewUrlParser:true})
// .then(()=>{
//     console.log("数据库连接成功")
//     app.listen(3000,()=>{
//         console.log("服务器启动成功")
//     })
// }).catch(error=>{
//     console.log("数据库连接失败")
// })

const express=require("express")
const mongoose=require("mongoose")
const cookieParser=require("cookie-parser")
var app=express()
const router=require("./router")
// 设置跨域请求头  router  app  get   app.post
// router.all('*',(req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*")
//     res.setHeader("Access-Control-Allow-Hearers","content-type")
//     res.setHeader("Access-Controll-Allow-Method","get post put delete patch")
//     next()
// })
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

app.use(express.json())
//处理post请求

// app.use(express.json())
// console.log(mongoose)
app.use(router)
mongoose.connect("mongodb://127.0.0.1:27017/user",{useNewUrlParser:true})
.then(()=>{
    console.log("数据库连接成功")
    app.listen(3000,()=>{
        console.log("服务器启动成功")
    })
}).catch(error=>{
    console.log("数据库连接失败")
})