<template>
  <div class="">
    <a-space>
      <div>
        <component :is="props.value"></component>
      </div>
      <div>
        <a-button @click="visible = true" size="mini"> 选择 </a-button>
      </div>
    </a-space>
    <a-modal
      v-model:visible="visible"
      :footer="false"
      width="50vw"
      :draggable="true"
    >
      <template #title> 选择图标 </template>
      <div class="icon_box">
        <a-space>
          <a-tabs default-active-key="logo" position="left">
            <a-tab-pane
              v-for="item of ICON_JSON"
              :key="item.type"
              :title="item.title"
            >
              <a-space wrap>
                <a-button
                  type="dashed"
                  v-for="icon of item.list"
                  :key="icon.name"
                  @click="handle(icon.name)"
                >
                  <component :is="icon.name"></component>
                </a-button>
              </a-space>
            </a-tab-pane>
          </a-tabs>
        </a-space>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ICON_JSON from "./icon.json";

console.log(ICON_JSON);
interface Props {
  value: string;
}

const props = defineProps<Props>();

const visible = ref(false);

const emits = defineEmits(["update:value"]);

const handle = (icon: string) => {
  visible.value = false;
  emits("update:value", icon);
};
</script>

<style scoped lang="less"></style>
