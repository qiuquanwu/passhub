<template>
    <a-modal v-bind="$attrs" @ok="handleOk" @cancel="handleCancel" :width="400" @before-ok="handleBeforeOk">
    <template #title>添加账号</template>
    <div>
        添加账号
    </div>
    </a-modal>
</template>

<script setup lang='ts'>
import { } from 'vue'


const handleOk = () => {}
const handleCancel = () => { }
const handleBeforeOk = () => { }
</script>

<style scoped lang='less'>

</style>