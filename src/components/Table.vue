<script setup>
const prop = defineProps({
    data: Object,
    column: Array,
    pagination: Function,
    pageSize: Function,
    filters: Function,
    sort: Function,
    class: String,
    striped: Boolean
})
</script>
<template>
    <n-data-table size="small" @update:filters="filters" :bordered="true" :data="data.data" :columns="column"
        :scroll-x="1000" :single-line="false" :striped="striped" @update:sorter="sort" :class="class" :max-height="'78vh'" />

    <n-pagination @update:page="pagination" :page="data.current_page" @update:page-size="pageSize" :page-count="data.last_page" show-size-picker
        :page-sizes="[15, 30, 70, 100, 150, 200]" class="mt-4" />
</template>
