<script setup>
import { NButtonGroup, NButton, NDropdown } from 'naive-ui'
import { Pencil, EyeOutline, Menu } from '@vicons/ionicons5'
import moment from 'moment'
import axios from '../../api/axios'
import Table from '../../components/Table.vue'
const orders = ref({ data: [] })
const details = reactive({
    query: {
        page: 1,
        column: 'id',
        sort: 'desc',
        limit: 15
    },
    columns: [
        {
            title: '№',
            key: 'client_order_id',
            sorter: 'default'
        },
        {
            title: 'Заказчик',
            key: 'user_id',
            render(row) {
                return row.user ? (row.user.first_name ?? '(' + row.user.phone + ')') + ' ' + (row.user.last_name ?? '') : '🗑 ' + (row.user_data.first_name ?? '(' + row.user_data.phone + ')') + ' ' + (row.user_data.last_name ?? '')
            },
            sorter: 'default'
        },
        {
            title: 'Итоговая сумма',
            key: 'total_price',
            render: (row) => new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.total_price),
            filterMultiple: false,
            filterOptionValue: null,
            filterOptions: [
                {
                    label: 'UZS',
                    value: 'UZS'
                },
                {
                    label: 'USD',
                    value: 'USD'
                }
            ],
            filter: 'default'
        },
        {
            title: 'Метод оплаты',
            key: 'payment_method',
            render(row) {
                switch (row.payment_method) {
                    case 1: return 'Наличные'
                    case 2: return 'PAYME'
                    case 3: return 'CLICK'
                    case 4: return 'CARD'
                    case 5: return 'VISA'
                    case 6: return 'MCARD'
                }
            },
            sorter: 'default',
            filterMultiple: false,
            filterOptionValue: null,
            filterOptions: [
                { label: 'Наличные', value: '1' },
                { label: 'PAYME', value: '2' },
                { label: 'CLICK', value: '3' },
                { label: 'CARD', value: '4' },
                { label: 'VISA', value: '5' },
                { label: 'MCARD', value: '6' }
            ],
            filter: 'default'
        },
        {
            title: 'Статус заказа',
            key: 'state',
            render(row) {
                switch (row.state) {
                    case 1: return '🆕 Новый'
                    case 2: return '🕔 В обработке'
                    case 3: return '🚚 В пути'
                    case 4: return '✅ Выполнен'
                    case -1: return '❌ Отмена'
                    case -2: return '↩️ Возврат'
                    case 5: return '💤 Завершен'
                }
            },
            sorter: 'default',
            filterMultiple: false,
            filterOptionValue: null,
            filterOptions: [
                {
                    label: 'Новый',
                    value: '1'
                },
                {
                    label: 'В обработке',
                    value: '2'
                },
                {
                    label: 'В пути',
                    value: '3'
                },
                {
                    label: 'Выполнен',
                    value: '4'
                },
                {
                    label: 'Отмена',
                    value: '-1'
                },
                {
                    label: 'Возврат',
                    value: '-2'
                },
                {
                    label: 'Завершен',
                    value: '5'
                }
            ],
            filter: 'default'
        },
        {
            title: 'Статус оплаты',
            key: 'payment_state',
            render(row) {
                switch (row.payment_state) {
                    case 1: return h('span', { class: 'font-bold text-green-600' }, '✅ Оплачен')
                    case 0: return h('span', { class: 'text-red-600' }, '⚠️ Не оплачен')
                }
            },
            sorter: 'default',
            filterMultiple: false,
            filterOptionValue: null,
            filterOptions: [
                {
                    label: 'Оплачен',
                    value: '1'
                },
                {
                    label: 'Не оплачен',
                    value: '0'
                }
            ],
            filter: 'default'
        },
        {
            title: 'Дата',
            key: 'created_at',
            render(row) {
                return moment(row.created_time).format("DD.MM.YYYY | HH:mm")
            },
            sorter: 'default'
        },
        {
            title: 'Действия',
            align: 'center',
            render: () => {
                return h(NButtonGroup, null, {
                    default: () => [
                        h(NButton, null, { default: () => h(renderIcon(Pencil)) }),
                        h(NButton, null, { default: () => h(renderIcon(EyeOutline)) }),
                        h(NDropdown, { filterable: true, options: details.actionOptions, trigger: 'click' }, { default: () => h(NButton, null, { default: () => h(renderIcon(Menu)) }) })
                    ]
                })
            }
        }
    ],
    actionOptions: [
        {
            type: "group",
            label: "Статус заказа",
            key: "state",
            children: [
                {
                    label: 'Новый',
                    value: '1'
                },
                {
                    label: 'В обработке',
                    value: '2'
                },
                {
                    label: 'В пути',
                    value: '3'
                },
                {
                    label: 'Выполнен',
                    value: '4'
                },
                {
                    label: 'Отмена',
                    value: '-1'
                },
                {
                    label: 'Возврат',
                    value: '-2'
                },
                {
                    label: 'Завершен',
                    value: '5'
                }
            ]
        },
        {
            type: "group",
            label: "Статус оплаты",
            key: "payment_state",
            children: [
                {
                    label: 'Оплачен',
                    value: '1'
                },
                {
                    label: 'Не оплачен',
                    value: '0'
                }
            ]
        }
    ]
})

const getOrders = onMounted(async () => {
    orders.value = (await axios.get('order/list/items', {
        params: details.query
    })).data
})

const filter = (filters, sourceColumn) => {
    switch (sourceColumn.key) {
        case 'total_price': details.query.currency = filters; break
        case 'payment_method': details.query.payment_id = filters; break
        case 'state': details.query.state = filters; break
        case 'payment_state': details.query.payment_state = filters; break
    }

    getOrders()
}

const sort = (sorter) => {
    details.query.column = !sorter.order ? 'id' : sorter.columnKey
    sorter.order == 'descend' ? details.query.sort = 'desc' : details.query.sort = 'asc'
    getOrders()
}

const pagination = (page) => {
    details.query.page = page
    getOrders()
}

const pageSize = (size) => {
    details.query.limit = size
    getOrders()
}
</script>
<template>
    <Table :data="orders.data" :column="details.columns" :filters="filter" :sort="sort" :pagination="pagination"
        :pageSize="pageSize" />
</template>