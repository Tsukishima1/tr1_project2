<template>
    <h2>这是homepage</h2>
    <h4>{{counterStore.count}}</h4>
    <h4>{{counterStore.countmore}}</h4>
    <button @click="counterStore.reset" style="margin-right: 15px;">刷新数据</button>
    <button @click="counterStore.increment">点击+1</button> <br>
    <button @click="toLoginPage()" style="margin-top: 20px;">点击切换到loginpage</button>
    <el-button :plain='true' @click="open4">error</el-button>
</template>
    
<script setup lang='ts'>
    import { useRouter } from "vue-router";
    import { useCounterStore } from '@/stores/index';
    const router = useRouter();
    function toLoginPage() {
        router.push({name:"loginpage"});
    }
    const counterStore = useCounterStore();
    const open4 = () => {
      ElMessage({
        showClose: true,
        message: 'Oops, this is a error message.',
        type: 'error',
      })
    }

</script>
    
<style>
    
</style>