import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "loginpage",
        component: () => import("@/pages/LoginPage.vue"),
    },
    {
        path: "/home", redirect: '/home/hall',
        name: "home",
        component: () => import("@/pages/HomePage.vue"),
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: 'hall',
                name: 'hall',
                component: ()=> import("@/pages/HallView.vue")
            },
            {
                path: "passage/:id(\\d+)",
                name: "passage",
                meta: {
                    requiresAuth: true,
                },
                component: () => import("@/pages/PassageView.vue"),
            },
            {
                path: 'admin',
                name: 'admin',
                meta: {
                    requiresAuth: true,
                },
                component: ()=> import("@/pages/AdminView.vue")
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = sessionStorage.getItem("token");
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            ElMessage.error("请先登录噢");
            next("/");
        } else {
            next();
        }
    } else next();
});

export default router;
