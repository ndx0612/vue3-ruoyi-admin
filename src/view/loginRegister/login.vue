<template>
  <div class="w-[100%] h-[100%] bg-[rgb(9,30,70)] flex items-center justify-center">
    <div class="login-box">
      <div class="text-[28px]">健康管理后台登录</div>
      <div class="mt-[50px]">
        <el-form :model="data.form">
          <el-form-item>
            <el-input v-model="data.form.loginName" class="h-[44px]" placeholder="账号">
              <template #prefix>
                <div class="w-[100%] h-[100%] pt-[10px]">
                  <img class=" flex justify-center items-center w-[24px] h-[24px] " src="@/assets/icon_user.png" alt="">
                </div>
                <div class=" w-[1px] h-[26px] bg-slate-200 ml-[7px] mt-[2px]"></div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="mt-[40px]">
            <el-input v-model="data.form.password" class="h-[44px]" placeholder="请输入密码" show-password type="password">
              <template #prefix>
                <div class="w-[100%] h-[100%] pt-[10px]">
                  <img class=" flex justify-center items-center w-[24px] h-[24px] " src="@/assets/icon_code.png" alt="">
                </div>
                <div class=" w-[1px] h-[26px] bg-slate-200 ml-[7px] mt-[2px]"></div>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="flex items-center justify-between mt-[40px]">
        <el-checkbox v-model="data.saveInfo" label="记住账号密码" />
        <el-link type="primary">忘记密码</el-link>
      </div>
      <div class="flex justify-center mt-[45px]">
        <el-button class="w-[100%] h-[44px]" type="primary" @click="methods.login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
let router = useRouter();
onMounted(() => { });

const data = reactive({
  form: {
    loginName: "sys_admin", // 账号
    password: "123456", // 密码
  },
  saveInfo: true, // 记住密码
});

const methods = reactive({
  // 点击登录
  login() {
    // proxy.$axios
    //   .post("/login/passwordLogin", {
    //     loginName: data.form.loginName,
    //     password: data.form.password,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    router.push({
      name: "cluesManage",
    });
  },
});
</script>

<style lang='scss'>
.login-box {
  width: 500px;
  height: 550px;
  border-radius: 5px;
  padding: 90px 80px;
}
</style>