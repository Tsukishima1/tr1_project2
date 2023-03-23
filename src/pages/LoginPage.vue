<template>
    <label for="username">用户名</label>
    <el-input v-model="username" placeholder="请输入用户名" id="username" />
    <label for="password">密码</label>
    <el-input type="password" show-password v-model="password" placeholder="请输入密码" id="password"/>
    <br> <br>
    <button class="login" @click="login">登录</button>
    <button class="register" @click="register">注册</button><br><br>
    <button @click="toHomePage()">切换到homepage</button>
</template>
    
<script setup lang='ts'>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router';
    import { userRegister,userLogin } from '../http/api/user';
    const router = useRouter();

    function toHomePage() {
        router.push({name: 'homepage'});
    }

    const username = ref('');
    const password = ref('');

    const register = async ()=> {
        try {
            let res = await userRegister(password.value,username.value);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }
    const login = async ()=> {
        try {
            let res = await userLogin(password.value,username.value);
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    }
</script>
    
<style scoped>
    .login {
        margin-right: 10px;
    }
</style>