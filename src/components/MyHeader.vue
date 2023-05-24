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
            />
        </el-select>
        <div class="divider"></div>
    </div>
</template>

<script setup lang="ts">
    const router = useRouter();
    const username = sessionStorage.getItem("username");
    const value = ref<string>("");
    interface Option {
        value: string;
        label: string;
    }
    const options = reactive<Option[]>([
        {
            value: "admin",
            label: "admin",
        },
        {
            value: "logout",
            label: "logout",
        },
    ]);

    const displayOptions = computed(() => {
        if (username === "admin") {
            return options;
        } else return options.filter((option) => option.value !== "admin");
    });

    const logout = () => {
        value.value = "";
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

    const handleChange = (value:string)=> {
        if (value==="logout") logout();
    }
</script>

<style scoped src="@/assets/style/myheader.css"></style>
