<template>
    <div class="box">
    <div class="inputbox">
        <div class="username">
        <p for="username" class="animate__animated" :class="{ 'slideInLeft': isFocused1 }">用户名✨</p>
        <el-input @focus="onFocus1" @blur="onBlur1" v-model="username" placeholder="请输入用户名" id="username" />
        </div>
        <div class="password">
        <p for="password" class="animate__animated" :class="{ 'slideInLeft': isFocused2 }">密码✨</p>
        <el-input @focus="onFocus2" @blur="onBlur2" type="password" show-password v-model="password" placeholder="请输入密码" id="password"/>
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
    import { ref,reactive } from 'vue'
    import { useRouter } from 'vue-router';
    import { userRegister,userLogin } from '@/http/api/user';
    import { useStoreToken } from "@/stores/index";

    const router = useRouter();
    const storeToken = useStoreToken();

    const isFocused1:boolean = ref(false);
    const isFocused2:boolean = ref(false);
    const toRegis:boolean = ref(false);

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

    const username = ref('');
    const password = ref('');
    const data = reactive({
        password, username
    })

    // 处理注册
    const register = async ()=> {
        try {
            if(password.value==""&&username.value=="") {
                ElMessage.error('请填写完整用户名和密码！');
                return;
            }
            let res = await userRegister(password.value,username.value);
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
    const login = async ()=> {
        try {
            if(password.value==""&&username.value=="") {
                ElMessage.error('请填写完整用户名和密码！');
                return;
            }
            let res = await userLogin(data);
            if (res.data.code===200) {
                ElMessage({
                    type: 'success',
                    message: '登录成功！'
                })
                storeToken.setToken(res.data.data.token);
                router.replace({name: 'homepage'});
            }
            else {
                let msg = res.data.data;
                if (msg==='Bad credentials') {
                    msg='密码错误';
                    password.value="";
                }
                ElMessage.error('登录失败：'+msg);
            }
        } catch (error) {
            console.error(error);
        }
    }
</script>
    
<style scope src="@/assets/style/login.css">
</style>