<template>
  <!-- 左侧工具栏 -->
  <div class="h-full flex">
    <el-menu default-active="2" class="el-menu-vertical-demo h-full overflow-y-auto overflow-x-hidden" :collapse="isCollapse" @open="handleOpen" @close="handleClose">

      <!-- 首页 -->
      <el-menu-item index="0">
        <el-icon>
          <House />
        </el-icon>
        <template #title>首页</template>
      </el-menu-item>

      <!-- 系统管理 -->
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <setting></setting>
          </el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="1-1">
          <template #title>
            <span class="ml-[20px]">用户管理</span>
          </template>
        </el-menu-item>
        <el-menu-item index="1-2">
          <span class="ml-[20px]">用户管理</span>
        </el-menu-item>
        <el-menu-item index="1-3">
          <span class="ml-[20px]">角色管理</span>
        </el-menu-item>
        <el-menu-item index="1-4">
          <span class="ml-[20px]">菜单管理</span>
        </el-menu-item>
        <el-menu-item index="1-5">
          <span class="ml-[20px]">部门管理</span>
        </el-menu-item>
        <el-menu-item index="1-6">
          <span class="ml-[20px]">字典管理</span>
        </el-menu-item>
      </el-sub-menu>

      <!-- 系统监控 -->
      <el-menu-item index="2">
        <el-icon>
          <icon-menu />
        </el-icon>
        <template #title>系统监控</template>
      </el-menu-item>

      <!-- 系统工具 -->
      <el-menu-item index="3">
        <el-icon>
          <document />
        </el-icon>
        <template #title>系统工具</template>
      </el-menu-item>

      <!-- 若依官网 -->
      <el-menu-item index="4">
        <el-icon>
            <location />
        </el-icon>
        <template #title>若依官网</template>
      </el-menu-item>
    </el-menu>

    <!-- 右边内容 -->
    <div>
      <el-button @click="switchOnOff">显示/隐藏</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

const isCollapse = ref(false);

const switchOnOff = () => {
  isCollapse.value = !isCollapse.value;
};

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 100%;
}
</style>
