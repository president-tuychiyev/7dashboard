<script setup>
import { useTheme } from '../stores/theme'

const prop = defineProps({
    data: Object,
    column: Array,
    pagination: Function,
    pageSize: Function,
    filters: Function,
    sort: Function,
    rowKey: Function,
    class: String,
})
</script>
<template>
    <div class="p-5 rounded" :class="useTheme().isDark ? 'bg-zinc-900' : 'bg-white'">
        <n-data-table size="small" @update:filters="filters" :bordered="true" :data="data.data" :columns="column"
            :striped="true" :scroll-x="1000" :single-line="false" @update:sorter="sort" :class="class" :max-height="'65vh'"
            :row-key="rowKey" />

        <n-pagination v-if="pagination" @update:page="pagination" :page="data.current_page" @update:page-size="pageSize"
            :page-count="data.last_page" show-size-picker :page-sizes="[15, 30, 70, 100, 150, 200]" class="mt-4" />
    </div>
</template>
