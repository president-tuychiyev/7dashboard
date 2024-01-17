import { NButtonGroup, NButton, NDropdown, NSelect } from 'naive-ui';
import { Pencil, EyeOutline, Menu } from '@vicons/ionicons5';
import moment from 'moment';
import { h } from 'vue';

export const details = reactive({
query: {
page: 1,
column: 'id',
sort: 'desc',
limit: 15
},
columns: [
{
title: '№',
key: 'client_order_id',
sorter: 'default'
},
{
title: 'Заказчик',
key: 'user_id',
render(row) {
return row.user ? (row.user.first_name ?? '(' + row.user.phone + ')') + ' ' + (row.user.last_name ?? '') : '🗑 ' + (row.user_data.first_name ?? '(' + row.user_data.phone + ')') + ' ' + (row.user_data.last_name ?? '');
},
sorter: 'default'
},
{
title: 'Итоговая сумма',
key: 'total_price',
render: (row) => currency(row.total_price, row.currency),
filterMultiple: false,
filterOptionValue: null,
filterOptions: [
{
label: 'UZS',
value: 'UZS'
},
{
label: 'USD',
value: 'USD'
}
],
filter: 'default'
},
{
title: 'Метод оплаты',
key: 'payment_method',
render(row) {
switch (row.payment_method) {
case 1: return 'Наличные';
case 2: return 'PAYME';
case 3: return 'CLICK';
case 4: return 'CARD';
case 5: return 'VISA';
case 6: return 'MCARD';
case 7: return 'PAYZE';
}
},
sorter: 'default',
filterMultiple: false,
filterOptionValue: null,
filterOptions: [
{ label: 'Наличные', value: '1' },
{ label: 'PAYME', value: '2' },
{ label: 'CLICK', value: '3' },
{ label: 'CARD', value: '4' },
{ label: 'VISA', value: '5' },
{ label: 'MCARD', value: '6' },
{ label: 'PAYZE', value: '7' }
],
filter: 'default'
},
{
title: 'Статус заказа',
key: 'state',
render(row) {
switch (row.state) {
case 1: return '🆕 Новый';
case 2: return '🕔 В обработке';
case 3: return '🚚 В пути';
case 4: return '✅ Выполнен';
case -1: return '❌ Отмена';
case -2: return '↩️ Возврат';
case 5: return '💤 Завершен';
}
},
sorter: 'default',
filterMultiple: false,
filterOptionValue: null,
filterOptions: [
{
label: 'Новый',
value: '1'
},
{
label: 'В обработке',
value: '2'
},
{
label: 'В пути',
value: '3'
},
{
label: 'Выполнен',
value: '4'
},
{
label: 'Отмена',
value: '-1'
},
{
label: 'Возврат',
value: '-2'
},
{
label: 'Завершен',
value: '5'
}
],
filter: 'default'
},
{
title: 'Статус оплаты',
key: 'payment_state',
render: (row) => {
h(NSelect, {
options: [
{
label: () => h('span', { class: 'font-bold text-green-600' }, '✅ Оплачен'),
value: 1
},
{
label: () => h('span', { class: 'text-red-600' }, '⚠️ Не оплачен'),
value: 2
}
]
});
},
sorter: 'default',
filterMultiple: false,
filterOptionValue: null,
filterOptions: [
{
label: 'Оплачен',
value: '1'
},
{
label: 'Не оплачен',
value: '0'
}
],
filter: 'default'
},
{
title: 'Дата',
key: 'created_at',
render(row) {
return moment(row.created_time).format("DD.MM.YYYY | HH:mm");
},
sorter: 'default'
},
{
title: 'Действия',
align: 'center',
render: () => {
return h(NButtonGroup, null, {
default: () => [
h(NButton, null, { default: () => h(renderIcon(Pencil)) }),
h(NButton, null, { default: () => h(renderIcon(EyeOutline)) }),
h(NDropdown, { filterable: true, options: details.actionOptions, trigger: 'click' }, { default: () => h(NButton, null, { default: () => h(renderIcon(Menu)) }) })
]
});
}
}
],
actionOptions: [
{
type: "group",
label: "Статус заказа",
key: "state",
children: [
{
label: 'Новый',
value: '1'
},
{
label: 'В обработке',
value: '2'
},
{
label: 'В пути',
value: '3'
},
{
label: 'Выполнен',
value: '4'
},
{
label: 'Отмена',
value: '-1'
},
{
label: 'Возврат',
value: '-2'
},
{
label: 'Завершен',
value: '5'
}
]
},
{
type: "group",
label: "Статус оплаты",
key: "payment_state",
children: [
{
label: 'Оплачен',
value: '1'
},
{
label: 'Не оплачен',
value: '0'
}
]
}
]
});
