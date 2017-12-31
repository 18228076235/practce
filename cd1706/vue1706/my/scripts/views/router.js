import Vue from "vue"
import VueRouter from "vue-router";
Vue.use(VueRouter)


import Find from "./find.vue";
import Guild from "./guild.vue";
import Mgz from "./mgz.vue";
import My from "./my.vue";
import Watch from "./watch.vue";
import Index from "./index.vue";
import Detil from "./detil.vue";
// import Wachlist from "../components/wachlist.vue"

//我的子路由
import Login from "../components/login.vue";
import Register from "../components/register.vue"
 

var routes=[
    {
        path:"/",
        component:Guild
    },
    {
        path:"/index",
        component:Index,
        children:[
            {path:"watch",name:"watch",component:Watch},
            {path:"find",name:"find",component:Find},
            {path:"mgz",name:"mgz",component:Mgz},
            {path:"my",name:"my",component:My}, 
            {path:"login",name:"login",component:Login},
            {path:"register",name:"register",component:Register},       
            {path:"*",redirect:"/index/watch"},     
        ]
    },
    {path:"/detil",name:"detil",component:Detil}
]

const router=new VueRouter({
    mode:"hash",
    routes
})

export default router;
