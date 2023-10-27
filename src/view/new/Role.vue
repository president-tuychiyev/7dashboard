<script setup>
import axios from "../../api/axios";
import Table from "../../components/Table.vue";
import { NButtonGroup, NButton, NPopconfirm } from "naive-ui";
import { Pencil, EyeOutline, Add } from "@vicons/ionicons5";
import { useTheme } from "../../stores/theme";
import moment from "moment";

const roles = ref({ data: [] });
const formRef = ref(null);
const formValue = ref({
    name: null,
    is_used: 1,
    promocode: null,
    value: null,
    qty: null,
    status: true,
    expire_date: new Date(),
    categories: [],
});
const details = reactive({
    showModal: false,
    query: {
        page: 1,
        column: "id",
        sort: "desc",
        limit: 15,
    },
    columns: [
        {
            label: "Роль пользователя",
            width: "20vw",
            key: "name",
            sorter: "default",
        },
        {
            label: "Дата создания",
            key: "created_at",
            render(row) {
                return moment(row.created_at).format("DD.MM.YYYY | HH:mm");
            },
            sorter: "default",
        },
        {
            label: "Статус",
            render(row) {
                return row.is_active ? "✅ Активен" : "☑️ Неактивен";
            },
            sorter: "default",
        },
        {
            label: "Действия",
            align: "center",
            width: 100,
            render: (row) => {
                return h(NButtonGroup, null, {
                    default: () => [
                        h(
                            NButton,
                            { onClick: () => show(row.id, "update") },
                            { default: () => h(renderIcon(Pencil)) }
                        ),
                        h(
                            NButton,
                            { onClick: () => show(row.id, "view") },
                            { default: () => h(renderIcon(EyeOutline)) }
                        ),
                    ],
                });
            },
        },
    ],
    roles: [
        {
            label: "Главная",
            active: false,
            key: "1.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "1.1",
                },
            ],
        },
        {
            label: "Заказы (new)",
            active: false,
            key: "3.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "3.1",
                },
                {
                    label: "Фильтровать заказы",
                    active: false,
                    key: "3.2",
                },
                {
                    label: "Добавить заказ",
                    active: false,
                    key: "3.3",
                },
                {
                    label: "Редактировать заказ",
                    active: false,
                    key: "3.4",
                },
                {
                    label: "Посмотреть детали заказа",
                    active: false,
                    key: "3.5",
                },
                {
                    label: "Изменить статус заказа",
                    active: false,
                    key: "3.6",
                },
            ],
        },
        {
            label: "Промокоды (new)",
            active: false,
            key: "4.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "4.1",
                },
                {
                    label: "Добавить промокод",
                    active: false,
                    key: "4.2",
                },
                {
                    label: "Редактировать промокод",
                    active: false,
                    key: "4.3",
                },
                {
                    label: "Удалить промокод",
                    active: false,
                    key: "4.4",
                },
            ],
        },
        {
            label: "Пользователи (new)",
            active: false,
            key: "5.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "5.1",
                },
                {
                    label: "Фильтровать пользователи",
                    active: false,
                    key: "5.2",
                },
                {
                    label: "Добавить пользовател",
                    active: false,
                    key: "5.3",
                },
                {
                    label: "Редактировать пользовател",
                    active: false,
                    key: "5.4",
                },
                {
                    label: "Посмотреть детали пользовател",
                    active: false,
                    key: "5.5",
                },
            ],
        },
        {
            label: "Роли и разрешения (new)",
            active: false,
            key: "6.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "6.1",
                },
                {
                    label: "Фильтровать роли",
                    active: false,
                    key: "6.2",
                },
                {
                    label: "Добавить рол",
                    active: false,
                    key: "6.3",
                },
                {
                    label: "Редактировать рол",
                    active: false,
                    key: "6.4",
                },
                {
                    label: "Посмотреть детали рол",
                    active: false,
                    key: "6.5",
                },
            ],
        },
        {
            label: "Категории",
            active: false,
            key: "7.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "7.1",
                },
                {
                    label: "Добавить категория",
                    active: false,
                    key: "7.3",
                },
                {
                    label: "Редактировать категория",
                    active: false,
                    key: "7.4",
                },
                {
                    label: "Удалить категория",
                    active: false,
                    key: "7.5",
                },
            ],
        },
        {
            label: "Товары",
            active: false,
            key: "8.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "8.1",
                },
                {
                    label: "добавление, редактирование и удаление",
                    active: false,
                    key: "8.2",
                },
            ],
        },
        {
            label: "Цвета",
            active: false,
            key: "9.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "9.1",
                },
                {
                    label: "добавление, редактирование и удаление",
                    active: false,
                    key: "9.2",
                },
            ],
        },
        {
            label: "Подборки",
            active: false,
            key: "10.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "10.1",
                },
                {
                    label: "добавление, редактирование и удаление",
                    active: false,
                    key: "10.2",
                },
            ],
        },
        {
            label: "Популярное",
            active: false,
            key: "11.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "11.1",
                },
                {
                    label: "Добавить Популярное",
                    active: false,
                    key: "11.2",
                },
                {
                    label: "Удалить Популярное",
                    active: false,
                    key: "11.3",
                },
            ],
        },
        {
            label: "Тренды",
            active: false,
            key: "12.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "12.1",
                },
                {
                    label: "Добавить Тренд",
                    active: false,
                    key: "12.2",
                },
                {
                    label: "Удалить Тренд",
                    active: false,
                    key: "12.3",
                },
            ],
        },
        {
            label: "Блоки",
            active: false,
            key: "13.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "13.1",
                },
                {
                    label: "добавление, редактирование и удаление",
                    active: false,
                    key: "13.2",
                },
            ],
        },
        {
            label: "Слайдеры",
            active: false,
            key: "14.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "14.1",
                },
                {
                    label: "добавление, редактирование и удаление",
                    active: false,
                    key: "14.2",
                },
            ],
        },
        {
            label: "Баннеры",
            active: false,
            key: "15.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "15.1",
                },
                {
                    label: "добавление, редактирование и удаление",
                    active: false,
                    key: "15.2",
                },
            ],
        },
        {
            label: "Промо",
            active: false,
            key: "16.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "16.1",
                },
                {
                    label: "добавление, редактирование и удаление",
                    active: false,
                    key: "16.2",
                },
            ],
        },
        {
            label: "Категории (new)",
            active: false,
            key: "17.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "17.1",
                },
                {
                    label: "Добавить категории (new)",
                    active: false,
                    key: "17.3",
                },
                {
                    label: "Редактировать категории (new)",
                    active: false,
                    key: "17.4",
                },
                {
                    label: "Удалить категории (new)",
                    active: false,
                    key: "17.5",
                },
                {
                    label: "Посмотреть подкатегорию (new)",
                    active: false,
                    key: "17.6",
                },
                {
                    label: "Добавить подкатегорию (new)",
                    active: false,
                    key: "17.7",
                },
                {
                    label: "Редактировать подкатегорию (new)",
                    active: false,
                    key: "17.8",
                },
                {
                    label: "Удалить подкатегорию (new)",
                    active: false,
                    key: "17.9",
                },
            ],
        },
        {
            label: "Товары (new)",
            active: false,
            key: "18.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "18.1",
                },
                {
                    label: "Редактировать товар",
                    active: false,
                    key: "18.2",
                },
                {
                    label: "Фильтровать товар",
                    active: false,
                    key: "18.3",
                },
                {
                    label: "Просмотреть весь товар",
                    active: false,
                    key: "18.4",
                },
                {
                    label: "Посмотреть вариант товар",
                    active: false,
                    key: "18.5",
                },
                {
                    label: "Редактировать вариант товар",
                    active: false,
                    key: "18.6",
                },
                {
                    label: "Просмотреть весь вариант товар",
                    active: false,
                    key: "18.7",
                },
            ],
        },
        {
            label: "Зоны (new)",
            active: false,
            key: "19.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "19.1",
                },
                {
                    label: "Добавить зона",
                    active: false,
                    key: "19.2",
                },
                {
                    label: "Редактировать зона",
                    active: false,
                    key: "19.3",
                },
                {
                    label: "Просмотреть весь зона",
                    active: false,
                    key: "19.4",
                },
                {
                    label: "Удалить зона",
                    active: false,
                    key: "19.5",
                },
            ],
        },
        {
            label: "Регионы (new)",
            active: false,
            key: "20.0",
            children: [
                {
                    label: "Только просмотр",
                    active: true,
                    key: "20.1",
                },
                {
                    label: "Добавить регион",
                    active: false,
                    key: "20.2",
                },
                {
                    label: "Редактировать регион",
                    active: false,
                    key: "20.3",
                },
                {
                    label: "Просмотреть весь регион",
                    active: false,
                    key: "20.4",
                },
                {
                    label: "Удалить регион",
                    active: false,
                    key: "20.5",
                },
                {
                    label: "Просмотр город",
                    active: true,
                    key: "20.6",
                },
                {
                    label: "Добавить город",
                    active: false,
                    key: "20.7",
                },
                {
                    label: "Редактировать город",
                    active: false,
                    key: "20.8",
                },
                {
                    label: "Просмотреть весь информация город",
                    active: false,
                    key: "20.9",
                },
                {
                    label: "Удалить город",
                    active: false,
                    key: "20.10",
                },
            ],
        },
    ],
    rules: {
        name: {
            required: true,
            message: "Пожалуйста, введите название",
            trigger: ["input", "blur"],
        },
    },
});

const getRoles = onMounted(async () => {
    roles.value = (
        await axios.get("roles/list", {
            params: details.query,
        })
    ).data.data;
});

const show = async (id) => {
    formValue.value = (await axios.get("roles/show/" + id)).data.data;
    formValue.value.is_active = formValue.value.is_active ? true : false;
    details.showModal = true;
};

const pagination = (page) => {
    details.query.page = page;
    getRoles();
};

const pageSize = (size) => {
    details.query.limit = size;
    getRoles();
};
</script>

<template>
    <div class="flex justify-end mb-3 rounded py-2 px-5" :class="useTheme().isDark ? 'bg-zinc-900' : 'bg-white'">
        <n-button type="success" ghost @click="details.showModal = true; formValue = [];">
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

            <n-tree block-line cascade checkable :data="details.roles" />

            <div v-if="details.type != 'view'" class="flex justify-end">
                <n-button type="error" ghost class="mr-4" @click="details.showModal = false">Отменить</n-button>
                <n-button type="success" ghost @click="formValue.id ? update() : store()">{{ formValue.id ?
                    'Обновлять' : 'Добавить' }}</n-button>
            </div>
        </n-card>
    </n-modal>
</template>
