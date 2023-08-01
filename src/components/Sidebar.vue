<script setup>
import { useMenu } from '../stores/menu'
import { useTheme } from '../stores/theme'
import Logo from '../components/icon/Logo.vue'

const details = reactive({
    collapse: JSON.parse(localStorage.getItem('settings')).sideBarCollapsed
})

const collapseSidebar = () => {
    details.collapse = !details.collapse
    const settings = JSON.parse(localStorage.getItem('settings'))
    settings.sideBarCollapsed = details.collapse
    localStorage.setItem('settings', JSON.stringify(settings))
    return details.collapse
}
</script>
<template>
    <n-layout-sider :default-collapsed="details.collapse" @update:collapsed="collapseSidebar" bordered show-trigger="bar"
        collapse-mode="width" :collapsed-width="64" :width="230" :native-scrollbar="false" class="h-screen">
        <RouterLink class="flex justify-center my-4 mx-2" :to="{ name: 'cabinet.home' }">
            <Logo class="w-24" :class="useTheme().isDark ? 'fill-white' : 'fill-black'" />
        </RouterLink>
        <n-menu :value="useMenu().details.defaultValue" :default-value="useMenu().details.defaultValue"
            :collapsed-width="64" :collapsed-icon-size="22" :options="useMenu().details.options" />
    </n-layout-sider>
</template>
