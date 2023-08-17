<script setup>
import axios from '../../api/axios'
import Table from '../../components/Table.vue'
import { NButtonGroup, NButton, NPopconfirm } from 'naive-ui'
import { Pencil, EyeOutline, Add } from '@vicons/ionicons5'
import { useTheme } from '../../stores/theme'
import moment from 'moment'

const roles = ref({ data: [] })
const formRef = ref(null)
const formValue = ref({
    name: null,
    is_used: 1,
    promocode: null,
    value: null,
    qty: null,
    status: true,
    expire_date: new Date(),
    categories: []
})
const details = reactive({
    showModal: false,
    query: {
        page: 1,
        column: 'id',
        sort: 'desc',
        limit: 15
    },
    columns: [
        {
            title: 'Роль пользователя',
            width: '20vw',
            key: 'name',
            sorter: 'default'
        },
        {
            title: 'Дата создания',
            key: 'created_at',
            render(row) {
                return moment(row.created_at).format("DD.MM.YYYY | HH:mm")
            },
            sorter: 'default'
        },
        {
            title: 'Статус',
            render(row) {
                return row.is_active ? '✅ Активен' : '☑️ Неактивен'
            },
            sorter: 'default'
        },
        {
            title: 'Действия',
            align: 'center',
            width: 100,
            render: (row) => {
                return h(NButtonGroup, null, {
                    default: () => [
                        h(NButton, { onClick: () => show(row.id, 'update') }, { default: () => h(renderIcon(Pencil)) }),
                        h(NButton, { onClick: () => show(row.id, 'view') }, { default: () => h(renderIcon(EyeOutline)) })
                    ]
                })
            }
        }
    ],
    rules: {
        name: {
            required: true,
            message: "Пожалуйста, введите название",
            trigger: ["input", "blur"]
        }
    }
})

const getRoles = onMounted(async () => {
    roles.value = (await axios.get('roles/list', {
        params: details.query
    })).data.data
})

const show = async (id) => {
    formValue.value = (await axios.get('roles/show/' + id)).data.data
    // formValue.value.is_active = formValue.value.is_active ? true : false
    // details.showModal = true
}

const pagination = (page) => {
    details.query.page = page
    getRoles()
}

const pageSize = (size) => {
    details.query.limit = size
    getRoles()
}
</script>

<template>
    <div class="flex justify-end mb-3 rounded py-2 px-5" :class="useTheme().isDark ? 'bg-zinc-900' : 'bg-white'">
        <n-button type="success" ghost @click="details.showModal = true; formValue = []">
            <template #icon>
                <Add />
            </template>
        </n-button>
    </div>

    <Table :data="roles" :column="details.columns" :pagination="pagination" :pageSize="pageSize" />

    <n-modal v-model:show="details.showModal" :close-on-esc="false" :mask-closable="false" preset="card" size="huge"
        class="max-w-[800px]">
        <template #header>
            <div class="text-center">
                <n-tag v-if="!formValue.id" type="success">Создать новый</n-tag>
                <n-tag v-else type="warning">Обновить</n-tag>
            </div>
        </template>

        <n-card :bordered="false" size="small" role="dialog" aria-modal="true">
            <n-form ref="formRef" :label-width="80" :model="formValue" :rules="details.rules" size="large">
                <div class="flex justify-between">
                    <n-form-item label="Название" path="name" class="w-60">
                        <n-input v-model:value="formValue.name" clearable placeholder="Введите название" />
                    </n-form-item>
                </div>
            </n-form>
        </n-card>
    </n-modal>
</template>