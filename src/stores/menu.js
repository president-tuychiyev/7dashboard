import { RouterLink } from 'vue-router'
import {
    HomeOutline, MenuOutline, BagCheckOutline, BarcodeSharp, PeopleOutline, ShieldOutline, ConstructOutline, ListCircleOutline, DocumentAttachOutline, GlobeOutline, LocationOutline, ColorPaletteOutline, FileTrayStackedOutline, BarChartOutline, AppsOutline, StarOutline, FileTrayFullOutline, PushOutline, NewspaperOutline
} from '@vicons/ionicons5'
import { NTag } from 'naive-ui'

export const useMenu = defineStore('menu', () => {
    const details = reactive({
        defaultValue: null,
        options: [
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.home' } }, { default: () => 'Home' }),
                key: 'cabinet.home',
                icon: renderIcon(HomeOutline)
            },
            {
                label: () => h('div', {}, { default: () => ['Меню ', h(NTag, { bordered: false, type: 'info', class: 'rounded h-5 ml-2' }, { default: () => 'new' })] }),
                icon: renderIcon(MenuOutline),
                children: [
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.users' } }, { default: () => 'Заказы' }),
                        key: 'cabinet.users',
                        icon: renderIcon(BagCheckOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.users' } }, { default: () => 'Промокоды' }),
                        key: 'cabinet.users',
                        icon: renderIcon(BarcodeSharp)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.users' } }, { default: () => 'Пользователи' }),
                        key: 'cabinet.users',
                        icon: renderIcon(PeopleOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.users' } }, { default: () => 'Роли и разрешения' }),
                        key: 'cabinet.users',
                        icon: renderIcon(ShieldOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.users' } }, { default: () => 'Логи' }),
                        key: 'cabinet.users',
                        icon: renderIcon(ConstructOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.users' } }, { default: () => 'Категории' }),
                        key: 'cabinet.users',
                        icon: renderIcon(ListCircleOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.users' } }, { default: () => 'Товары' }),
                        key: 'cabinet.users',
                        icon: renderIcon(DocumentAttachOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.users' } }, { default: () => 'Регионы' }),
                        key: 'cabinet.users',
                        icon: renderIcon(GlobeOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.users' } }, { default: () => 'Зоны' }),
                        key: 'cabinet.users',
                        icon: renderIcon(LocationOutline)
                    }
                ]
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.home' } }, { default: () => 'Категории' }),
                key: 'cabinet.home',
                icon: renderIcon(AppsOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.home' } }, { default: () => 'Товары' }),
                key: 'cabinet.home',
                icon: renderIcon(DocumentAttachOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.home' } }, { default: () => 'Цвета' }),
                key: 'cabinet.home',
                icon: renderIcon(ColorPaletteOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.home' } }, { default: () => 'Подборки' }),
                key: 'cabinet.home',
                icon: renderIcon(FileTrayStackedOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.home' } }, { default: () => 'Популярное' }),
                key: 'cabinet.home',
                icon: renderIcon(BarChartOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.home' } }, { default: () => 'Тренды' }),
                key: 'cabinet.home',
                icon: renderIcon(StarOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.home' } }, { default: () => 'Блоки' }),
                key: 'cabinet.home',
                icon: renderIcon(FileTrayFullOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.home' } }, { default: () => 'Слайдеры' }),
                key: 'cabinet.home',
                icon: renderIcon(PushOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.home' } }, { default: () => 'Баннеры' }),
                key: 'cabinet.home',
                icon: renderIcon(NewspaperOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.home' } }, { default: () => 'Промо' }),
                key: 'cabinet.home',
                icon: renderIcon(BarcodeSharp)
            }
        ]
    })

    const setDefaultValue = (defaultValue) => {
        details.defaultValue = defaultValue
    }

    return { setDefaultValue, details }
})