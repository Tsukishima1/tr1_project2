<template>
    <div class="user-container">
        <h3 style="margin-bottom: 1rem;">Query UserInfo</h3>
        <div class="ipt">
            <el-input v-model="iptusername" placeholder="input the username" />
            <el-button style="width: 10rem;" @click="queryUser(iptusername)" :disabled="isDisabled"
                >Search</el-button
            >
        </div>
        <div class="res" v-if="adminStore.queryUserData">
            <ul>
                <li>
                    <p>userId</p>
                    {{ adminStore.queryUserData?.userId }}
                </li>
                <li>
                    <p>username</p>
                    {{ adminStore.queryUserData?.username }}
                </li>
                <li>
                    <p>password</p>
                    {{ adminStore.queryUserData?.password }}
                </li>
            </ul>
        </div>
        <el-divider></el-divider>
        <h3 style="margin-bottom: 1rem;">All User</h3>
        <el-table
            :data="adminStore.tableData"
            stripe
            style="width: 100%;"
            border
        >
            <el-table-column prop="userId" label="userId" />
            <el-table-column prop="username" label="username" />
            <el-table-column prop="password" label="password" />
        </el-table>
        <el-pagination
            class="pagination"
            style="margin: 0.5rem 0;"
            layout="prev, pager, next"
            v-model:current-page="currentPage"
            :page-count="adminStore.userInfoPageCount ?? 0"
        />
    </div>
</template>

<script setup lang="ts">
    import { useAdminStore } from "@/stores/adminStore";
    const adminStore = useAdminStore();
    const currentPage = ref<number>(1);
    const iptusername = ref<string>("");
    const isDisabled = ref<boolean>(true);

    onMounted(() => {
        adminStore.queryAllUser("1", "10");
    });

    watch(currentPage, () => {
        adminStore.queryAllUser(currentPage.value.toString(), "10");
    });
    watch(iptusername, () => {
        if (iptusername.value) {
            isDisabled.value = false;
        }
        else isDisabled.value = true;
    })

    const queryUser = (name: string) => {
        adminStore.queryUserInfoByName(name);
        iptusername.value = "";
    };

    onUnmounted(()=> {
        adminStore.queryUserData=undefined;
    })
</script>

<style lang="less" scoped>
    .user-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        .ipt {
            display: flex;
            width: 100%;
            gap: 1rem;
            justify-content: center;
            align-items: center;
        }
        .res {
            margin-top: 1rem;
            width: 100%;
            ul {
                background-color: rgb(251, 251, 251);
                width: 100%;
                display: flex;
                li {
                    padding: 0.5rem;
                    flex-grow: 1;
                    p {
                        padding-bottom: 0.3rem;
                        margin-bottom: 0.3rem;
                        color: grey;
                        border-bottom: 1px solid rgb(194, 194, 194);
                    }
                }
            }
        }
    }
    ::v-deep .el-pagination {
        .el-pager li {
            background-color: transparent;
        }
        button {
            background-color: transparent;
        }
    }
</style>
