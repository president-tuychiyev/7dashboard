<script setup>
// https://api.dev.7saber.uz/admin/order/list/items?page=1&column=id&sort=desc&limit=15
import axios from '../../api/axios'
import Table from '../../components/Table.vue'
const orders = ref({ data: [] })
const columns = [
    {
        title: '№',
        key: 'client_order_id'
    },
    {
        title: 'Заказчик',
        render(row) {
            return row.user ? (row.user.first_name ?? '(' + row.user.phone + ')') + ' ' + (row.user.last_name ?? '') : (row.user_data.first_name ?? '(' + row.user_data.phone + ')') + ' ' + (row.user_data.last_name ?? '')
        }
    }
]
const getOrders = onMounted(async () => {
    orders.value = (await axios.get('https://api.dev.7saber.uz/admin/order/list/items?page=1&column=payment_method&sort=asc&limit=15')).data
    console.log(orders.value);
})
</script>
<template>
    <Table :data="orders.data" :column="columns" :striped="true" :pagination="getOrders" />
</template>