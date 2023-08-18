<script setup>
import axios from '../../api/axios'
import Table from '../../components/Table.vue'
import { NButtonGroup, NButton, NPopconfirm } from 'naive-ui'
import { Pencil, TrashOutline, Add } from '@vicons/ionicons5'
import { useTheme } from '../../stores/theme'
import moment from 'moment'

const categories = ref({ data: [] })
const details = reactive({
    showModal: false,
    columns: [
        {
            title: 'Категории',
            key: 'name'
        },
        {
            title: 'Дата создания',
            key: 'created_at',
            render(row) {
                return moment(row.created_at).format("DD.MM.YYYY | HH:mm")
            },
        },
        {
            title: 'Статус',
            key: 'active',
            render(row) {
                return row.active ? '✅ Активен' : '☑️ Неактивен'
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
                        h(NPopconfirm, { negativeText: null, positiveText: 'Да', onPositiveClick: () => destroy(row) }, { trigger: () => h(NButton, null, { default: () => h(renderIcon(TrashOutline)) }), default: () => "Вы уверены, что хотите это удалить?" })
                    ]
                })
            }
        }
    ]
})

const getCategories = onMounted(async () => {
    categories.value = (await axios.get('category', {
        params: details.query
    })).data
})

const store = () => {
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            !formValue.value.active ? formValue.value.active = true : false
            if (await axios.post('category', JSON.stringify(Object.assign({}, formValue.value)), { type: 'store' })) {
                getCategories()
                details.showModal = false
            }
        } else {
            console.log(errors)
        }
    })
}

const show = async (id) => {
    formValue.value = (await axios.get('category/show/' + id)).data.data
    formValue.value.role = formValue.value.role.id
    formValue.value.active = formValue.value.active ? true : false
    details.showModal = true
}

const update = async () => {
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            if (await axios.put('category/' + formValue.value.id, JSON.stringify(Object.assign({}, formValue.value)), { type: 'update' })) {
                getCategories()
                details.showModal = false
            }
        } else {
            console.log(errors)
        }
    })
}

const destroy = async (row) => {
    if (await axios.get('category/delete/' + row.id, { type: 'destroy' })) {
        getCategories()
        details.showModal = false
    }
}

const rowKey = (row) => row.id
</script>

<template>
    <div class="flex justify-end mb-3 rounded py-2 px-5" :class="useTheme().isDark ? 'bg-zinc-900' : 'bg-white'">
        <n-button type="success" ghost @click="details.showModal = true; formValue = []">
            <template #icon>
                <Add />
            </template>
        </n-button>
    </div>

    <Table :data="categories" :column="details.columns" :row-key="rowKey" />
</template>