<template>
  <div class="homePage h-full w-full">
    <el-header class="flex h-[60px] items-center justify-between px-[20px]  border-[1px]">
      <div>
        <span class="text-[26px]">后台管理系统</span>
        <span class="text-[16px] ml-[10px]">版本号（1.0）</span>
      </div>
      <div class="flex items-center">
        <el-avatar class="mr-[10px]" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span class="mr-[10px] text-[16px]">管理员</span>
        <el-icon :size="20" class="exit" @click="exit">
          <CloseBold />
        </el-icon>
      </div>
    </el-header>

    <el-container class="w-full flex overflow-x-hidden" style="height: calc(100% - 60px);">
      <el-aside width="200px">
        <el-menu :default-active="onRouters" router class="el-menu-vertical-demo">
          <el-menu-item v-for="(item,index) in data.routerList" :key="index" :index="item.path">
            <template #title>{{item.title}}</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="flex-1 h-full">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
let router = useRouter(); // router路由
const route = useRoute();
const data = reactive({
  routerList: [
    {
      path: "cluesManage",
      title: "线索管理",
    },
    {
      path: "schoolManage",
      title: "学校管理",
    },
  ],
});
// 监听路由变化时触发
const onRouters = computed(() => {
  if (route.meta.activeMenu) return route.meta.activeMenu;
  return router.currentRoute._value.fullPath.split("/")[1];
});

// 退出登录
const exit = () => {
  router.push({
    name: "login",
  });
};
</script>

<style lang='scss' scope>
.exit {
  cursor: pointer;
}

.homePage {
  .el-main {
    padding: 0px;
  }
}
.el-menu-vertical-demo {
  width: 60px;
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
</style>