<script setup>
import axios from '../api/axios'

const statistic = ref({ sales: 0, orders: 0, users: 0, products: 0 })

onMounted(async () => statistic.value = (await axios.get('dashboard')).data.data)
</script>
<template>
    <div class="grid grid-flow-col auto-cols-max">
        <div class="mr-6 w-72">
            <n-card>
                <n-space vertical class="text-center">
                    <n-tag type="success" class="justify-start"> Продажи </n-tag>
                    <n-statistic label="Всего за месяц" tabular-nums>
                        <n-number-animation :from="0" :to="statistic.sales" :active="true" />
                    </n-statistic>
                </n-space>
            </n-card>
        </div>
        <div class="mr-6 w-72">
            <n-card>
                <n-space vertical class="text-center">
                    <n-tag type="success" class="justify-start"> Заказы </n-tag>
                    <n-statistic label="Всего за месяц" tabular-nums>
                        <n-number-animation :from="0" :to="statistic.orders" :active="true" />
                    </n-statistic>
                </n-space>
            </n-card>
        </div>
        <div class="mr-6 w-72">
            <n-card>
                <n-space vertical class="text-center">
                    <n-tag type="success" class="justify-start"> Товары </n-tag>
                    <n-statistic label="Всего" tabular-nums>
                        <n-number-animation :from="0" :to="statistic.products" :active="true" />
                    </n-statistic>
                </n-space>
            </n-card>
        </div>
        <div class="mr-6 w-72">
            <n-card>
                <n-space vertical class="text-center">
                    <n-tag type="success" class="justify-start"> Пользователи </n-tag>
                    <n-statistic label="Всего" tabular-nums>
                        <n-number-animation :from="0" :to="statistic.users" :active="true" />
                    </n-statistic>
                </n-space>
            </n-card>
        </div>
    </div>
</template>