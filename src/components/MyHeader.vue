<template>
    <div class="header">
        <div class="left">
            <el-avatar class="avatar" :icon="UserFilled" :size="35"></el-avatar>
            <span>{{username}}</span>
        </div>
        <div class="right">
            <button @click="backtologin()">退出登录</button>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
    import { useRouter } from 'vue-router';
    import { UserFilled } from '@element-plus/icons-vue'
    const username = sessionStorage.getItem('username');
    const router = useRouter();

    function backtologin() {
        ElMessageBox.confirm(
            '嘿！你确定要退出当前帐号吗？🤔',
            '确认信息',
            {
                confirmButtonText: '确认退出！',
                cancelButtonText: '再等等',
                type: 'warning',
            }
        ).then(()=>{
            ElMessage({
                type: 'success',
                message: '登出成功！',
            });
            router.replace('/');
        }).catch(()=>{
            ElMessage({
                type: 'info',
                message: '已取消登出',
            })
        })
    }
</script>
    
<style scoped src="@/assets/style/myheader.css">
</style>