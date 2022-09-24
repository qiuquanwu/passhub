<template>
  <a-modal v-bind="$attrs" @ok="handleOk" @cancel="handleCancel" :width="400" @before-ok="handleBeforeOk">
    <template #title>
      <span>修改账号 </span>
    </template>
    <div>
      <a-form :model="form" ref="formRef">
        <a-form-item field="name" label="名称" :rules="[{ required: true, message: '必须填写一个名称' }]"
          :validate-trigger="['change', 'input', 'blur']">
          <a-input placeholder="请输入一个名字" allow-clear v-model="form.name" />
        </a-form-item>
        <a-form-item field="remarks" label="描述">
          <a-textarea placeholder="请输入账号描述" allow-clear v-model="form.remarks" />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw, watch, watchEffect } from "vue";
// const itemName = ref("");
import IconSelectVue from "@/components/IconSelect.vue";
import { useLocalStorage } from "@vueuse/core";
import { addItem, updateItem } from "@/api";
import { Item } from "@prisma/client";
import message from "@arco-design/web-vue/es/message";
const formRef = ref<Partial<Item> | null>(null);

interface Props {
  item: Item | null
}
const props = defineProps<Props>()

const handleOk = () => {
  console.log("handleOk");
};


const form = reactive<Partial<Item>>({
  name: "",
  remarks: "",
  id: -1,
});

watchEffect(() => {
  console.log(props)
  form.name = props.item?.name
  form.remarks = props.item?.remarks
  form.id = props.item?.id
})

watch(props, () => {
  console.log(props)
})
const handleCancel = () => {
  console.log("handleCancel");
};
const emits = defineEmits(["onEditItem"]);
const handleBeforeOk = async (done: any) => {
  console.log(form);
  const res = await updateItem(toRaw(form));
  console.log(res);
  if (res && res.code == 200) {
    message.success('修改成功！')
  } else {
    message.error('修改失败！')
  }
  done();
  emits("onEditItem");
};
</script>

<style scoped lang="less">

</style>
