import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/index'
// import Erer from '@/components/erer'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: ()=>import("../views/login.vue")
    },
    {
      path:"/order",
      name:"order",
      component:()=>import("../views/order.vue")
    },
    {
      path:"/home",
      name:"home",
      component:()=>import("../views/home.vue"),
      children:[
        {
          path:"/user",
          component:()=>import("../views/user.vue")
        },
        {
          path:"/role",
          component:()=>import("../views/role.vue")
        },
        {
          path:"/homea",
          component:()=>import("../views/first.vue")
        },
        {
          path:"/shop",
          component:()=>import("../views/shop.vue"),
          children:[
            {
              path:"/category",
              component:()=>import("../views/categroy.vue")
            },
            {
              path:"/product",
              component:()=>import("../views/product.vue")
            },
            {
              path:"/detail",
              component:()=>import("../views/detail.vue")
            }
          ]
        },
        {
          path:"/chart",
          name:"chart",
          component:()=>import("../views/chart.vue"),
          children:[
            {
              path:"/chart/bar",
              component:()=>import("../views/bar.vue")
            },
            {
              path:"/chart/line",
              component:()=>import("../views/line.vue")
            },
            {
              path:"/chart/pie",
              component:()=>import("../views/pie.vue")
            }
          ]
        }
      ]
    }
  ]
})
