import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes:Array<RouteRecordRaw> = [
    {
        path:'/',
        name:'loginpage',
        component: ()=> import('../pages/LoginPage.vue'),
    },
    {
        path:'/homepage',
        name:'homepage',
        component: ()=> import('../pages/HomePage.vue'),
    }
]

const router = createRouter ({
    history: createWebHistory(),
    routes,
})

export default router;