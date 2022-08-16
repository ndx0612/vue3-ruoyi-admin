<template>
  <div class="login-bg">
    <div class="w-[420px] bg-[#eee] rounded-[8px] p-[24px]">
      <div class="w-full text-center text-[24px]">若依后台管理系统</div>
      <el-form :model="form" class="mt-[40px]" ref="ruleFormRef">
        <el-form-item>
          <el-input v-model="form.loginName" class="h-[44px]" placeholder="账号">
            <template #prefix>
              <div class="w-[100%] h-[100%] pt-[10px]">
                <img class=" flex justify-center items-center w-[24px] h-[24px] " src="@/assets/icon_user.png" alt="">
              </div>
              <div class=" w-[1px] h-[26px] bg-slate-200 ml-[7px] mt-[2px]"></div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="mt-[20px]">
          <el-input v-model="form.password" class="h-[44px]" placeholder="密码" show-password type="password">
            <template #prefix>
              <div class="w-[100%] h-[100%] pt-[10px]">
                <img class=" flex justify-center items-center w-[24px] h-[24px] " src="@/assets/icon_code.png" alt="">
              </div>
              <div class=" w-[1px] h-[26px] bg-slate-200 ml-[7px] mt-[2px]"></div>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="flex items-center justify-between">
        <el-checkbox v-model="form.saveInfo" label="记住账号密码" color="#7780A2" />
        <!-- <el-link type="primary" :underline="false" @click="editPasswordForm=true">忘记密码</el-link> -->
      </div>
      <el-button class="w-full mt-[15px]" type="primary" size="large" @click="login(ruleFormRef)">登录</el-button>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
const { proxy } = getCurrentInstance();
const { query } = router.currentRoute.value;
onMounted(() => {});

// 登录表单
const form = reactive({
  loginName: "admin", // 账号
  password: "123456", // 密码
  saveInfo: true, // 记住密码
});

// 绑定表单ref
const ruleFormRef = ref();



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
.login-bg {
  background-image: url("../../assets/images/login-bg.jpg");
  height: 100%;
  width: 100%;
  background-size: cover;
  // opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
