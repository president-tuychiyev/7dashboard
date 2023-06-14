<script setup>
const prop = defineProps({
    data: Object,
    column: Array,
    pagination: Function,
    filters: Function,
    class: String,
    striped: Boolean
})
</script>
<template>
    <n-data-table size="small" @update:filters="filters" :bordered="true" :data="data.data" :columns="column"
        :scroll-x="1000" :single-line="false" :striped="striped" :class="class" />

    <n-pagination @update:page="pagination" :page-count="data.meta ? data.meta.last_page : 1" class="mt-4" />
</template>
