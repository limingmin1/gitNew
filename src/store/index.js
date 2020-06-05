import Vue from "vue"
import Vuex from "vuex"
// 单独处理login模块 moudle
import login from "../store/moudles/login"
Vue.use(Vuex)
// const state={

// }
// const mustations={

// }
// const getters={

// }
// const actions={

// }
// const module={

// }
// export default new Vuex.Store({
//     state,
//     mustations,
//     getters,
//     actions,
//     module
// })
console.log(login)
export default new Vuex.Store({
    //模块
    modules:{login}
})