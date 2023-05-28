<template>
    <el-row :gutter="0" style="width: 100%;" justify="center">
        <el-col :xs="20" :sm="20" class="container">
            <el-page-header class="page-header" @click="goBack">
            </el-page-header>
            <div class="passage">
                <p class="title">{{ passageViewStore.passageItem.title }}</p>
                <p class="time">{{ passageViewStore.passageItem.time }}</p>
                <p v-if="passageViewStore.dataLoaded" class="content">
                    {{ passageViewStore.passageItem.content }}
                </p>
                <p v-else>Loading...</p>
            </div>
            <!-- :src="'data:image/png;base64,' + item" -->
            <div class="img">
                <div v-for="(item, index) in passageViewStore.pics">
                    <img
                        :key="index"
                        :src="'data:image/png;base64,' + item"
                        alt=""
                    >
                    <el-button class="imgbtn" size="small" circle @click="deleteImg"><el-icon><CloseBold /></el-icon></el-button>
                </div>
                <div
                    class="upload-container"
                    v-if="isAdmin() && passageViewStore.dataLoaded"
                >
                    <el-upload
                        action="/passage"
                        class="upload-demo"
                        drag
                        style="margin-top: 1rem;"
                        :on-change="handleChangeImg"
                        :auto-upload="false"
                    >
                        <el-icon><Plus /></el-icon>
                    </el-upload>
                </div>
            </div>
            <el-divider
                v-if="
                    (docs.length || pics.length || isAdmin()) &&
                    passageViewStore.dataLoaded
                "
            />
            <div class="resources" v-if="passageViewStore.dataLoaded">
                <p class="type" v-if="docs.length || isAdmin()">📎</p>
                <ul class="items">
                    <li
                        @click="download(doc.address)"
                        class="item"
                        v-for="(doc, index) in docs"
                        :key="index"
                    >
                        <el-icon :size="20" class="icon"><Document /></el-icon>
                        {{ doc.name }}
                    </li>
                </ul>
                <div
                    class="upload-container"
                    v-if="isAdmin() && passageViewStore.dataLoaded"
                >
                    <el-upload
                        action="/passage"
                        class="upload-demo"
                        drag
                        style="margin-top: 1rem;"
                        :on-change="handleChange"
                        :auto-upload="false"
                    >
                        <el-icon><Plus /></el-icon>
                    </el-upload>
                </div>
            </div>
            <!-- <el-icon><Document /></el-icon> -->
            <el-divider />
            <div class="comment">
                <h3 class="header">Comment</h3>
                <div class="input">
                    <el-input
                        class="textarea"
                        v-model="textarea"
                        :rows="4"
                        type="textarea"
                        placeholder="Please input your content"
                        maxlength="100"
                        show-word-limit
                        resize="none"
                    />
                    <el-button
                        class="sendbtn"
                        @click="passageViewStore.comment(route.params.id)"
                        :disabled="isDisabled"
                        >comment</el-button
                    >
                </div>
                <el-divider />
                <ul class="list">
                    <li
                        class="item"
                        v-for="(item, index) in items"
                        :key="index"
                        v-if="passageViewStore.commentLoaded"
                        :class="{
                            admincomment:
                                item.username === 'admin' ? true : false,
                        }"
                    >
                        <div class="circle"></div>
                        <p class="username">{{ item.username }}:</p>
                        <p class="content">{{ item.content }}</p>
                        <p class="time">{{ item.time }}</p>
                    </li>
                    <li v-else style="text-align: center;">Loading...</li>
                    <li
                        v-if="
                            items.length === 0 && passageViewStore.commentLoaded
                        "
                        style="text-align: center;"
                    >
                        Nothing Here!
                    </li>
                </ul>
                <el-pagination
                    class="pagination"
                    layout="prev, pager, next"
                    :pageCount="pageCount ?? 0"
                    v-model:current-page="currentPage"
                    hide-on-single-page
                />
            </div>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
    import { Document, Plus, CloseBold } from "@element-plus/icons-vue";
    import { usePassageViewStore } from "@/stores/index";
    import { uploadResources, adminUploadImg } from '@/http/api/admin';
    const route = useRoute();
    const router = useRouter();
    const passageViewStore = usePassageViewStore();
    const pics = toRefs(passageViewStore).pics;
    const docs = toRefs(passageViewStore).docs;

    onMounted(() => {
        passageViewStore.getPassage(route.params.id);
        passageViewStore.getComments(route.params.id);
    });
    onUnmounted(() => {
        passageViewStore.dataLoaded = false;
        passageViewStore.passageItem = {
            content: "",
            title: "",
            time: "",
            id: Number(""),
        };
        passageViewStore.docs = [];
        passageViewStore.pics = [];
        passageViewStore.items = [];
        passageViewStore.currentPage = 1;
        passageViewStore.commentLoaded = false;
        passageViewStore.pageCount = 0;
        passageViewStore.textarea = "";
        document.title = "blog-like-site";
    });

    const goBack = () => {
        router.back();
    };
    // 直接cv有点冗杂
    let textarea = toRefs(passageViewStore).textarea;
    let isDisabled = ref<boolean>(true);

    let items = toRefs(passageViewStore).items;
    let pageCount = toRefs(passageViewStore).pageCount;
    let currentPage = toRefs(passageViewStore).currentPage;

    const download = (address: string) => {
        ElMessage("Downloading...");
        passageViewStore.download(address);
    };
    const isAdmin = (): boolean => {
        if (sessionStorage.getItem("username") === "admin") {
            return true;
        } else return false;
    };

    watch(currentPage, (newVal) => {
        passageViewStore.commentLoaded = false;
        passageViewStore.getComments(route.params.id);
    });
    watch(textarea, (newVal) => {
        if (textarea.value != "") {
            isDisabled.value = false;
        } else {
            isDisabled.value = true;
        }
    });

    const handleChange = async (file: any): Promise<void> => {
        const { data } = await uploadResources({
            file: file.raw,
            passageID: route.params.id.toString(),
        });
        passageViewStore.getPassage(route.params.id);
    };
    const handleChangeImg = async (file: any): Promise<void> => {
        const { data } = await adminUploadImg({
            file: file.raw,
            passageID: route.params.id.toString(),
        });
        passageViewStore.getPassage(route.params.id);
    };
</script>

<style scoped src="@/assets/style/passageview.css"></style>
