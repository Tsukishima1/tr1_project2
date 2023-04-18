<template>
    <h1>你好!!</h1>
    <h2>嘿嘿!!</h2>
    <h3>这好像是专属得样式!!好酷噢</h3>
    <button @click="router.replace({name: 'loginpage'})" style="margin-top: 20px;">点击切换到loginpage</button>
</template>
  
<script setup lang='ts'>
    import { useRouter } from 'vue-router';
    const router = useRouter();
</script>
  
<style>
  
</style>