<script setup>
import { NButtonGroup, NButton, NSelect } from 'naive-ui'
import { Pencil, EyeOutline, TrashOutline, SaveOutline } from '@vicons/ionicons5'
import moment from 'moment'
import axios from '../../api/axios'
import Table from '../../components/Table.vue'
const orders = ref({ data: [] })
const details = reactive({
    showModal: false,
    isUpdate: false,
    body: {},
    paymentMethods: [
        {
            label: 'Наличные',
            value: 1
        },
        {
            label: 'PAYME',
            value: 2
        },
        {
            label: 'CLICK',
            value: 3
        },
        {
            label: 'CARD',
            value: 4
        },
        {
            label: 'VISA',
            value: 5
        },
        {
            label: 'MCARD',
            value: 6
        },
        {
            label: 'PAYZE',
            value: 7
        }
    ],
    delevryTime: [
        {
            label: 'Доставка сегодня до 20:00',
            value: 1
        },
        {
            label: 'Доставка завтра до 13.00',
            value: 2
        },
        {
            label: 'Международный доставка',
            value: 3
        }
    ],
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
            render: (row) => currency(row.total_price, row.currency),
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
                    case 7: return 'PAYZE'
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
                { label: 'MCARD', value: '6' },
                { label: 'PAYZE', value: '7' }
            ],
            filter: 'default'
        },
        {
            title: 'Статус заказа',
            key: 'state',
            render: (row) => {
                return h(NSelect, {
                    defaultValue: row.state,
                    onUpdateValue: async (val) => {
                        if (await axios.put('order/' + row.id, { state: val }, { type: 'update' })) {
                            getOrders()
                        }
                    },
                    options: [
                        {
                            label: '🆕 Новый',
                            value: 1
                        },
                        {
                            label: '🕔 В обработке',
                            value: 2
                        },
                        {
                            label: '🚚 В пути',
                            value: 3
                        },
                        {
                            label: '✅ Выполнен',
                            value: 4
                        },
                        {
                            label: '❌ Отмена',
                            value: -1
                        },
                        {
                            label: '↩️ Возврат',
                            value: -2
                        },
                        {
                            label: '💤 Завершен',
                            value: 5
                        }
                    ]
                })
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
            filter: 'default',
            render: (row) => {
                return h(NSelect, {
                    value: row.payment_state,
                    onUpdateValue: async (val) => {
                        if (await axios.post('order/payment/' + row.id, { payment_state: val }, { type: 'update' })) {
                            getOrders()
                        }
                    },
                    options: [
                        {
                            label: () => h('span', { class: 'font-bold text-green-600' }, '✅ Оплачен'),
                            value: 1
                        },
                        {
                            label: () => h('span', { class: 'text-red-600' }, '⚠️ Не оплачен'),
                            value: 0
                        }
                    ]
                })
            }
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
            render: (row) => {
                return h(NButtonGroup, null, {
                    default: () => [
                        h(NButton, null, { default: () => h(renderIcon(Pencil)) }),
                        h(NButton, { onClick: () => show(row) }, { default: () => h(renderIcon(EyeOutline)) })
                    ]
                })
            }
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

const show = async (row) => {
    details.body = (await axios.get('order/' + row.id)).data.data

    details.body.details_info = details.body.details_info.map(item => {
        item.is_delete = false
        item.amount = item.amount.toString()
        item.price = item.price.toString()
        item.discount = item.discount.toString()
        return item;
    })

    details.showModal = true
}

const devices = (code) => {
    switch (code) {
        case 0:
            return 'Неизвестно';
        case 1:
            return 'Веб-сайт';
        case 2:
            return 'iOS';
        case 3:
            return 'Android';
        default:
            return 'Неизвестно';
    }
}

const gender = (code) => {
    switch (code) {
        case 0:
            return 'Неизвестно';
        case 1:
            return 'Мужской';
        case 2:
            return 'Женщина';
        default:
            return 'Неизвестно';
    }
}

const status = (code) => {
    switch (code) {
        case 0:
            return 'Неизвестно';
        case 1:
            return 'Новый';
        case 2:
            return 'В обработке';
        case 3:
            return 'В пути';
        case 4:
            return 'Выполнен';
        case -1:
            return 'Отмена';
        case -2:
            return 'Возврат';
        case 5:
            return 'Завершен';
        default:
            return 'Неизвестно';
    }
}

const update = async () => {
    console.log(details.body);
    details.body.details_info = details.body.details_info.map(item => {
        return {
            amount: item.amount,
            discount: item.discount,
            id: item.id,
            is_delete: item.is_delete,
            price: item.price
        }
    })

    if (await axios.post('order/edit/' + details.body.id, details.body)) {
        window.useMessage.success("Успешно обновлено")
        details.showModal = false
    } else {
        window.useMessage.error("Произошла ошибка при обновлении")
    }
}

const deleteProduct = (product) => {
    if (details.body.details_info.length > 1) {
        details.body.details_info = details.body.details_info.map(item => {
            item.product.barcode == product.barcode ? item.is_delete = true : false
            return item
        })
    } else {
        window.useMessage.error("Минимальное количество товаров 1.")
    }
}

const setAmount = (amount, product) => {
    details.body.details_info = details.body.details_info.map(item => {
        if (amount && item.product.qty < amount && item.product.barcode == product.barcode) {
            window.useMessage.error('В базе недостаточно товаров')
        }
        if (amount && amount < 1 && item.product.qty < amount && item.product.barcode == product.barcode) {
            window.useMessage.error('Минимальное количество товаров 1.')
            item.amount = 1
        }
        return item
    })
}
</script>
<template>
    <Table :data="orders.data" :column="details.columns" :filters="filter" :sort="sort" :pagination="pagination"
        :pageSize="pageSize" />

    <n-modal v-model:show="details.showModal" :mask-closable="false" :close-on-esc="false" preset="card" class="!w-1/2">
        <n-card :bordered="false" size="huge" aria-modal="true">
            <n-tabs default-value="details" type="line" animated>
                <n-tab-pane name="details" tab="Детали заказа">
                    <div class="grid grid-cols-3 gap-6">
                        <label>
                            <span class="font-bold">Источник</span>
                            <n-input :value="devices(details.body.source)" disabled type="text" />
                        </label>
                        <label>
                            <span class="font-bold">Заказчик</span>
                            <n-input :value="details.body.user.first_name" disabled type="text" />
                        </label>
                        <label>
                            <span class="font-bold">Пол</span>
                            <n-input :value="gender(details.body.user.sex)" disabled type="text" />
                        </label>

                        <label>
                            <span class="font-bold">Статус</span>
                            <n-input :value="status(details.body.state)" disabled type="text" />
                        </label>
                        <label>
                            <span class="font-bold">Телефон</span>
                            <n-input :value="details.body.user.phone" disabled type="text" />
                        </label>
                        <label>
                            <span class="font-bold">Время доставки</span>
                            <n-select v-model:value="details.body.delivery_time" :options="details.delevryTime" disabled />
                        </label>

                        <label>
                            <span class="font-bold">Метод оплаты</span>
                            <n-select v-model:value="details.body.payment_method" :options="details.paymentMethods"
                                disabled />
                        </label>
                        <label>
                            <span class="font-bold">Статус оплаты</span>
                            <n-input :value="details.body.payment_state == 1 ? 'Оплачен' : 'Не оплачен'" disabled
                                type="text" />
                        </label>
                        <label>
                            <span class="font-bold">Название промокода</span>
                            <n-input :value="details.body.promocode ?? 'Промокод не использован'" disabled type="text" />
                        </label>

                        <label>
                            <span class="font-bold">Тип промокода</span>
                            <n-input
                                :value="details.body.promocode ? details.promocode.type == 1 ? 'процент' : 'сумму' : 'Промокод не использован'"
                                disabled type="text" />
                        </label>
                        <label>
                            <span class="font-bold">Окончание промокода</span>
                            <n-input
                                :value="details.body.promocode ? moment(details.body.promocode.expire_at).format('DD.MM.YYYY | HH:mm') : 'Промокод не использован'"
                                disabled type=" text" />
                        </label>
                        <label>
                            <span class="font-bold">Скидка промокода</span>
                            <n-input
                                :value="details.body.promocode ? details.body.promocode.discount.toString() : 'Промокод не использован'"
                                disabled type=" text" />
                        </label>

                        <label>
                            <span class="font-bold">Сумма товаров</span>
                            <n-input :value="details.body.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')" disabled
                                type="text" />
                        </label>
                        <label>
                            <span class="font-bold">Сумма скидка</span>
                            <n-input :value="details.body.discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
                                disabled type="text" />
                        </label>
                        <label>
                            <span class="font-bold">Сумма доставки</span>
                            <n-input :value="details.body.delivery_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
                                disabled type="text" />
                        </label>

                        <label>
                            <span class="font-bold">Итоговая цена</span>
                            <n-input :value="details.body.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
                                disabled type="text" />
                        </label>
                        <label>
                            <span class="font-bold">Валюта</span>
                            <n-input :value="details.body.currency" disabled type="text" />
                        </label>
                        <label>
                            <span class="font-bold">Почтовый индекс</span>
                            <n-input :value="details.body.zip_code" disabled type="text" />
                        </label>

                        <label>
                            <span class="font-bold">Страна</span>
                            <n-input :value="details.body.country.name" disabled type="text" />
                        </label>
                        <label>
                            <span class="font-bold">Регион</span>
                            <n-input :value="details.body.region.name" disabled type="text" />
                        </label>
                        <label>
                            <span class="font-bold">Город</span>
                            <n-input :value="details.body.city" disabled type="text" />
                        </label>

                        <label>
                            <span class="font-bold">Улица</span>
                            <n-input :value="details.body.address.split(',')[1]" disabled type="text" />
                        </label>
                        <label>
                            <span class="font-bold">Дом</span>
                            <n-input :value="details.body.house" disabled type="text" />
                        </label>
                        <label>
                            <span class="font-bold">Адрес доставки</span>
                            <n-input :value="details.body.address" readonly type="text" />
                        </label>
                    </div>
                </n-tab-pane>

                <n-tab-pane name="list" tab="Список товаров">
                    <n-scrollbar x-scrollable>
                        <n-table :single-line="false" striped>
                            <thead>
                                <tr>
                                    <th>Изображения</th>
                                    <th>Наименование</th>
                                    <th>Barcode</th>
                                    <th>Артикуль</th>
                                    <th>Цвет</th>
                                    <th>Размер</th>
                                    <th>Количество</th>
                                    <th class="!min-w-[150px]">
                                        <p class="text-center">
                                            Сумма
                                        </p>
                                    </th>
                                    <th class="!min-w-[150px]">
                                        <p class="text-center">Скидка</p>
                                    </th>
                                    <th class="!min-w-[150px]">
                                        <p class="text-center">Общая сумма</p>
                                    </th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in  details.body.details_info" v-show="!item.is_delete">
                                    <td>
                                        <n-image width="100" :src="item.product?.images[0].path" />
                                    </td>
                                    <td>{{ item.product?.name }}</td>
                                    <td>
                                        <div class="whitespace-nowrap">{{ item.product?.barcode }}</div>
                                    </td>
                                    <td>
                                        <div class="whitespace-nowrap">{{ item.product?.sku }}</div>
                                    </td>
                                    <td class="grid justify-center">
                                        <div class="whitespace-nowrap">
                                            <div class="h-8 w-8 rounded-full border"
                                                :style="`background-color: ` + item.product?.color.hex_code[0]">
                                            </div>
                                            {{ item.product?.color.name }}
                                        </div>
                                    </td>
                                    <td class="text-center">{{ item.product?.size }}</td>
                                    <td class="text-center">
                                        <n-input v-if="details.isUpdate" v-model:value="item.amount"
                                            @update:value="setAmount(item.amount, item.product)" type="text" />
                                        <span v-else>{{ item.amount }}</span>
                                    </td>
                                    <td class="text-center">
                                        <n-input v-if="details.isUpdate" v-model:value="item.price" type="text" />
                                        <span v-else>
                                            {{ item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }}
                                        </span>
                                    </td>
                                    <td class="text-center">
                                        <n-input v-if="details.isUpdate" v-model:value="item.discount" type="text" />
                                        <span v-else>
                                            {{ item.discount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }}
                                        </span>
                                    </td>
                                    <td class="text-center">
                                        {{ item.total_product_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }}
                                    </td>
                                    <td>
                                        <n-button-group>
                                            <n-button v-if="!details.isUpdate" @click="details.isUpdate = true" round>
                                                <template #icon>
                                                    <Pencil />
                                                </template>
                                            </n-button>
                                            <n-button v-if="details.isUpdate" @click="details.isUpdate = false" round>
                                                <template #icon>
                                                    <SaveOutline />
                                                </template>
                                            </n-button>
                                            <n-button @click="deleteProduct(item.product)" round>
                                                <template #icon>
                                                    <TrashOutline />
                                                </template>
                                            </n-button>
                                        </n-button-group>
                                    </td>
                                </tr>
                            </tbody>
                        </n-table>
                    </n-scrollbar>
                </n-tab-pane>

                <n-tab-pane name="performers" tab=" Исполнители ">
                </n-tab-pane>
            </n-tabs>

            <div class="flex justify-center mt-10 gap-4">
                <n-button @click="refresh" type="info"> Сбросить </n-button>
                <n-button @click="update" type="success"> Сохранить </n-button>
            </div>

        </n-card>
    </n-modal>
</template>