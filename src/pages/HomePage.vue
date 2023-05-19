<template>
    <div class="container">
        <MyHeader />
        <HallPassage />
        <MyFooter />
        <el-backtop :right="40" :bottom="40" />
    </div>
</template>

<script setup lang="ts"></script>

<style>
    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>
