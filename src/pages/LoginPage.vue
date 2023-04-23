<template>
    <div class="box">
    <div class="inputbox">
        <div class="username">
        <p class="animate__animated" :class="{ 'slideInLeft': isFocused1 }">用户名✨</p>
        <el-input @focus="onFocus1" @blur="onBlur1" v-model="username" placeholder="请输入用户名" id="username" />
        </div>
        <div class="password">
        <p class="animate__animated" :class="{ 'slideInLeft': isFocused2 }">密码✨</p>
        <el-input ref="passwordipt" @focus="onFocus2" @blur="onBlur2" type="password" show-password v-model="password" placeholder="请输入密码" id="password"/>
        </div>
        <div class="button" v-if="!toRegis">
            <button class="login" @click="login">确认登录</button>
            <el-divider/>
            <a class="register" @click="toRegis=true">未有账号?点此注册👈</a>
        </div>
        <div class="button" v-if="toRegis">
            <button class="regis" @click="register">点击注册</button>
            <el-divider/>
            <a class="register" @click="toRegis=false">已有账号?点此登录👈</a>
        </div>        
        </div>
    </div>
    <br>
    <!-- <button class="register" @click="register">注册</button><br><br> -->
    <!-- <button @click="toHomePage()">切换到homepage</button> -->
</template>
    
<script setup lang='ts'>
    import { useRouter } from 'vue-router';
    import { userRegister,userLogin } from '@/http/api/user';
    import { useStoreToken } from "@/stores/index";

    const router = useRouter();
    const storeToken = useStoreToken();

    const isFocused1 = ref<boolean>(false);
    const isFocused2 = ref<boolean>(false);
    const toRegis = ref<boolean>(false);

    const onFocus1 = () => {
        isFocused1.value = true;
    }
    const onBlur1 = () => {
        isFocused1.value = false;
    }

    const onFocus2 = () => {
        isFocused2.value = true;
    }
    const onBlur2 = () => {
        isFocused2.value = false;
    }

    const passwordipt:Ref<HTMLInputElement|null> = ref(null);
    const username = ref<string>('');
    const password = ref<string>('');
    const data = reactive({
        password, username
    })

    // 处理注册
    const register = async ():Promise<void> => {
        try {
            if(data.password==""&&data.username=="") {
                ElMessage.error('请填写完整用户名和密码！');
                return;
            }
            let res = await userRegister(data);
            console.log(res);
            if (res.data==='isOk') {
                ElMessage({
                    message:'注册成功，请重新登录！',
                    type:'success',
                }),
                toRegis.value=false;
            }
            else {
                ElMessage.error('该账号已存在，无法注册');
            }
        } catch (error) {
            console.error(error);
        }
    }
    // 处理登录
    const login = async ():Promise<void> => {
        try {
            if(data.password==""&&data.username=="") {
                ElMessage.error('请填写完整用户名和密码！');
                return;
            }
            let res = await userLogin(data);
            if (res.data.code===200) {
                ElMessage({
                    type: 'success',
                    message: '登录成功！'
                })
                sessionStorage.setItem('username', data.username);
                storeToken.setToken(res.data.data.token);
                router.replace({name: 'homepage'});
            }
            else {
                let msg = res.data.data;
                if (msg==='Bad credentials') {
                    msg='密码错误';
                    data.password="";
                    onFocus2();
                    passwordipt.value?.focus();
                }
                ElMessage.error('登录失败：'+msg);
            }
        } catch (error) {
            console.error(error);
        }
    }
</script>
    
<style scoped src="@/assets/style/login.css">
</style>