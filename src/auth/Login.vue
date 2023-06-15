<script setup>
import { LogoGoogle, LogoFacebook } from '@vicons/ionicons5'
import router from '../router'
import Logo from '../components/icon/Logo.vue'
import axios from '../api/axios'

const details = reactive({
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

    details.body = (await axios.post('login', { login: details.login.value, password: details.password.value })).data.data
    localStorage.setItem('user', JSON.stringify({
        id: details.body.id,
        email: details.body.email,
        firstName: details.body.first_name ?? 'admin',
        lastName: details.body.last_name ?? 'admin',
        middleName: details.body.middle_name ?? 'admin',
        permissons: details.body.permissons,
        permissons: details.body.permissons,
        role: details.body.role
    }))
    $cookies.set('AUTH_TOKEN', details.body.token?.body, details.body.token?.expired_at)
    // router.push({ name: 'cabinet.home' })
    window.location.href = window.location.href
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
                                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 focus:border-teal-500 dark:focus:border-teal-500 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                :class="details.password.isEmpty ? 'border-red-200 dark:border-red-700 ' : 'border-gray-200 dark:border-gray-700'" />
                        </div>

                        <div class="mt-6">
                            <button @click="signIn"
                                class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-500 rounded-md hover:bg-teal-400 focus:outline-none focus:bg-teal-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Авторизоваться
                            </button>
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
