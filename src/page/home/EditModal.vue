<template>
  <a-modal
    v-bind="$attrs"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="400"
    @before-ok="handleBeforeOk"
  >
    <template #title>
      <span>修改 </span>
    </template>
    <div>
      <a-form :model="form" ref="formRef">
        <a-form-item
          field="name"
          label="名称"
          :rules="[{ required: true, message: '必须填写一个名称' }]"
          :validate-trigger="['change', 'input', 'blur']"
        >
          <a-input
            placeholder="请输入一个名字"
            allow-clear
            v-model="form.name"
          />
        </a-form-item>
        <a-form-item
          field="icon"
          label="图标"
          :rules="[{ required: true, message: '必须选择一个图标' }]"
          :validate-trigger="['change', 'input', 'blur']"
        >
          <IconSelectVue v-model:value="form.icon" />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, ref, toRaw, watchEffect } from "vue";
// const itemName = ref("");
import IconSelectVue from "@/components/IconSelect.vue";
import { useLocalStorage } from "@vueuse/core";
import { addGroup, updateGroup } from "@/api";
import { Group } from "@prisma/client";
const formRef = ref<any>(null);

const user = useLocalStorage<any>("user", {});

interface Props{
  group:Group|null
}
const props  = defineProps<Props>()

const handleOk = () => {
  console.log("handleOk");
};


const form = reactive({
  id:0,
  name: "",
  icon: "",
});
watchEffect(()=>{
  if(props.group){
    form.name=props.group.name
    form.icon=props.group.icon
    form.id=props.group.id
  }
})
const handleCancel = () => {
  console.log("handleCancel");
};
const emits = defineEmits(["handleComplete"]);
const handleBeforeOk = async (done: any) => {
  console.log(form);

  if (form.name === "") {
    formRef.value?.setFields({
      name: {
        status: "error",
        message: "名称不能为空！",
      },
    });
    done();
  }
  if (form.icon === "") {
    formRef.value?.setFields({
      icon: {
        status: "error",
        message: "请选择图标！",
      },
    });
    done();
  }

  const res = await updateGroup(toRaw(form));
  console.log(res);
  done();
  emits("handleComplete");
};
</script>

<style scoped lang="less"></style>
