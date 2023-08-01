<script setup>
import { useMessage } from 'naive-ui'
import { useSpinStore } from './stores/spin'

window.useMessage = useMessage()
window.spin = useSpinStore()
</script>
<template>
    <RouterView />
</template>