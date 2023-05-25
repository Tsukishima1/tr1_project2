<template>
    <div class="container">
        <div class="header">
            <span class="circle"></span>
            <h3>✨Welcome✨</h3>
            <h2 class="username">{{ username }}</h2>
        </div>
        <el-select
            v-model="value"
            class="m-2 selector"
            placeholder="MORE"
            size="large"
            @change="handleChange"
        >
            <el-option
                v-for="(option, index) in displayOptions"
                :key="index"
                :label="option.label"
                :value="option.value"
                @click="click"
            />
        </el-select>
        <el-drawer class="notice-drawer" v-model="visible" :show-close="false" direction="ttb" size=250>
            <template #header="{ close }">
                <h3>
                    Notice
                </h3>
                <el-button type="danger" @click="close">
                    <el-icon class="el-icon--left"
                        ><CircleCloseFilled
                    /></el-icon>
                    Close
                </el-button>
            </template>
            <ul>
                <li>{{ adminStore.notices[0].content }}</li>
            </ul>
        </el-drawer>
        <div class="divider"></div>
    </div>
</template>

<script setup lang="ts">
    import { CircleCloseFilled } from "@element-plus/icons-vue";
    import { useAdminStore } from "@/stores/adminStore";
    const router = useRouter();
    const route = useRoute();
    const adminStore = useAdminStore();
    const username = sessionStorage.getItem("username");
    const value = ref<string>("");
    const visible = ref<boolean>(false);

    interface Option {
        value: string;
        label: string;
    }
    const options = reactive<Option[]>([
        {
            value: "notice",
            label: "notice",
        },
        {
            value: "admin",
            label: "admin",
        },
        {
            value: "hall",
            label: "hall",
        },
        {
            value: "logout",
            label: "logout",
        },
    ]);

    const displayOptions = computed(() => {
        if (username === "admin") {
            return options;
        } else
            return options.filter(
                (option) => option.value !== "admin" && option.value !== "hall"
            );
    });

    const click = () => {
        value.value = "";
    };
    const logout = () => {
        console.log("logout!");
        ElMessageBox.confirm(
            `You will be logged out of your current account: ${username}. Continue?`,
            "Warning",
            {
                confirmButtonText: "Yeah!",
                cancelButtonText: "Wait a minute",
                type: "warning",
            }
        )
            .then(() => {
                ElMessage({
                    type: "success",
                    message: "successfully logged out!",
                });
                sessionStorage.setItem("token", "");
                router.push({ name: "loginpage" });
            })
            .catch(() => {
                ElMessage({
                    type: "info",
                    message: "logout canceled",
                });
            });
    };

    const handleChange = (value: string) => {
        if (value === "logout") logout();
        else if (value === "admin") {
            if (route.name === "admin") {
                ElMessage("You are already in the admin page!");
            } else router.push({ name: "admin" });
        } else if (value === "hall") {
            if (route.name === "hall") {
                ElMessage("You are already in the hall page!");
            } else router.replace({ name: "hall" });
        } else {
            adminStore.getNotice();
            visible.value = true;
        }
    };

    onMounted(() => {
        adminStore.getNotice();
    })
</script>

<style scoped src="@/assets/style/myheader.css"></style>
