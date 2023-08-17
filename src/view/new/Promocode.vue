<script setup>
import axios from '../../api/axios'
import Table from '../../components/Table.vue'
import { NButtonGroup, NButton, NPopconfirm } from 'naive-ui'
import { Pencil, TrashOutline, Add } from '@vicons/ionicons5'
import { useTheme } from '../../stores/theme'
import moment from 'moment'

const promocodes = ref({ data: [] })
const categories = ref({ data: [] })
const formRef = ref(null)
const formValue = ref({
    title: null,
    type: 1,
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
            title: 'Название',
            width: '20vw',
            key: 'title',
            sorter: 'default'
        },
        {
            title: 'Тип',
            key: 'type',
            render: (row) => {
                return row.type == 1 ? 'Процент' : 'Цена'
            },
            sorter: 'default'
        },
        {
            title: 'Значение',
            key: 'value',
            render: (row) => {
                return row.type == 1 ? row.value + '%' : currency(row.value)
            },
            sorter: 'default'
        },
        {
            title: 'Код',
            key: 'promocode',
            sorter: 'default'
        },
        {
            title: 'Количество',
            key: 'qty',
            sorter: 'default'
        },
        {
            title: 'Окончание',
            key: 'expire_at',
            render(row) {
                return moment(row.expire_at).format("DD.MM.YYYY | HH:mm")
            },
            sorter: 'default'
        },
        {
            title: 'Статус',
            render(row) {
                return row.status ? '✅ Активен' : '☑️ Неактивен'
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
    ],
    rules: {
        title: {
            required: true,
            message: "Пожалуйста, введите название",
            trigger: ["input", "blur"]
        },
        type: {
            type: "number",
            required: true,
            message: "Пожалуйста, введите код",
            trigger: ["blur", "change"]
        },
        promocode: {
            required: true,
            message: "Пожалуйста, введите код",
            trigger: ["input", "blur"]
        },
        value: {
            required: true,
            message: "Пожалуйста, укажите сумму",
            trigger: ["input", "blur"]
        },
        qty: {
            required: true,
            message: "Пожалуйста, введите количество",
            trigger: ["input", "blur"]
        },
        expire_date: {
            type: "number",
            required: true,
            message: "Пожалуйста, выберите дату",
            trigger: ["blur", "change"]
        },
        categories: {
            type: "array",
            required: true,
            message: "Пожалуйста, выберите категории",
            trigger: ["blur", "change"]
        }
    }
})

const getPromocodes = onMounted(async () => {
    promocodes.value = (await axios.get('promocode/list', {
        params: details.query
    })).data

    categories.value = (await axios.get('category')).data.data.map(item => {
        return {
            type: "group",
            label: item.name,
            key: item.id,
            children: item.children.map(citem => {
                return {
                    label: citem.name,
                    value: citem.id
                }
            })
        }
    })
})

const store = () => {
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            formValue.value.expire_at = new Date(formValue.value.expire_date)
            if (await axios.post('promocode/create', JSON.stringify(Object.assign({}, formValue.value)), { type: 'store' })) {
                getPromocodes()
                details.showModal = false
            }
        } else {
            console.log(errors)
        }
    })
}

const show = async (id) => {
    const data = (await axios.get('promocode/show/' + id)).data.data

    data.qty = data.qty.toString()
    data.value = data.value.toString()
    data.status = data.status ? true : false
    data.expire_date = Date.parse(data.expire_at)
    data.categories = data.categories.map(item => {
        return item.id
    })

    formValue.value = data

    details.showModal = true
}

const update = async () => {
    formRef.value?.validate(async (errors) => {
        if (!errors) {
            !formValue.value.status ? formValue.value.status = 0 : formValue.value.status = 1
            if (await axios.post('promocode/edit/' + formValue.value.id, JSON.stringify(Object.assign({}, formValue.value)), { type: 'update' })) {
                getPromocodes()
                details.showModal = false
            }
        } else {
            console.log(errors)
        }
    })
}

const destroy = async (row) => {
    if (await axios.get('promocode/delete/' + row.id, { type: 'destroy' })) {
        getPromocodes()
        details.showModal = false
    }
}

// const sort = (sorter) => {
//     details.query.column = !sorter.order ? 'id' : sorter.columnKey
//     sorter.order == 'descend' ? details.query.sort = 'desc' : details.query.sort = 'asc'
//     getPromocodes()
// }

const pagination = (page) => {
    details.query.page = page
    getPromocodes()
}

const pageSize = (size) => {
    details.query.limit = size
    getPromocodes()
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

    <Table :data="promocodes" :column="details.columns" :pagination="pagination" :pageSize="pageSize" />

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
                    <n-form-item label="Название" path="title" class="w-60">
                        <n-input v-model:value="formValue.title" clearable placeholder="Введите название" />
                    </n-form-item>
                    <n-form-item label="Тип" path="type" class="mx-4 w-60">
                        <n-select v-model:value="formValue.type"
                            :options="[{ label: 'Процент', value: 1 }, { label: 'Цена', value: 2 }]" clearable
                            placeholder="Выберите тип" />
                    </n-form-item>
                    <n-form-item label="Код" path="promocode" class="w-60">
                        <n-input v-model:value="formValue.promocode" clearable placeholder="Введите код" />
                    </n-form-item>
                </div>

                <div class="flex justify-between my-6">
                    <n-form-item label="Укажите сумму" path="value" class="w-60">
                        <n-input v-model:value="formValue.value" clearable placeholder="Сумма" />
                    </n-form-item>
                    <n-form-item label="Количество" path="qty" class="mx-4 w-60">
                        <n-input v-model:value="formValue.qty" clearable placeholder="Введите количество" />
                    </n-form-item>
                    <n-form-item label="Истекает время" path="expire_date" class="w-60">
                        <n-date-picker v-model:value="formValue.expire_date" type="datetime" clearable
                            placeholder="Выберите дату" />
                    </n-form-item>
                </div>

                <div class="flex justify-start">
                    <n-form-item label="Категория" path="categories" class="w-60 pr-4">
                        <n-select v-model:value="formValue.categories" multiple clearable :max-tag-count="1"
                            placeholder="Выберите категории" :options="categories" />
                    </n-form-item>
                    <n-form-item label="Статус" class="w-60">
                        <n-switch v-model:value="formValue.status">
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