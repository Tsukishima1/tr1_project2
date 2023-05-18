<template>
    <div class="container">
        <div class="header">
            <span class="circle"></span>
            <h3>✨Welcome✨</h3>
            <h2 class="username">{{ username }}</h2>
        </div>
        <div class="divider"></div>
    </div>
</template>

<script setup lang="ts">
    const username = sessionStorage.getItem("username");
</script>

<style scoped src="@/assets/style/myheader.css"></style>
