<template>
  <div class="w-full h-full  p-[20px]">
    <!-- header -->
    <div class="w-full h-[40px] flex items-center">
      <slot name="header"></slot>
    </div>
    <!-- table -->
    <div class="w-full" style="height: calc(100% - 40px - 56px);">
      <el-table :data="tableData" border style="width: 100%" height="100%" v-loading="loading">
        <slot name="table"></slot>
      </el-table>
    </div>
    <!-- bottom -->
    <div class="w-full h-[56px] pt-[20px] flex flex-row-reverse">
      <el-pagination v-model:currentPage="page.currentPage" v-model:page-size="page.pageSize" :page-sizes="[10, 20, 30, 40, 50]" layout="total, sizes, prev, pager, next, jumper" :total="page.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, watch } from "vue";
const { proxy } = getCurrentInstance();

defineOptions({ name: "GlobalTable" });

onMounted(() => {
  getTable();
});
const props = defineProps({
  // 请求url
  resUrl: {
    type: String,
    required: true,
  },
  // 请求参数
  parameter: {
    type: Object,
    required: false,
  },
});

const loading = ref(false);

const page = reactive({
  currentPage: 1, // 当前页面
  pageSize: 20, // 每一页数量
  total: 146, // 总数
});

const tableData = ref([]);

const handleSizeChange = (val) => {
  getTable();
};
const handleCurrentChange = (val) => {
  getTable();
};

const getTable = () => {
  loading.value = true;
  proxy.$axios
    .post(props.resUrl, {
      pageNum: page.currentPage,
      pageSize: page.pageSize,
      ...props.parameter,
    })
    .then((res) => {
      if (res.errCode == 0) {
        console.log(res);
        tableData.value = res.data.records;
        page.total = res.data.total;
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

defineExpose({
  getTable,
});
</script>
