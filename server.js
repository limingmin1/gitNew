//这个是客户端   【前后端分离的时候 在这个页面基本上没有什么作用】



//服务器
//express 作为服务器   mongoose  作为数据库
//只有链接导数据库才可以启动服务器
// const express=require("express")
// const mongoose=require("mongoose")
// const cookiePaer=require("cookie-parser")
// const fs=require("fs")  //fs
// const app=express()
// //需要声明中间件  
// app.use(express.static("static"))
// //bodyparser  处理post请求
// app.use(express.urlencoded({extended:false}))  
// app.use(express.json())//处理请求的结构体   username=tom&&password=123
// //缓存  express-session  cookie-parer
// app.use(cookiePaer())
// const router=require("./router/index")
// // app.use("/",router)
// app.use((req,res)=>{
//     fs.readFile(__dirname+"/index.html",(err,data)=>{
//         if(err){
//             res.send("后台出现错误")
//         }else{
//            console.log(data)
//            res.writeHead(200,{"Contetnt-type":"text/html:charset=utf-8"})
//            res.send(data)
//         }
//     })
// })
// app.listen(3000)