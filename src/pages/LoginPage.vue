<template>
    <div class="box">
    <div class="inputbox">
        <div class="username">
        <p class="animate__animated" :class="{ 'slideInLeft': isFocused1 }">username✨</p>
        <el-input @focus="onFocus1" @blur="onBlur1" v-model="username" placeholder="input something.." id="username" />
        </div>
        <div class="password">
        <p class="animate__animated" :class="{ 'slideInLeft': isFocused2 }">password✨</p>
        <el-input ref="passwordipt" @focus="onFocus2" @blur="onBlur2" type="password" show-password v-model="password" placeholder="input something.." id="password"/>
        </div>
        <div class="button" v-if="!toRegis">
            <button class="login" @click="login">LOG IN</button>
            <el-divider/>
            <a class="register" @click="toRegis=true">No account? Register!👈</a>
        </div>
        <div class="button" v-if="toRegis">
            <button class="regis" @click="register">REGISTER</button>
            <el-divider/>
            <a class="register" @click="toRegis=false">Already? Log in!👈</a>
        </div>        
        </div>
    </div>
    <br>
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
                ElMessage.error('Please fill in the complete information!');
                return;
            }
            let res = await userRegister(data);
            console.log(res);
            if (res.data==='isOk') {
                ElMessage({
                    message:'successfully registered!',
                    type:'success',
                }),
                toRegis.value=false;
            }
            else {
                ElMessage.error('This account already exists!');
            }
        } catch (error) {
            console.error(error);
        }
    }
    // 处理登录
    const login = async ():Promise<void> => {
        try {
            if(data.password==""&&data.username=="") {
                ElMessage.error('Please fill in the complete information!');
                return;
            }
            let res = await userLogin(data);
            if (res.data.code===200) {
                ElMessage({
                    type: 'success',
                    message: 'successfully logged in!'
                })
                sessionStorage.setItem('username', data.username);
                sessionStorage.setItem('userID', res.data.data.userID);
                storeToken.setToken(res.data.data.token);
                router.replace({name: 'home'});
            }
            else {
                let msg = res.data.data;
                if (msg==='Bad credentials') {
                    msg='Wrong answer!';
                    data.password="";
                    onFocus2();
                    passwordipt.value?.focus();
                }
                ElMessage.error('Login failed: '+msg);
            }
        } catch (error) {
            console.error(error);
        }
    }
</script>
    
<style scoped src="@/assets/style/login.css">
</style>