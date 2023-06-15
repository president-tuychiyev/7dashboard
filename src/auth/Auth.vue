<script setup>
import { darkTheme } from 'naive-ui'
import { useTheme } from '../stores/theme'
import Breadcrumb from '../components/Breadcrumb.vue'

</script>
<template>
    <n-config-provider :theme="useTheme().isDark ? darkTheme : null">

        <n-layout>
            <n-layout has-sider>
                <!-- begin::sidebar -->
                <Sidebar />
                <!-- end::sidebar -->

                <!-- begin::content -->
                <n-layout-content>
                    <div class="absolute inset-x-0">
                        <!-- begin::navbar -->
                        <Navbar />
                        <!-- end::navbar -->
                        <!-- begin::breadcrumb -->
                        <Breadcrumb :class="useTheme().isDark ? 'bg-black' : 'bg-slate-100'" />
                    </div>
                    <!-- end::breadcrumb -->

                    <!-- begin::content -->
                    <main class="w-full h-screen max-h-screen px-2 pt-[7rem] relative"
                        :class="useTheme().isDark ? 'bg-black' : 'bg-slate-100'">
                        <router-view v-slot="{ Component }">
                            <Transition enter-from-class="opacity-0" enter-active-class="transition duration-500">
                                <div>
                                    <component :is="Component" />
                                </div>
                            </Transition>
                        </router-view>
                    </main>
                    <!-- end:content -->

                </n-layout-content>
                <!-- end::content -->
            </n-layout>
        </n-layout>
    </n-config-provider>
</template>