import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes:Array<RouteRecordRaw> = [
    {
        path:'/',
        name:'loginpage',
        component: ()=> import('@/pages/LoginPage.vue'),
    },
    {
        path:'/homepage',
        name:'homepage',
        component: ()=> import('@/pages/HomePage.vue'),
        meta: {
            requiresAuth: true
        }
    }
]

const router = createRouter ({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to,from,next)=> {
    const isAuthenticated = sessionStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            ElMessage.error("请先登录噢");
            next('/');
        }
        else {
            next();
        }
    } else next();
})

export default router;