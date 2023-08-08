<script setup>
import { NButtonGroup, NButton, NPopconfirm } from 'naive-ui'
import { Pencil, EyeOutline, TrashOutline, Add } from '@vicons/ionicons5'
import { useTheme } from '../../stores/theme'
import axios from '../../api/axios'
import Table from '../../components/Table.vue'
const users = ref({ data: [] })
const formRef = ref(null)
const formValue = ref({
    first_name: null,
    last_name: null,
    middle_name: null,
    phone: null,
    email: null,
    password: null,
    nickname: null,
    role: 1,
    is_active: ref(true)
})

const details = reactive({
    showModal: false,
    body: {},
    query: {
        page: 1,
        column: 'id',
        sort: 'desc',
        limit: 15
    },
    columns: [
        {
            title: 'ФИО',
            width: '20vw',
            render(row) {
                return row.first_name + " " + row.last_name
            }
        },
        {
            title: 'Телефон',
            width: 150,
            key: 'phone'
        },
        {
            title: 'Статус',
            width: 150,
            render(row) {
                return row.is_active ? '✅ Актив' : '☑️ Пассив'
            }
        },
        {
            title: 'Роль пользователя',
            width: 150,
            render(row) {
                return row.role.name
            }
        },
        {
            title: 'Действия',
            align: 'center',
            width: 100,
            render: (row) => {
                return h(NButtonGroup, null, {
                    default: () => [
                        h(NButton, { onClick: () => show(row.id, 'update') }, { default: () => h(renderIcon(Pencil)) }),
                        h(NButton, { onClick: () => show(row.id, 'view') }, { default: () => h(renderIcon(EyeOutline)) }),
                        h(NPopconfirm, { negativeText: null, positiveText: 'Да', onPositiveClick: () => destroy(row) }, { trigger: () => h(NButton, null, { default: () => h(renderIcon(TrashOutline)) }), default: () => "Вы уверены, что хотите это удалить?" })
                    ]
                })
            }
        }
    ],
    rules: {
        first_name: {
            required: true,
            message: "Пожалуйста, введите имя",
            trigger: ["input", "blur"]
        },
        last_name: {
            required: true,
            message: "Пожалуйста, введите фамилия",
            trigger: ["input", "blur"]
        },
        middle_name: {
            required: true,
            message: "Пожалуйста, введите отчества",
            trigger: ["input", "blur"]
        },
        phone: {
            required: true,
            message: "Пожалуйста, введите номер",
            trigger: ["input", "blur"]
        },
        email: {
            required: true,
            message: "Пожалуйста, введите почта",
            trigger: ["input", "blur"]
        },
        role: {
            required: true,
            type: 'number',
            message: "Пожалуйста, введите почта",
            trigger: ["change", "blur"]
        },
        password: {
            required: true,
            message: "Пожалуйста, введите пароль",
            trigger: ["input", "blur"]
        }
    },
    roles: []
})

const getUsers = onMounted(async () => {
    users.value = (await axios.get('user', {
        params: details.query
    })).data
})

onMounted(async () => {
    details.roles = (await axios.get('roles/list')).data.data.map(item => {
        return {
            label: item.name,
            value: item.id
        }
    })
})

const store = () => {
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            !formValue.value.is_active ? formValue.value.is_active = true : false
            if (await axios.post('user/create', JSON.stringify(Object.assign({}, formValue.value)), { type: 'store' })) {
                getUsers()
                details.showModal = false
            }
        } else {
            console.log(errors)
        }
    })
}

const show = async (id, type) => {
    details.type = type
    formValue.value = (await axios.get('user/show/' + id)).data.data
    formValue.value.role = formValue.value.role.id
    formValue.value.is_active = formValue.value.is_active ? true : false
    details.showModal = true
}

const update = async () => {
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            if (await axios.post('user/edit/' + formValue.value.id, JSON.stringify(Object.assign({}, formValue.value)), { type: 'update' })) {
                getUsers()
                details.showModal = false
            }
        } else {
            console.log(errors)
        }
    })
}

const destroy = async (row) => {
    if (await axios.get('user/delete/' + row.id, { type: 'destroy' })) {
        getUsers()
        details.showModal = false
    }
}

