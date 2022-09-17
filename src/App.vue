<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
import Main from "./components/Main.vue";
</script>

<template>
  <!-- <Main /> -->

  <router-view></router-view>
</template>

<style lang="less">
html {
  box-sizing: border-box;
  font-size: 10px;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body,
ul,
li {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
}
a {
  text-decoration: none;
}
input {
  border-style: none;
  background: transparent;
  outline: none;
}
button {
  padding: 0;
  background: none;
  border: none;
  outline: none;
}
*::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}

*::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
  background: #d2daea;
}

*::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  //   box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
  opacity: 0;
}
</style>
