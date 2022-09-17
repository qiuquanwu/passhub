<template>
  <a-modal v-bind="$attrs" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      <span>设置 </span>
    </template>
    <div>设置</div>
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
