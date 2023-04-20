<template>
    <el-row :gutter="20" style="width: 100%;" justify="center">
        <el-col :sm="5" :md="5" :lg="5" :xl="5"
            ><div class="grid-content ep-bg-purple leftnav hidden-xs-only">111</div>
            </el-col
        >
        <el-col :xs="20" :sm="12" :md="12" :lg="12" :xl="12"
            ><div class="grid-content ep-bg-purple-light main">222</div>
            <div class="grid-content ep-bg-purple-light comment">222</div></el-col
        >
        <el-col :sm="5" :md="5" :lg="5" :xl="5"
            ><div class="grid-content ep-bg-purple-light hidden-xs-only">
                333
            </div></el-col
        >
    </el-row>
</template>

<script setup lang="ts">
    import "element-plus/theme-chalk/display.css";
    const value1 = ref(true);
</script>

<style lang="css" scoped src="@/assets/style/hallpassage.css">
</style>
