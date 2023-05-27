<template>
    <div class="upload-container">
        <el-upload
            action="/passage"
            class="upload-demo"
            drag
            style="margin-top: 1rem;"
            :http-request="upload"
            :on-change="handleChange"
            :auto-upload="false"
        >
            <el-icon ><Plus /></el-icon>
        </el-upload>
    </div>
</template>

<script setup lang="ts">
    import { Plus } from "@element-plus/icons-vue";
    import { uploadResources } from "@/http/api/admin";
    import { usePassageViewStore } from "@/stores/index";
    const passageViewStore = usePassageViewStore();
    const route = useRoute();
    const upload = () => {
        console.log("文件上传！");
    };
    const handleChange = async (file: any): Promise<void> => {
        const { data } = await uploadResources({
            file: file.raw,
            passageID: route.params.id.toString(),
        });
        console.log(data);
        passageViewStore.getPassage(route.params.id);
    };
</script>

<style>
    .el-upload-dragger {
        padding: 1rem;
        background-color: rgb(252, 252, 252);
    }
    .upload-container {
        display: flex;
        flex-direction: column;
    }
</style>
