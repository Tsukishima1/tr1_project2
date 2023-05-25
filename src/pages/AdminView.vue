<template>
    <el-row class="container" style="width: 100%;" justify="center">
        <el-col class="nav" :xs="7" :sm="6" :md="5" :lg="4" :xl="4"
            ><div class="grid-content ep-bg-purple leftnav hidden-xs-only">
                <ul>
                    <li @click="router.push({name:'updateNotice'})">Update Notice</li>
                    <li @click="router.push({name:'userInfo'})">User Info</li>
                </ul>
            </div>
        </el-col>
        <el-col :xs="15" :sm="16" :md="17" :lg="16" :xl="15">
            <div class="grid-content main" style="padding: 20px;">
                <div v-if="route?.name==='admin'">
                    <h2>✨ Welcome to the admin page!</h2><br>
                    <h4>💦 Do some admin-only crud operations here</h4>
                    <h4>👈 You can refer to the left nav to perform the operation you want</h4>
                    <h4>❤️‍🔥 Wish you happyyy !</h4>
                </div>
                <router-view></router-view>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    const router = useRouter();
    const route = useRoute();
</script>

<style src="@/assets/style/adminview.css" scoped>
</style>
