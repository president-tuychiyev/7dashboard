<script setup>
import { LogoGoogle, LogoFacebook } from '@vicons/ionicons5'
import router from '../router'
import Logo from '../components/icon/Logo.vue'
import axios from '../api/axios'

const details = reactive({
    loading: false,
    login: {
        isEmpty: false,
        value: null
    },
    password: {
        isEmpty: false,
        value: null
    }
})

const signIn = async () => {
    if (!details.login.value) {
        details.login.isEmpty = true
        return
    }

    if (!details.password.value) {
        details.password.isEmpty = true
        return
    }
    details.loading = true

    details.body = (await axios.post('login', { login: details.login.value, password: details.password.value })).data
    if (details.body && !details.body.error && details.body.data) {
        localStorage.setItem('user', JSON.stringify({
            id: details.body.data.id,
            email: details.body.data.email,
            firstName: details.body.data.first_name ?? 'admin',
            lastName: details.body.data.last_name ?? 'admin',
            middleName: details.body.data.middle_name ?? 'admin',
            permissons: details.body.data.permissons,
            permissons: details.body.data.permissons,
            role: details.body.data.role
        }))
        $cookies.set('AUTH_TOKEN', details.body.data.token?.body, details.body.data.token?.expired_at)
        window.location.href = window.location.href
    }
    details.loading = false
}

</script>
<template>
    <div class="bg-blue-100/50 dark:bg-gray-900">
        <div class="flex justify-center h-screen">
            <div class="hidden bg-cover lg:block lg:w-2/3"
                style="background-image: url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)">
                <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
                    <div>
                        <Logo class="fill-white w-24" />

                        <p class="max-w-xl mt-3 text-gray-300">Time to win</p>
                    </div>
                </div>
            </div>

            <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                <div class="flex-1">
                    <div class="text-center">
                        <div class="w-full flex justify-center">
                            <Logo class="fill-black dark:fill-white w-24" />
                        </div>

                        <p class="mt-3 text-gray-500 dark:text-gray-300">Авторизация</p>
                    </div>

                    <div class="mt-8">
                        <div>
                            <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                                Ваш e-mail
                            </label>
                            <input type="email" v-model="details.login.value" placeholder="example@example.com"
                                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:border-teal-500 dark:focus:border-teal-500 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                :class="details.login.isEmpty ? 'border-red-200 dark:border-red-700 ' : 'border-gray-200 dark:border-gray-700'" />
                        </div>

                        <div class="mt-6">
                            <div class="flex justify-between mb-2">
                                <label for="password" class="text-sm text-gray-600 dark:text-gray-200">Пароль</label>
                            </div>

                            <input type="password" v-model="details.password.value" placeholder="Введите пароль"
                                @keyup.enter="signIn"
                                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:border-teal-500 dark:focus:border-teal-500 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                :class="details.password.isEmpty ? 'border-red-200 dark:border-red-700 ' : 'border-gray-200 dark:border-gray-700'" />
                        </div>

                        <div class="mt-6">
                            <n-button :loading="details.loading" :disabled="details.loading" @click="signIn">
                                Авторизоваться
                            </n-button>
                        </div>

                        <div class="mt-6 text-sm flex justify-center text-gray-400">
                            <LogoGoogle
                                class="max-w-[35px] m-2 cursor-pointer hover:text-red-500 duration-300 dark:text-white" />
                            <LogoFacebook
                                class="max-w-[35px] m-2 cursor-pointer hover:text-blue-800 duration-300 dark:text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
