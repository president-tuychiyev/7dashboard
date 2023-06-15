import { createRouter, createWebHistory } from 'vue-router'
import { useBreadcrumb } from '../stores/Breadcrumb'
import { useMenu } from '../stores/menu'

const AUTH_TOKEN = $cookies.get('AUTH_TOKEN') ?? null

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: { name: 'login' }
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
            path: '/cabinet/new',
            name: 'cabinet.new',
            component: () => import('../auth/Auth.vue'),
            children: [
                {
                    path: '/cabinet/new/orders',
                    name: 'cabinet.new.order',
                    component: () => import('../view/new/Order.vue'),
                    meta: { title: 'Oders page' }
                },
                {
                    path: '/cabinet/new/promocodes',
                    name: 'cabinet.new.promocode',
                    component: () => import('../view/new/Promocode.vue'),
                    meta: { title: 'Promocodes page' }
                },
                {
                    path: '/cabinet/new/users',
                    name: 'cabinet.new.user',
                    component: () => import('../view/new/User.vue'),
                    meta: { title: 'Users page' }
                },
                {
                    path: '/cabinet/new/roles',
                    name: 'cabinet.new.role',
                    component: () => import('../view/new/Role.vue'),
                    meta: { title: 'Roles page' }
                },
                {
                    path: '/cabinet/new/logs',
                    name: 'cabinet.new.log',
                    component: () => import('../view/new/Log.vue'),
                    meta: { title: 'Logs page' }
                },
                {
                    path: '/cabinet/new/categories',
                    name: 'cabinet.new.category',
                    component: () => import('../view/new/Category.vue'),
                    meta: { title: 'Categories page' }
                },
                {
                    path: '/cabinet/new/products',
                    name: 'cabinet.new.product',
                    component: () => import('../view/new/Product.vue'),
                    meta: { title: 'Products page' }
                },
                {
                    path: '/cabinet/new/regions',
                    name: 'cabinet.new.region',
                    component: () => import('../view/new/Region.vue'),
                    meta: { title: 'Regions page' }
                },
                {
                    path: '/cabinet/new/zones',
                    name: 'cabinet.new.zone',
                    component: () => import('../view/new/Zone.vue'),
                    meta: { title: 'Zones page' }
                }
            ],
            beforeEnter(to, from, next) {
                if (!AUTH_TOKEN) {
                    next({ name: 'login' })
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
                    path: '/cabinet/categories',
                    name: 'cabinet.category',
                    component: () => import('../view/Category.vue'),
                    meta: { title: 'Categories page' }
                },
                {
                    path: '/cabinet/products',
                    name: 'cabinet.product',
                    component: () => import('../view/Product.vue'),
                    meta: { title: 'Products page' }
                },
                {
                    path: '/cabinet/colors',
                    name: 'cabinet.color',
                    component: () => import('../view/Color.vue'),
                    meta: { title: 'Colors page' }
                },
                {
                    path: '/cabinet/collections',
                    name: 'cabinet.collection',
                    component: () => import('../view/Collection.vue'),
                    meta: { title: 'Collections page' }
                },
                {
                    path: '/cabinet/populars',
                    name: 'cabinet.popular',
                    component: () => import('../view/Popular.vue'),
                    meta: { title: 'Populars page' }
                },
                {
                    path: '/cabinet/trends',
                    name: 'cabinet.trend',
                    component: () => import('../view/Trend.vue'),
                    meta: { title: 'Trends page' }
                },
                {
                    path: '/cabinet/sections',
                    name: 'cabinet.section',
                    component: () => import('../view/Section.vue'),
                    meta: { title: 'Sections page' }
                },
                {
                    path: '/cabinet/sliders',
                    name: 'cabinet.slider',
                    component: () => import('../view/Slider.vue'),
                    meta: { title: 'Sliders page' }
                },
                {
                    path: '/cabinet/banners',
                    name: 'cabinet.banner',
                    component: () => import('../view/Banner.vue'),
                    meta: { title: 'Banners page' }
                },
                {
                    path: '/cabinet/promocodes',
                    name: 'cabinet.promocode',
                    component: () => import('../view/Promocode.vue'),
                    meta: { title: 'Promocodes page' }
                },
            ],
            beforeEnter(to, from, next) {
                if (!AUTH_TOKEN) {
                    next({ name: 'login' })
                } else {
                    next()
                }
            },
        }
    ],
})

router.beforeEach((to, from) => {
    if (to.name != 'login' && to.name != 'index') {
        useBreadcrumb().add(to.meta.title, to.name, to.meta.breadcrumbClosable ?? true)
        useMenu().setDefaultValue(to.name)
    }
})

export default router