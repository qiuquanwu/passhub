<template>
  <a-modal
    v-bind="$attrs"
    @ok="handleOk"
    @cancel="handleCancel"
    :width="400"
    @before-ok="handleBeforeOk"
  >
    <template #title>
      <span>添加账号组 </span>
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
import { reactive, ref, toRaw } from "vue";
// const itemName = ref("");
import IconSelectVue from "@/components/IconSelect.vue";
import { useLocalStorage } from "@vueuse/core";
import { addGroup } from "@/api";
const formRef = ref<any>(null);

const user = useLocalStorage<any>("user", {});
const handleOk = () => {
  console.log("handleOk");
};
const form = reactive({
  name: "",
  icon: "icon-qq-circle-fill",
});
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

  const res = await addGroup({
    ...toRaw(form),
    userId: user.value.id,
  });
  console.log(res);
  done();
  //保存账号组
  form.name = "";
  emits("handleComplete");
};
</script>

<style scoped lang="less"></style>
