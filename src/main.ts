import { createApp } from "vue";
import App from "./App.vue";
// import './samples/node-api'
import router from "./router";
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
const app = createApp(App);
app.use(router)
app.use(ArcoVue);
app.use(ArcoVueIcon);
app.mount("#app").$nextTick(() => {
  postMessage({ payload: "removeLoading" }, "*");
});
