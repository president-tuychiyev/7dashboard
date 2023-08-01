<script setup>
import axios from '../../api/axios'
import Table from '../../components/Table.vue'

const promocodes = ref({ data: [] })
const details = reactive({
    query: {
        page: 1,
        column: 'id',
        sort: 'desc',
        limit: 15
    }
})
const getPromocodes = onMounted(async () => {
    promocodes.value = (await axios.get('promocode/list', {
        params: details.query
    })).data
})

const pagination = (page) => {
    details.query.page = page
    getPromocodes()
}

const pageSize = (size) => {
    details.query.limit = size
    getPromocodes()
}
</script>
<template>
    <Table :data="promocodes.data" :column="details.columns" :pagination="pagination" :pageSize="pageSize" />
</template>