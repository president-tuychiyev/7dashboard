import { h, ref, reactive, onMounted } from 'vue'
import { NIcon } from 'naive-ui'
import { defineStore } from 'pinia'


window.h = h
window.ref = ref
window.reactive = reactive
window.onMounted = onMounted
window.defineStore = defineStore

window.renderIcon = (icon) => {
    return () => h(NIcon, null, { default: () => h(icon) });
}

window.currency = (total, currency = 'uzs') => {
    return new Intl.NumberFormat('uz-UZ', { style: 'currency', currency: currency }).format(total)
}

localStorage.getItem('breadcrumbs') === null ? localStorage.setItem('breadcrumbs', JSON.stringify(
    [{
        name: 'Home page',
        routerName: 'cabinet.home',
        isActive: false,
        closable: false
    }]
)) : false

localStorage.getItem('settings') === null ? localStorage.setItem('settings', JSON.stringify({
    isDark: false,
    sideBarCollapsed: false
})) : null