import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from "@/store";
import {loginStatus} from "@/request/api/login";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/itemMusic',
        name: 'itemMusic',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "ItemMusic" */ '../views/ItemMusic.vue')
    },
    {
        path: '/search',
        name: 'search',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "ItemMusic" */ '../views/Search.vue')
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "ItemMusic" */ '../views/Login.vue')
    },
    {
        path: '/infoUser',
        name: 'InfoUser',
        beforeEnter:async (to,from,next)=>{
            let res = await loginStatus()
            console.log(res.data)
            if (res.data.data.account.status===0){
                console.log(res.data.data.account.status)
                store.state.isLogin=true
                next()
            }else {
                next('/login')
            }
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "ItemMusic" */ '../views/InfoUser.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to,from)=>{
    store.state.isFooterMusic = to.path != '/login';
})
export default router

// 4483cb9f-ad23-491c-a873-e5b7da923b00
