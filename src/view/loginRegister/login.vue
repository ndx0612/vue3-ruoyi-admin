<template>
  <div class="login-bg">
    <div class="w-[420px] bg-[#eee] rounded-[8px] p-[24px] opacity-[0.95]">
      <div class="w-full text-center text-[24px]">若依后台管理系统</div>
      <el-form :model="form" class="mt-[40px]" ref="ruleFormRef" :rules="rules">
        <el-form-item prop="loginName">
          <el-input v-model="form.loginName" class="h-[44px]" placeholder="账号">
            <template #prefix>
              <img class=" flex items-center w-[24px] h-[24px] " src="@/assets/icon_user.png" alt="">
              <div class=" w-[1px] h-[26px] bg-slate-200 ml-[7px] mt-[2px]"></div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="mt-[20px]" prop="password">
          <el-input v-model="form.password" class="h-[44px]" placeholder="密码" show-password type="password">
            <template #prefix>
              <img class=" flex items-center w-[24px] h-[24px] " src="@/assets/icon_code.png" alt="">
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
import { setStorage, getStorage } from "@/utils/storage";
import md5 from "js-md5";
import axios from "axios";

let router = useRouter();
const { proxy } = getCurrentInstance();
const { query } = router.currentRoute.value;
onMounted(() => {
  const LS_login = getStorage("login");
  form.loginName = LS_login?.loginName;
  form.password = LS_login?.password;
  form.saveInfo = LS_login?.saveInfo;
});

// 登录表单
const form = reactive({
  loginName: "", // 账号
  password: "", // 密码
  saveInfo: true, // 记住密码
});

// 绑定表单ref
const ruleFormRef = ref();

// 登录错误状态码
const loginErrcode = ref(0);

/**
 * @description: 密码验证提示
 */
const validatePass = (rule, value, callback) => {
  if (value === "" || !value) {
    callback(new Error("请输入密码"));
  } else if (loginErrcode.value == 110001 || loginErrcode.value == 110004) {
    callback(new Error("用户名或密码错误"));
  } else {
    callback();
  }
  loginErrcode.value = 0;
};

// 登录验证
const rules = reactive({
  loginName: [
    {
      required: true,
      message: "请输入用户名",
      trigger: ["blur", "change"],
    },
  ],
  password: [
    {
      required: true,
      trigger: ["blur", "change"],
      validator: validatePass,
    },
  ],
});

/**
 * @description: 点击登录
 */
const login = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      axios
        .post(
          "https://mockapi.eolink.com/RWG4jKY7a8d3c66906979840d6feb92494bd48bd8452ec4/login/login",
          {
            userName: form.loginName,
            password: md5(form.password),
          }
        )
        .then((res) => {
          if (res.errCode == 0) {
            if (form.saveInfo) {
              setStorage("login", {
                loginName: form.loginName,
                password: form.password,
                saveInfo: form.saveInfo,
              });
            } else {
              setStorage("login", {
                saveInfo: form.saveInfo,
              });
            }
            router.push({
              name: "home",
            });
          } else {
            loginErrcode.value = 110001;
            // loginErrcode.value = res.errCode;
            ruleFormRef.value.validateField("password", () => null);
          }
        });
    } else {
      return false;
    }
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
