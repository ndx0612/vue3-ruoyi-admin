<template>
  <!-- 左侧工具栏 -->
  <div class="h-full flex bg-[#efefef]">
    <el-menu default-active="0" class="el-menu-vertical-demo h-full overflow-y-auto overflow-x-hidden" :collapse="isCollapse" :unique-opened="true" @open="handleOpen" @close="handleClose">

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
      <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <Operation />
          </el-icon>
          <span>运营配置</span>
        </template>
        <el-menu-item index="2-2">
          <span class="ml-[20px]">项目管理</span>
        </el-menu-item>
        <el-menu-item index="2-3">
          <span class="ml-[20px]">合同管理</span>
        </el-menu-item>
      </el-sub-menu>

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
      <el-button @click="switchCollapse">显示/隐藏</el-button>
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

/**
 * @description: 折叠/展开菜单
 */
const switchCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
// .el-menu .el-menu--inline {
//   span {
//     color: #7c7f83;
//   }
// }

// .el-menu-item .is-active .el-menu--inline{
//   span {
//     color: #409eff !important;
//   }
// }
</style>
