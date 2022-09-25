<template>
  <div class="page">
    <a-row class="grid-demo">
      <a-col :span="6">
        <div class="list-box">
          <div class="user_info">
            <a-avatar :style="{ backgroundColor: '#3370ff' }">
              <IconUser />
            </a-avatar>
            <div style="padding-top: 0.5rem">{{ user.nickname }}</div>
          </div>
          <a-menu :style="{ borderRadius: '4px' }" theme="light" :collapsed="collapsed"
            v-model:selected-keys="selectedKey" :default-selected-keys="selectedKey">
            <a-empty v-if="groups.length == 0" />
            <a-menu-item v-for="group of groups" :key="group.id">
              <!-- <icon-qq-circle-fill /> -->
              <a-row>
                <a-col :span="4">
                  <component :is="group.icon"></component>
                </a-col>
                <a-col :span="12">
                  {{ group.name }}
                </a-col>
                <!-- <a-col :span="4" v-if="selectedKey.includes(group.id)">
                  <icon-edit />
                </a-col> -->
                <a-col :span="4" v-if="selectedKey.includes(group.id)">
                  <icon-edit @click="handleEidt(group)" />
                  <a-popconfirm content="是否删除该账号组?" @ok="removeGroup(group.id)">
                    <icon-delete />
                  </a-popconfirm>
                </a-col>
              </a-row>
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

            <a-popconfirm content="你确认退出登录？" @ok="logout" title="退出账号">
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
          <div style="padding:4px 8px">
            <a-input placeholder="请输入搜索内容" allow-clear v-model="searchText" @blur="search" @press-enter="search">
              <template #suffix>
                <icon-search />
              </template>
            </a-input>
          </div>

          <div>
            <a-menu :style="{ borderRadius: '4px' }" theme="light" :collapsed="collapsed"
              v-model:selected-keys="itemKeys" :default-selected-keys="itemKeys">
              <a-empty v-if="items.length == 0" />
              <a-menu-item v-for="item of items" :key="item.id">
                <!-- <icon-qq-circle-fill /> -->
                <a-row>
                  <a-col :span="12">
                    {{ item.name }}
                  </a-col>
                  <a-col :span="4" v-if="itemKeys.includes(item.id)">
                    <icon-edit @click="handleEditItem(item)" />
                    <a-popconfirm content="是否删除该账号?" @ok="removeItem(item.id)">
                      <icon-delete />
                    </a-popconfirm>
                  </a-col>
                </a-row>
              </a-menu-item>
            </a-menu>
          </div>
        </div>
        <div class="logout-box">
          <a-space align="center">
            <a-tooltip content="添加数据">
              <a-button type="text" @click="openAddItemVue" :size="btnSize">
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
    <!-- 添加组 -->
    <AddModalVue v-model:visible="visible" @handle-complete="handleComplete" />
    <!-- 编辑组 -->
    <EditModalVue v-model:visible="editVisible" @handle-complete="handleComplete" :group="group" />
    <!-- 设置弹窗 -->
    <SettingModal v-model:visible="setVisible" />
    <!-- 添加item -->
    <AddItemVue v-model:visible="addItemVueVisible" @onAddItem="onAddItem" :currentGroupId="currentGroupId" />

    <EditItemVue v-model:visible="editItemVisible" @onEditItem="onEditItem" :item="item" />

  </div>
</template>

<script setup lang="ts">
import useGo from "@/hooks/useGo";
import { Modal } from "@arco-design/web-vue";
import { computed, ref, unref, watchEffect, nextTick } from "vue";
import AddModalVue from "./AddModal.vue";
import EditModalVue from "./EditModal.vue";
import SettingModal from "./SettingModal.vue";
import AddItemVue from "./AddItem.vue";
import EditItemVue from "./EditItem.vue";
import { useLocalStorage } from "@vueuse/core";
import { delGroup, delItem, viewGroup, viewItem } from "@/api";
import message from "@arco-design/web-vue/es/message";
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


const editVisible = ref(false);
const group = ref(null)
const handleEidt = (item: any) => {
  group.value = item
  editVisible.value = true;
}

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

const groups = ref<any[]>([]);
// const items = ref<any[]>([]);
const selectedKey = ref<any[]>([]);
const getGroup = async (userId: number) => {
  const res = await viewGroup({
    userId: userId,
  });

  console.log("所有的权限组", res);

  groups.value = res.data;
  selectedKey.value = res.data.length > 0 ? [res.data[0].id] : [];
};

const removeGroup = async (id: number) => {
  const res = await delGroup({ id });
  if (res.code == 200) {
    message.success("删除成功！");
    getGroup(user.value.id);
  } else {
    message.error("删除失败！");
  }
};
watchEffect(async () => {
  getGroup(user.value.id);
});

const handleComplete = () => {
  visible.value = false;
  editVisible.value = false;
  getGroup(user.value.id);
};
const currentGroupId = ref(-1)

/***Items */

const items = ref<any[]>([])
const addItemVueVisible = ref(false)
const itemKeys = ref<any[]>([])
const openAddItemVue = () => {
  console.log(selectedKey.value)
  const groupId = selectedKey.value[0]
  if (groupId && typeof groupId === "number") {
    currentGroupId.value = groupId
    addItemVueVisible.value = true;
  } else {
    message.error('请选择一个账号组！')
  }
}

const onAddItem = () => {
  addItemVueVisible.value = false;
  getItem()
}

const getItem = async (groupId?: number) => {
  if (!groupId) {
    groupId = selectedKey.value[0]
  }
  const res = await viewItem({ groupId })
  if (res && res.code === 200) {
    items.value = res.data
  }
  console.log(res)
}
watchEffect(async () => {
  getItem(selectedKey.value[0]);
});

const removeItem = async (id: number) => {
  const res = await delItem({ id });
  if (res.code == 200) {
    message.success("删除成功！");
    getItem()
  } else {
    message.error("删除失败！");
  }
};
const item = ref<any>(null)
const editItemVisible = ref(false)
const handleEditItem = (data: any) => {
  item.value = data
  console.log(item.value)
  nextTick(() => {
    console.log(item.value)
    editItemVisible.value = true;
  })

}
const onEditItem = () => {
  editItemVisible.value = false;
  getItem()
}

/**搜索功能 */
const searchText = ref('')
const search = () => {
  const text = searchText.value
  if (text !== '') {
    items.value = items.value.filter((item) => {
      return item.name.indexOf(text) > -1;
    })
  } else {
    getItem()
  }
}
/**内容区 */
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
