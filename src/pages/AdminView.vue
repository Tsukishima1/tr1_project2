<template>
    <el-row class="container" style="width: 100%;" justify="center">
        <el-col class="nav" :xs="7" :sm="6" :md="5" :lg="4" :xl="4"
            ><div class="grid-content ep-bg-purple leftnav hidden-xs-only">
                <ul>
                    <li @click="updatenotice">Update Notice</li>
                </ul>
            </div>
        </el-col>
        <el-col :xs="15" :sm="16" :md="17" :lg="16" :xl="15">
            <div class="grid-content main" style="padding: 20px;">
                <router-view></router-view>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    const router = useRouter();
    const updatenotice = ()=> {
        router.push({name:"updateNotice"});
    }
</script>

<style src="@/assets/style/adminview.css" scoped>
</style>
