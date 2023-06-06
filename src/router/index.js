import { createRouter, createWebHistory } from 'vue-router'
import { useBreadcrumb } from '../stores/Breadcrumb'
import { useMenu } from '../stores/menu'

const AUTH_TOKEN = $cookies.get('AUTH_TOKEN') ?? null

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            beforeEnter(to, from, next) {
                console.log(to);
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../auth/Login.vue'),
            meta: { title: "Login" },
            beforeEnter(to, from, next) {
                if (AUTH_TOKEN) {
                    next({ name: 'cabinet.home' })
                } else {
                    next()
                }
            },
        },
        {
            path: '/cabinet',
            name: 'cabinet',
            component: () => import('../auth/Auth.vue'),
            children: [
                {
                    path: '/cabinet/home',
                    name: 'cabinet.home',
                    component: () => import('../view/Home.vue'),
                    meta: { title: 'Home page', breadcrumbClosable: false }
                },
                {
                    path: '/cabinet/users',
                    name: 'cabinet.users',
                    component: () => import('../view/User.vue'),
                    meta: { title: 'Users page' }
                }
            ]
        }
    ],
})

router.beforeEach((to, from) => {
    if (to.name != 'login') {
        useBreadcrumb().add(to.meta.title, to.name, to.meta.breadcrumbClosable ?? true)
        useMenu().setDefaultValue(to.name)
    }
})

export default router