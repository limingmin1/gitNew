// 通过vuex处理数据
import {login} from "../../api/index"
export default{
    namespaced:true,
    state:{

    },
    mutations:{

    },
    actions:{
        async land(state,data){
            let datas=await login({username:data.username,password:data.password})
            if(datas.code==0){
                
              data.$router.push("/home")
            }
         }
    },
    getters:{

    }
}