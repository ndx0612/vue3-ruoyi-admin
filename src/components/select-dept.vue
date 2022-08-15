<template>
  <el-select v-model="deptId" placeholder="部门" clearable>
    <el-option v-for="item in options" :key="item.deptId" :label="item.deptName" :value="item.deptId" />
  </el-select>
</template>

<script setup>
import { ref, watch, onMounted, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

defineOptions({ name: "select-dept" });

const deptId = ref([]);
const options = ref([
  {
    deptId: 1,
    deptName: "部门1",
  },
  {
    deptId: 2,
    deptName: "部门2",
  },
  {
    deptId: 3,
    deptName: "部门3",
  },
  {
    deptId: 4,
    deptName: "部门4",
  },
]);

</script>

<style lang="scss" scoped>
</style>