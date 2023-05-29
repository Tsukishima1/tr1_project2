<template>
    <el-row :gutter="0" style="width: 100%;" justify="center">
        <el-col :xs="20" :sm="20" class="container">
            <div class="btnbox">
                <el-button
                    class="dltpassagebtn"
                    @click="deletePassage"
                    v-if="isAdmin()"
                    >DELETE</el-button
                >
                <el-button @click="isRevise = true" v-if="!isRevise">
                    REVISE
                </el-button>
                <el-button @click="revise" type="success" v-if="isRevise"
                    >OK</el-button
                >
            </div>
            <el-page-header class="page-header" @click="goBack">
            </el-page-header>
            <div class="passage">
                <p class="title" v-if="!isRevise">
                    {{ passageViewStore.passageItem.title }}
                </p>
                <el-input
                    class="titleipt"
                    v-model="titleipt"
                    style="margin-bottom: 0.4rem;"
                    v-else
                ></el-input>
                <p class="time">{{ passageViewStore.passageItem.time }}</p>
                <div v-if="!isRevise">
                    <p v-if="passageViewStore.dataLoaded" class="content">
                        {{ passageViewStore.passageItem.content }}
                    </p>
                    <p v-else>Loading...</p>
                </div>
                <el-input
                    v-else
                    v-model="contentipt"
                    rows="5"
                    type="textarea"
                    placeholder="Please input your content"
                    style="margin-bottom: 1rem;"
                ></el-input>
            </div>
            <!-- :src="'data:image/png;base64,' + item" -->
            <div class="img">
                <div v-for="(item, index) in passageViewStore.pics">
                    <img
                        :key="index"
                        :src="'data:image/png;base64,' + item.address"
                        alt=""
                    />
                    <el-button
                        class="imgbtn"
                        size="small"
                        circle
                        @click="adminStore.deleteImg(item.id)"
                        v-if="isAdmin()"
                        ><el-icon><CloseBold /></el-icon
                    ></el-button>
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
                        :show-file-list="false"
                        :on-change="handleChangeImg"
                        :auto-upload="false"
                    >
                        <el-icon><Upload /></el-icon>
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
                    <li class="item" v-for="(doc, index) in docs" :key="index">
                        <el-icon :size="20" class="icon"><Document /></el-icon>
                        {{ doc.name }}
                        <el-button
                            class="imgbtn"
                            size="small"
                            circle
                            @click="download(doc.address)"
                            style="margin-left: 0.5rem;"
                            ><el-icon><Download /></el-icon
                        ></el-button>
                        <el-button
                            class="imgbtn"
                            size="small"
                            circle
                            @click="adminStore.deleteDoc(doc.id)"
                            v-if="isAdmin()"
                            ><el-icon><CloseBold /></el-icon
                        ></el-button>
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
                        :show-file-list="false"
                    >
                        <el-icon><Upload /></el-icon>
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
                        <div class="commentbox">
                            <div class="circle"></div>
                            <p class="username">{{ item.username }}:</p>
                            <p class="content">{{ item.content }}</p>
                            <p class="time">{{ item.time }}</p>
                        </div>
                        <div class="btnbox">
                            <el-button
                                class="imgbtn"
                                size="small"
                                circle
                                @click="
                                    adminStore.deleteComment(item.commentID)
                                "
                                v-if="isAdmin()"
                                ><el-icon><CloseBold /></el-icon
                            ></el-button>
                        </div>
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
    import {
        Document,
        CloseBold,
        Download,
        Upload,
    } from "@element-plus/icons-vue";
    import { usePassageViewStore } from "@/stores/index";
    import { useAdminStore } from "@/stores/adminStore";
    import { uploadResources, adminUploadImg } from "@/http/api/admin";
    const route = useRoute();
    const router = useRouter();
    const passageViewStore = usePassageViewStore();
    const adminStore = useAdminStore();
    const pics = toRefs(passageViewStore).pics;
    const docs = toRefs(passageViewStore).docs;
    const isRevise = ref<boolean>(false);
    const titleipt = ref<string>(passageViewStore.passageItem.title);
    watch(
        () => passageViewStore.passageItem.title,
        (newVal) => {
            titleipt.value = newVal;
        }
    );
    const contentipt = ref<string>(passageViewStore.passageItem.content);
    watch(
        () => passageViewStore.passageItem.content,
        (newVal) => {
            contentipt.value = newVal;
        }
    );

    const revise = () => {
        isRevise.value = false;
        adminStore.updatePassage(
            contentipt.value,
            titleipt.value,
            +route.params.id
        );
    };

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
    const deletePassage = () => {
        ElMessageBox.confirm(
            "You will permanently delete the passage. Continue?",
            "Warning",
            {
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                type: "warning",
            }
        )
            .then(() => {
                adminStore.deletePassage(+route.params.id);
            })
            .catch(() => {
                ElMessage({
                    type: "info",
                    message: "Delete canceled",
                });
            });
    };
</script>

<style scoped src="@/assets/style/passageview.css"></style>
