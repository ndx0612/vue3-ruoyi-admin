<template>
  <span @click.stop="toggleDark()">暗黑模式</span>
  <el-switch size="small" v-model="isDark" />
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>