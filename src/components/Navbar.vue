<script setup>
import { AlbumsOutline, PersonOutline, LogOutOutline, MoonOutline, SunnyOutline } from '@vicons/ionicons5'
import router from '../router'
import { useBreadcrumb } from '../stores/Breadcrumb'
import { useTheme } from '../stores/theme'

const details = reactive({
    show: {
        modal: false,
        dropDown: false
    },
    screen: document.documentElement,
    user: JSON.parse(localStorage.getItem('user')),
    theme: JSON.parse(localStorage.getItem('settings')).theme ? true : false
})

const defaultAvatar = () => {
    return details.user?.firstName.split('')[0] + details.user?.lastName.split('')[0]
}

const openFullscreen = () => {
    window.useMessage.info("To'liq ekran rejimi yoqildi")
    if (details.screen.requestFullscreen) {
        details.screen.requestFullscreen();
    } else if (details.screen.webkitRequestFullscreen) { /* Safari */
        details.screen.webkitRequestFullscreen();
    } else if (details.screen.msRequestFullscreen) { /* IE11 */
        details.screen.msRequestFullscreen();
    }
}

const options = [
    {
        label: "Profil",
        key: "profile",
        icon: renderIcon(PersonOutline)
    },
    {
        label: "Chiqish",
        key: "logout",
        icon: renderIcon(LogOutOutline)
    }
]

const userOption = (key) => {
    if (key == 'logout') {
        $cookies.remove("AUTH_TOKEN")
        localStorage.removeItem('user')
        router.push({ name: 'login' })
    } else if (key == 'profile') {
        details.show.modal = true
    }
}
</script>
<template>
    <n-layout-header class="flex items-center justify-between px-4">
        <p class="text-lg font-bold">{{ useBreadcrumb().breadcrumbs.thisTitle }}</p>
        <div class="flex items-center justify-center">
            <n-switch :default-value="details.theme" @update:value="useTheme().setTheme()">
                <template #checked-icon>
                    <n-icon :component="MoonOutline" />
                </template>
                <template #unchecked-icon>
                    <n-icon :component="SunnyOutline" />
                </template>
            </n-switch>
            <n-button quaternary
                class="rounded-full h-10 w-10 flex items-center leading-none p-2 font-bold justify-center mx-2"
                @click="openFullscreen()">
                <AlbumsOutline class="w-5" />
            </n-button>
            <n-dropdown trigger="click" :options="options" @select="userOption">
                <n-button
                    class="rounded-full h-10 w-10 flex items-center uppercase leading-none p-2 font-bold justify-center"
                    @click="details.show.dropDown = true">
                    {{ defaultAvatar() }}
                </n-button>
            </n-dropdown>
        </div>
    </n-layout-header>
</template>