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
        <div class="button">
            <button class="login" @click="login">确认登录</button>
            <el-divider/>
            <a class="register">新用户点此注册👈</a>
        </div>
        </div>
    </div>
    <br>
    <!-- <button class="register" @click="register">注册</button><br><br> -->
    <!-- <button @click="toHomePage()">切换到homepage</button> -->
</template>
    
<script setup lang='ts'>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router';
    import { userRegister,userLogin } from '../http/api/user';
    const router = useRouter();
    const isFocused1 = ref(false);
    const isFocused2 = ref(false);

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
    
<style scope src="../assets/style/login.less" lang="less">
</style>