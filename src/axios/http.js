import axios from "axios"
import qs from "qs"
import router from "../router"
import Axios from "axios"
//配置请求
//请求时长
axios.defaults.timeout=2000
axios.defaults.baseURL=process.env.VUE_APP_BASE_API
axios.defaults.withCredentials=true 
//axios请求拦
axios.interceptors.request.use(config=>{
   return config 
})


axios.interceptors.response.use(res=>{
    if(res.status==200 && res.data.code ===0){
        return Promise.resolve(res)
    }else{
        return Promise.resolve(res)
    }
})



//封装请求get和post
function get(url,params={}){
    return new Promise((reslove,reject)=>{
        axios.get(url,{params:params}).then(res=>{
            reslove(res.data)
        }).catch(err=>{
            reject(err.data)
        })
    })
}


function post(url,params){
    return new Promise((reslove,reject)=>{
        axios.post(url,qs.stringify(params))
        .then(res=>{
            reslove(res.data)
        }).catch(err=>{
            reject(err.data)
        })
    })
}
//上传图片
function upload(url,data,handle){
    let instance=axios.create({
        withCredentials:false,
        baseURL:"",
        headers:{
            "Content-Type":"multipart/from-data"
        }
    })
    instance.post(url,data).then(res=>{
        handle(res.data)
    }).catch(error=>{
        console.log(error)
    })
}
export {get,post,upload}
//把 get和post和upload抛出
