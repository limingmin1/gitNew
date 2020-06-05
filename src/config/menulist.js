const menuList=[
    {
        title:"首页",  //侧边栏名称
        key:"/homea",
        index:"0",
        icon:"home",
        ispublic:true
    },{
        title:"商品",  //侧边栏名称
        key:"/shop",
        index:"1",
        icon:"shop",
        children:[     //子菜单
            {
                title:"品类管理",
                key:"/category",
                index:"1-1",
                icon:"bar"
            },{
                title:"商品管理",
                key:"/product",
                index:"1-2",
                icon:"tool"
            }
        ]
    },{
        title:"用户管理",  //侧边栏名称
        key:"/user",
        index:"2",
        icon:"user",
        ispublic:true
    },{
        title:"角色管理",  //侧边栏名称
        key:"/role",
        index:"3",
        icon:"safe"
    },
    {
        title:"图形",  //侧边栏名称
        key:"/roule",
        index:"4",
        icon:"safe"
    },{
        title:"图形图表",  //侧边栏名称
        key:"/chart",
        index:"5",
        icon:"area-chart",
        children:[
           {
            title:"柱形图",  //侧边栏名称
            key:"/chart/bar",
            index:"5-1",
            icon:"bar-chart",
           },{
            title:"折线图",  //侧边栏名称
            key:"/chart/line",
            index:"5-2",
            icon:"line-chart",
           },{
            title:"饼状图",  //侧边栏名称
            key:"/chart/pie",
            index:"5-3",
            icon:"pie-chart",
           } 
        ]
    }
]
export default menuList