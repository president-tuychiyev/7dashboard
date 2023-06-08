<template>
    <div class="grid grid-flow-col auto-cols-max">
        <n-card class="mr-6">
            <n-tag type="success" class="justify-start"> Продажи </n-tag>
        </n-card>
        <n-card :segmented="{
            content: true,
            footer: 'soft'
        }">
            <template #header-extra>
                #header-extra
            </template>
            Card Content
            <template #footer>
                #footer
            </template>
            <template #action>
                #action
            </template>
        </n-card>
        <n-card :segmented="{
            content: true,
            footer: 'soft'
        }">
            <template #header-extra>
                #header-extra
            </template>
            Card Content
            <template #footer>
                #footer
            </template>
            <template #action>
                #action
            </template>
        </n-card>
        <n-card :segmented="{
            content: true,
            footer: 'soft'
        }">
            <template #header-extra>
                #header-extra
            </template>
            Card Content
            <template #footer>
                #footer
            </template>
            <template #action>
                #action
            </template>
        </n-card>
    </div>
</template>