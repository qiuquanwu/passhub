<template>
  <a-modal v-bind="$attrs" @ok="handleOk" @cancel="handleCancel" :width="400" @before-ok="handleBeforeOk">
    <template #title>添加账号</template>
    <div>
      <a-form :model="form" ref="formRef">
        <a-form-item field="name" label="名称" :rules="[{ required: true, message: '必须填写账号名称' }]"
          :validate-trigger="['change', 'input', 'blur']">
          <a-input placeholder="请输入账号名称" allow-clear v-model="form.name" />
        </a-form-item>
        <a-form-item field="remarks" label="描述">
          <a-textarea placeholder="请输入账号描述" allow-clear v-model="form.remarks" />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang='ts'>
import { formInjectionKey } from '@arco-design/web-vue/es/form/context';
import message from '@arco-design/web-vue/es/message';
import { Item } from '@prisma/client';
import { reactive, toRaw, watchEffect } from 'vue'
import { addItem } from "@/api"

interface Props {
  currentGroupId: number;
}

const props = defineProps<Props>()
const form = reactive<Partial<Item>>({
  name: "",
  remarks: "",
  groupId: 12,
});
const handleOk = () => {

  console.log(toRaw(form))
}
const emits = defineEmits(['onAddItem'])
const handleCancel = () => { }
const handleBeforeOk = async () => {

  console.log(toRaw(form))

  const data = toRaw(form)
  const res = await addItem(data)

  console.log(res)
  if (res.code == 200) {
    message.success('创建成功')
    emits('onAddItem')
  } else {
    message.error('创建失败')
  }
}

watchEffect(() => {
  form.groupId = props.currentGroupId
})
</script>

<style scoped lang='less'>

</style>