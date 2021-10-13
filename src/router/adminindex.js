import AdminIndex from "@/views/AdminIndex";
import AdminMain from "@/views/AdminMain";
import AdminInfo from "@/views/AdminInfo";
import UsersInfo from "@/views/UsersInfo";
import AdminModifyPwd from '@/views/AdminModifyPwd';
import AdminAdd from '@/views/AdminAdd'


const adminroutes=[
    {
        path:'/AdminAdd',
        name:'AdminAdd',
        component:AdminAdd
    },
    {
        path: '/AdminIndex',
        name: '管理员管理',
        component: AdminIndex,
        icon:'el-icon-menu',
        children:[
            {
                path:'AdminInfo',
                name:'当前管理员信息',
                icon:'el-icon-s-custom',
                show:true,
                component:AdminInfo
            },
            {
                path: 'AdminModifyPwd',
                name: '修改当前密码',
                icon: 'el-icon-lock',
                show: true,
                component: AdminModifyPwd,
            },
            {
                path:'UsersInfo',
                name:'用户管理',
                icon:'el-icon-user',
                show:true,
                component:UsersInfo
            },
            {
                path:'AdminMainPage',
                name:'AdminMainPage',
                show: false,
                component:AdminMain
            },



        ]
    }
]

export default adminroutes