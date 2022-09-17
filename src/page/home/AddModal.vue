<template>
  <a-modal v-bind="$attrs" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      <span>添加账号组 </span>
    </template>
    <div>
      <a-input
        placeholder="请输入一个名字"
        allow-clear
        v-model:value="itemName"
      />
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";

const itemName = ref("");
const handleOk = () => {
  console.log("handleOk");
};

const handleCancel = () => {
  console.log("handleCancel");
};
</script>

<style scoped lang="less"></style>