const pagination = (page) => {
    details.query.page = page
    getUsers()
}

const pageSize = (size) => {
    details.query.limit = size
    getUsers()
}
</script>
<template>
    <div class="flex justify-between mb-3 rounded py-2 px-5" :class="useTheme().isDark ? 'bg-zinc-900' : 'bg-white'">
        <div></div>
        <div>
            <n-button type="success" ghost @click="details.showModal = true; formValue = []">
                <template #icon>
                    <Add />
                </template>
            </n-button>
        </div>
    </div>


    <Table :data="users.data" :column="details.columns" :pagination="pagination" :pageSize="pageSize" />

    <n-modal v-model:show="details.showModal" :close-on-esc="false" :mask-closable="false" preset="card" size="huge"
        class="max-w-[800px]">
        <template #header>
            <div class="text-center">
                <n-tag v-if="!formValue.id" type="success">Создать новый</n-tag>
                <n-tag v-else-if="details.type == 'view'" type="info">Просмотр</n-tag>
                <n-tag v-else type="warning">Обновить</n-tag>
            </div>
        </template>

        <n-card :bordered="false" size="small" role="dialog" aria-modal="true">
            <n-form ref="formRef" :label-width="80" :model="formValue" :rules="details.rules" size="large">
                <div class="flex justify-between">
                    <n-form-item label="Имя" path="first_name" class="w-60">
                        <n-input v-model:value="formValue.first_name" clearable placeholder="Введите Имя" />
                    </n-form-item>
                    <n-form-item label="Фамилия" path="last_name" class="mx-4 w-60">
                        <n-input v-model:value="formValue.last_name" clearable placeholder="Введите Фамилия" />
                    </n-form-item>
                    <n-form-item label="Отчество" path="middle_name" class="w-60">
                        <n-input v-model:value="formValue.middle_name" clearable placeholder="Введите Отчество"
                            class="mr-4" />
                    </n-form-item>
                </div>

                <div class="flex justify-between my-6">
                    <n-form-item label="Телефон" path="phone" class="w-60">
                        <n-input v-model:value="formValue.phone" clearable placeholder="+998 " />
                    </n-form-item>
                    <n-form-item label="Эл. адрес" path="email" class="mx-4 w-60">
                        <n-input v-model:value="formValue.email" clearable placeholder="Введите Эл. адрес" />
                    </n-form-item>
                    <n-form-item v-if="formValue.id ? false : true" label="Пароль" path="password" class="w-56 mr-4">
                        <n-input type="password" show-password-on="mousedown" :maxlength="15"
                            v-model:value="formValue.password" clearable placeholder="Введите Пароль" />
                    </n-form-item>
                    <n-form-item v-else label="Пароль" class="w-56 mr-4">
                        <n-input type="password" show-password-on="mousedown" :maxlength="15"
                            v-model:value="formValue.password" clearable placeholder="Введите Пароль" />
                    </n-form-item>
                </div>

                <div class="flex justify-between">
                    <n-form-item label="Telegram username" class="w-60">
                        <n-input v-model:value="formValue.nickname" clearable placeholder="Введите Telegram nickname" />
                    </n-form-item>
                    <n-form-item label="Тип пользователя" path="role" class="mx-4 w-60">
                        <n-select v-model:value="formValue.role" clearable :options="details.roles" />
                    </n-form-item>
                    <n-form-item label="Статус" class="w-60">
                        <n-switch v-model:value="formValue.is_active" :default-value="true">
                            <template #checked>
                                Актив
                            </template>
                            <template #unchecked>
                                Пассив
                            </template>
                        </n-switch>
                    </n-form-item>
                </div>

                <div v-if="details.type != 'view'" class="flex justify-end">
                    <n-button type="error" ghost class="mr-4" @click="details.showModal = false">Отменить</n-button>
                    <n-button type="success" ghost @click="formValue.id ? update() : store()">{{ formValue.id ?
                        'Обновлять' : 'Добавить' }}</n-button>
                </div>
            </n-form>
        </n-card>
    </n-modal>
</template>