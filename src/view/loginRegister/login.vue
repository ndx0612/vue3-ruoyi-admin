<template>
  <div>
    <el-button @click="login">登录</el-button>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
const { proxy } = getCurrentInstance();
const { query } = router.currentRoute.value;
onMounted(() => {});

/**
 * @description: 点击登录
 */
const login = () => {
  router.push({
    name: "home",
  });
};
</script>

<style lang='scss' scoped>
</style>
