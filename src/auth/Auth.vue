<script setup>
import { darkTheme } from 'naive-ui'
import { useTheme } from '../stores/theme'
import Breadcrumb from '../components/Breadcrumb.vue'

</script>
<template>
    <n-config-provider :theme="useTheme().isDark ? darkTheme : null">
        <n-space vertical>
            <n-layout>
                <n-layout has-sider>
                    <!-- begin::sidebar -->
                    <Sidebar />
                    <!-- end::sidebar -->

                    <!-- begin::content -->
                    <n-layout-content class="h-screen">
                        <!-- begin::header -->
                        <Navbar class="sticky top-0 z-50 h-14 shadow-sm" />
                        <!-- end::header -->

                        <!-- begin::breadcrumb -->
                        <Breadcrumb class="sticky top-14 z-40  pt-3 w-full p-2 pb-2"
                            :class="useTheme().isDark ? 'bg-black' : 'bg-slate-100'" />
                        <!-- end::breadcrumb -->

                        <!-- begin::content -->
                        <main class="h-screen w-full px-2 relative pt-3"
                            :class="useTheme().isDark ? 'bg-black' : 'bg-slate-100'">
                            <router-view v-slot="{ Component }">
                                <Transition enter-from-class="opacity-0" enter-active-class="transition duration-500">
                                    <component :is="Component" />
                                </Transition>
                            </router-view>
                        </main>
                        <!-- end:content -->

                        <!-- begin::footer -->
                        <Footer />
                        <!-- end::footer -->
                    </n-layout-content>
                    <!-- end::content -->
                </n-layout>
            </n-layout>
        </n-space>
    </n-config-provider>
</template>