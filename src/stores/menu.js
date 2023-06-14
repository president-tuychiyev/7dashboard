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
                        label: () => h(RouterLink, { to: { name: 'cabinet.new.order' } }, { default: () => 'Заказы' }),
                        key: 'cabinet.new.order',
                        icon: renderIcon(BagCheckOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.new.promocode' } }, { default: () => 'Промокоды' }),
                        key: 'cabinet.new.promocode',
                        icon: renderIcon(BarcodeSharp)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.new.user' } }, { default: () => 'Пользователи' }),
                        key: 'cabinet.new.user',
                        icon: renderIcon(PeopleOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.new.role' } }, { default: () => 'Роли и разрешения' }),
                        key: 'cabinet.new.role',
                        icon: renderIcon(ShieldOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.new.log' } }, { default: () => 'Логи' }),
                        key: 'cabinet.new.log',
                        icon: renderIcon(ConstructOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.new.category' } }, { default: () => 'Категории' }),
                        key: 'cabinet.new.category',
                        icon: renderIcon(ListCircleOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.new.product' } }, { default: () => 'Товары' }),
                        key: 'cabinet.new.product',
                        icon: renderIcon(DocumentAttachOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.new.region' } }, { default: () => 'Регионы' }),
                        key: 'cabinet.new.region',
                        icon: renderIcon(GlobeOutline)
                    },
                    {
                        label: () => h(RouterLink, { to: { name: 'cabinet.new.zone' } }, { default: () => 'Зоны' }),
                        key: 'cabinet.new.zone',
                        icon: renderIcon(LocationOutline)
                    }
                ]
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.category' } }, { default: () => 'Категории' }),
                key: 'cabinet.category',
                icon: renderIcon(AppsOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.product' } }, { default: () => 'Товары' }),
                key: 'cabinet.product',
                icon: renderIcon(DocumentAttachOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.color' } }, { default: () => 'Цвета' }),
                key: 'cabinet.color',
                icon: renderIcon(ColorPaletteOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.collection' } }, { default: () => 'Подборки' }),
                key: 'cabinet.collection',
                icon: renderIcon(FileTrayStackedOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.popular' } }, { default: () => 'Популярное' }),
                key: 'cabinet.popular',
                icon: renderIcon(BarChartOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.trend' } }, { default: () => 'Тренды' }),
                key: 'cabinet.trend',
                icon: renderIcon(StarOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.section' } }, { default: () => 'Блоки' }),
                key: 'cabinet.section',
                icon: renderIcon(FileTrayFullOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.slider' } }, { default: () => 'Слайдеры' }),
                key: 'cabinet.slider',
                icon: renderIcon(PushOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.banner' } }, { default: () => 'Баннеры' }),
                key: 'cabinet.banner',
                icon: renderIcon(NewspaperOutline)
            },
            {
                label: () => h(RouterLink, { to: { name: 'cabinet.promocode' } }, { default: () => 'Промо' }),
                key: 'cabinet.promocode',
                icon: renderIcon(BarcodeSharp)
            }
        ]
    })

    const setDefaultValue = (defaultValue) => {
        details.defaultValue = defaultValue
    }

    return { setDefaultValue, details }
})