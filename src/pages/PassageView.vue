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
            <el-divider v-if="docs.length || pics.length" />
            <div class="resources">
                <p class="type" v-if="docs.length">📄 docs 👇</p>
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
                <p class="type" v-if="pics.length">📸 pics 👇</p>
                <ul class="items">
                    <li
                        @click="download(pic.address)"
                        class="item"
                        v-for="(pic, index) in pics"
                        :key="index"
                    >
                        <el-icon :size="20" class="icon"><Picture /></el-icon>
                        {{ pic.name }}
                    </li>
                </ul>
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
                    >
                        <div class="circle"></div>
                        <p class="username">{{ item.username }}:</p>
                        <p class="content">{{ item.content }}</p>
                        <p class="time">{{ item.time }}</p>
                    </li>
                    <li v-else style="text-align: center;">Loading...</li>
                    <li
                        v-if="items.length === 0 && passageViewStore.commentLoaded"
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
    import { Document, Picture } from "@element-plus/icons-vue";
    import { usePassageViewStore } from "@/stores/index";
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

    const download = (address:string)=> {
        ElMessage("Downloading...");
        passageViewStore.download(address);
    }

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
</script>
<style scoped src="@/assets/style/passageview.css"></style>
