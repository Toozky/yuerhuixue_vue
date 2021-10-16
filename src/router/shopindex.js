import AdminShopIndex from '@/views/AdminShopIndex'
import AdminInsType from "@/views/AdminInsType";
import AdminInstrument from "@/views/AdminInstrument";
import AdminShopMain from "@/views/AdminShopMain"

//乐器管理页面
const shoprouters=[
    {
        path:'/AdminShopIndex',
        name:'商品管理',
        component:AdminShopIndex,
        icon:'el-icon-s-goods',
        children:[
            {
                path:'AdminInsType',
                name:'乐器类型管理',
                icon:'el-icon-s-grid',
                component:AdminInsType,
                show:true,
            },
            {
                path: 'AdminInstrument',
                name: '乐器管理',
                icon: 'el-icon-service',
                component: AdminInstrument,
                show:true,
            },
            {
                path: 'AdminShopMain',
                name: '首页',
                component: AdminShopMain,
                show:false,
            }
        ]

    },
]


export default shoprouters
