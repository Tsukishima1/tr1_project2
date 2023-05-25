<template>
    <div class="input">
        <el-input
            class="textarea"
            v-model="textarea"
            :rows="4"
            type="textarea"
            placeholder="Please input new notice"
            maxlength="100"
            show-word-limit
            resize="none"
        />
        <el-button class="sendbtn" :disabled="isDisabled" @click="update"
            >update</el-button
        >
        <el-divider></el-divider>
        <h2 style="color: grey;">Current Notice</h2>
        {{ adminStore.notices[0]?.content }}
    </div>
</template>

<script setup lang="ts">
    import { useAdminStore } from "@/stores/adminStore";
    const adminStore = useAdminStore();

    const textarea = ref<string>("");
    const isDisabled = ref<boolean>(true);
    const update = () => {
        adminStore.updateNotice(textarea.value);
        textarea.value = "";
        ElMessage({
            type: "success",
            message: "successfully updated!",
        });
    };
    watch(textarea, () => {
        if (textarea.value !== "") {
            isDisabled.value = false;
        } else isDisabled.value = true;
    });
</script>

<style scoped lang="less">
    .input {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        .sendbtn {
            width: 100%;
        }
    }
</style>
