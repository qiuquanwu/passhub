<template>
  <div class="login-page">
    <a-spin :loading="loading" :tip="loadingTip">
      <div class="container">
        <!-- <div class="demo-flex-spacer"></div> -->
        <h1>PassHub</h1>
        <h4>记录你的各种账号信息</h4>
        <!-- <div class="webflow-style-input">
          <input
            class=""
            type="text"
            v-model="formState.username"
            placeholder="账号"
          />
        </div> -->
        <div style="padding: 2rem">
          <a-space>
            <div v-for="user of userList" :key="user.username">
              <a-button
                :type="getType(user.username)"
                shape="circle"
                size="large"
                @click="injectName(user.username)"
              >
                <IconUser />
              </a-button>
              <div
                style="text-align: center; margin-top: 0.5rem; font-size: 12px"
              >
                {{ user.nickname }}
              </div>
            </div>

            <div>
              <a-button
                type="outline"
                shape="circle"
                size="large"
                @click="goRegister"
              >
                <icon-plus />
              </a-button>
              <div
                style="text-align: center; margin-top: 0.5rem; font-size: 12px"
              >
                添加用户
              </div>
            </div>
          </a-space>
        </div>

        <div class="webflow-style-input" v-if="formState.username != ''">
          <input
            class=""
            type="password"
            v-model="formState.password"
            placeholder="密码"
          />
        </div>
        <div style="padding-top: 1rem" v-if="formState.username != ''">
          <button
            class="login-button"
            style="color: white; width: 40rem"
            @click="handleSubmit"
          >
            GO!
          </button>
        </div>
      </div>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import useGo from "@/hooks/useGo";
import useLoading from "@/hooks/useLoading";
import { onMounted, reactive, ref, toRaw } from "vue";
import { doLogin, doGetUsers } from "@/api";
import message from "@arco-design/web-vue/es/message";
const password = ref<string>("");
const { go } = useGo();
const { loading, showLoading, hideLoading, loadingTip } = useLoading();

interface FormState {
  password: string;
  username: string;
}

const formState = reactive<FormState>({
  password: "",
  username: "",
});

const injectName = (username: string) => {
  formState.username = username;
};

const getType = (username: string) => {
  return username === formState.username ? "primary" : "outline";
};

const userList = ref<any[]>([]);
const goRegister = () => {
  go({
    name: "Register",
  });
};
onMounted(async () => {
  const res = await doGetUsers();
  console.log(res);
  userList.value = res.data;
});

const handleSubmit = async () => {
  const data = toRaw(formState);
  if (!data.password || !data.username) {
    message.error("账号或者密码不能为空");
  } else {
    console.log(data);
    showLoading("正在登录...");
    const res = await doLogin(data);
    hideLoading();
    console.log(res);

    if (res.code == 200) {
      localStorage.setItem("user", JSON.stringify(res.data));
      go({
        name: "Home",
      });
    }
  }
};
</script>

<style scoped lang="less">
/* ====================================================
Recreating the email field from https://webflow.com/cms. Just an experiment - not as cross-browser friendly as the original.
Changed:
- animated gradient bar to :after element
- flexbox for layout
==================================================== */
.login-page {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-image: radial-gradient(
    circle at 0% 0%,
    #373b52,
    #252736 51%,
    #1d1e26
  );
  color: white;
}
h1.demo {
  text-align: center;
  font-size: 2.4rem;
  font-weight: normal;
  margin-bottom: 1rem;
  color: #f5f6ff;
}
a.demo {
  text-align: center;
  font-size: 1.6rem;
  font-weight: normal;
  color: rgba(202, 205, 239, 0.8);
  margin-bottom: 3rem;
}
.demo-flex-spacer {
  flex-grow: 1;
}
.container {
  display: flex;
  flex-direction: column;
  //justify-content: center;
  height: 100vh;
  width: 100vw;
  padding: 0 15px;
  margin: 0 auto;
  align-content: center;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  color: white;
}

// colors
@input-background: rgba(57, 63, 84, 0.8);

@input-text-inactive: #7881a1;

@input-text-active: #bfd2ff;

// gradient animation
@keyframes gradient {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}

.webflow-style-input {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 2px;
  padding: 1.4rem 2rem 1.6rem;
  background: @input-background;
  &:after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 999;
    height: 2px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-position: 0% 0%;
    background: linear-gradient(
      to right,
      #b294ff,
      #57e6e6,
      #feffb8,
      #57e6e6,
      #b294ff,
      #57e6e6
    );
    background-size: 500% auto;
    animation: gradient 3s linear infinite;
  }
}

.webflow-style-input input {
  flex-grow: 1;
  color: @input-text-active;
  font-size: 1.5rem;
  line-height: 2rem;
  vertical-align: middle;
  &::-webkit-input-placeholder {
    color: @input-text-inactive;
  }
}

.webflow-style-input button {
  color: @input-text-inactive;
  font-size: 2.4rem;
  line-height: 2.4rem;
  vertical-align: middle;
  transition: color 0.25s;
  &:hover {
    color: @input-text-active;
  }
}

.login-button:hover {
  align-items: center;
  background-image: linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb);
  border: 0;
  border-radius: 8px;
  box-shadow: rgb(151 65 252 / 20%) 0 15px 30px -5px;
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  font-family: Phantomsans, sans-serif;
  justify-content: center;
  max-width: 100%;
  min-width: 140px;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
}
.login-button {
  padding: 1rem 0;
  font-size: 14px;
  background-color: rgb(5, 6, 45);
  padding: 16px 24px;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  transition: 300ms;
}
</style>
