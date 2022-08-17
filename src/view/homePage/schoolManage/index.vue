<template>
  <div>
    <el-button @click="aa">按钮</el-button>
    <el-button @click="bb">按钮</el-button>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
const { proxy } = getCurrentInstance();
const { query } = router.currentRoute.value;
onMounted(() => {});
const aa = () => {
  proxy.$axios.get("/sysDictType/allDict").then((res) => {
    console.log(res);
  });
};
const bb = () => {
  console.log(proxy.utils.formatDate(1660699413));
};
</script>

<style lang='scss' scoped>
</style>
