<template>
  <div>
    <el-button @click="aa">存储</el-button>
    <el-button @click="bb">获取</el-button>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { setStorage, getStorage } from "@/utils/storage";


const aa = () => {
  setStorage("test", {
    name: "lwx",
    age: 22,
  });
  console.log("存储");
};

const bb = () => {
  console.log(getStorage("test"));
  console.log("获取");
  // console.log(getStorageKeys());
};

</script>

<style lang='scss' scoped>
</style>
