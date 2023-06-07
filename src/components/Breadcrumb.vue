<script setup>
import { useBreadcrumb } from '../stores/Breadcrumb'
import { useTheme } from '../stores/theme'

</script>
<template>
    <div
        class="flex flex-nowrap overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-dark-gray-200 scrollbar-hover-black pb-1">
        <n-tag v-for="item in useBreadcrumb().breadcrumbs.items" :closable="item.closable"
            :type="item.isActive ? 'primary' : ''" class="p-4 mr-2" :class="useTheme().isDark ? '' : 'bg-white'"
            size="medium" @close="useBreadcrumb().remove(item.routerName, item.isActive)" :bordered="false">
            <RouterLink :to="{ name: item.routerName }">{{ item.name }}</RouterLink>
        </n-tag>
    </div>
</template>