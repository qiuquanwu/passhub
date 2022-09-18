<template>
  <div class="page">
    <div></div>

    <a-row class="grid-demo">
      <a-col :span="6">
        <div class="list-box">
          <div class="user_info">
            <a-avatar :style="{ backgroundColor: '#3370ff' }">
              <IconUser />
            </a-avatar>
            <div style="padding-top: 0.5rem">{{ user.nickname }}</div>
          </div>
          <a-menu
            :style="{ borderRadius: '4px' }"
            theme="light"
            :collapsed="collapsed"
            :default-open-keys="['0']"
            :default-selected-keys="['0_2']"
          >
            <a-menu-item key="0_0">
              <!-- <icon-qq-circle-fill /> -->
              <component is="icon-qq-circle-fill"></component>
              QQ账号
            </a-menu-item>
            <a-menu-item key="0_1">
              <icon-qq-circle-fill /> 微信账号
            </a-menu-item>
            <a-menu-item key="0_2">
              <icon-qq-circle-fill /> 游戏账号
            </a-menu-item>
            <a-menu-item key="0_3">
              <icon-qq-circle-fill /> QQ账号
            </a-menu-item>
          </a-menu>
        </div>
        <div class="logout-box">
          <a-space align="center">
            <a-tooltip content="设置">
              <a-button type="text" :size="btnSize" @click="openSetVisible">
                <icon-settings />
              </a-button>
            </a-tooltip>
            <a-tooltip content="添加组">
              <a-button type="text" @click="openAddModal" :size="btnSize">
                <icon-plus />
              </a-button>
            </a-tooltip>

            <a-popconfirm
              content="你确认退出登录？"
              @ok="logout"
              title="退出账号"
            >
              <a-tooltip content="退出">
                <a-button type="text" :size="btnSize">
                  <icon-export />
                </a-button>
              </a-tooltip>
            </a-popconfirm>

            <!-- <a-tooltip content="注销账号">
              <a-button type="text" :size="btnSize" @click="handleClickWarning">
                <icon-delete />
              </a-button>
            </a-tooltip> -->
          </a-space>
        </div>
      </a-col>
      <a-col :span="6">
        <div class="list-box">
          <a-input placeholder="请输入搜索内容" allow-clear>
            <template #suffix>
              <icon-search />
            </template>
          </a-input>
        </div>
        <div class="logout-box">
          <a-space align="center">
            <a-tooltip content="添加数据">
              <a-button type="text" @click="openAddModal" :size="btnSize">
                <icon-plus />
              </a-button>
            </a-tooltip>
          </a-space>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="content">内容3</div>
      </a-col>
    </a-row>

    <AddModalVue v-model:visible="visible" />
    <SettingModal v-model:visible="setVisible" />
  </div>
</template>

<script setup lang="ts">
import useGo from "@/hooks/useGo";
import { Modal } from "@arco-design/web-vue";
import { ref } from "vue";
import AddModalVue from "./AddModal.vue";
import SettingModal from "./SettingModal.vue";
import { useLocalStorage } from "@vueuse/core";
const user = useLocalStorage<any>("user", {});

console.log(user.value);
const { go } = useGo();
const logout = () => {
  localStorage.removeItem("user");
  go({
    name: "Login",
  });
};

const btnSize = ref<"small" | "large" | "mini" | "medium" | undefined>(
  "medium"
);

const collapsed = ref(false);

const visible = ref(false);

const openAddModal = () => {
  visible.value = true;
};
const setVisible = ref(false);

const openSetVisible = () => {
  setVisible.value = true;
};

const handleClickWarning = () => {
  Modal.warning({
    title: "你是否注销该账号？",
    content: "注销账号后，该账号所有数据将会删除！",
    hideCancel: false,
    titleAlign: "start",
    onOk() {
      console.log("删除用户！");
      go({
        name: "Login",
      });
    },
  });
};
</script>

<style scoped lang="less">
.logout-box {
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 1rem 0;
  background-color: white;
  width: 25%;
  border-right: 1px solid #ddd;
}
.list-box {
  padding: 1rem;
  max-height: 100vh;
  overflow: auto;
  padding-bottom: 5rem;
  border-right: 1px solid #ddd;
  border-top: 1px solid #ddd;
  height: 100vh;
}

.content {
  padding: 1rem;
  height: 100vh;
  border-top: 1px solid #ddd;
  overflow: auto;
}

.user_info {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}
</style>
