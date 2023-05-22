<template>
    <el-row :gutter="0" style="width: 100%;" justify="center">
        <el-col :xs="20" :sm="20" class="container">
            <el-page-header class="page-header" @click="goBack">
            </el-page-header>
            <div class="passage">
                <p class="title">{{ passageItem.title }}</p>
                <p class="time">{{ passageItem.time }}</p>
                <p v-if="dataLoaded" class="content">
                    {{ passageItem.content }}
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
                        @click="comment"
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
                        v-if="commentLoaded"
                    >
                        <div class="circle"></div>
                        <p class="username">{{ item.username }}:</p>
                        <p class="content">{{ item.content }}</p>
                        <p class="time">{{ item.time }}</p>
                    </li>
                    <li v-else style="text-align: center;">Loading...</li>
                    <li
                        v-if="items.length === 0 && commentLoaded"
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
    import { passageResources } from "@/http/api/passage";
    import { createComment } from "../http/api/comment";
    import {
        queryCommentByPassageID,
        downResources,
    } from "../http/api/passage";

    const route = useRoute();
    const router = useRouter();

    let dataLoaded = ref(false);
    let commentLoaded = ref(false);

    let passageItem = reactive<Passage>({
        content: "",
        title: "",
        time: "",
        id: Number(""),
    });
    interface Passage {
        content: string;
        title: string;
        time: string;
        id: number;
    }

    const getPassage = async (): Promise<void> => {
        try {
            const { data } = await passageResources({
                passageID: Number(route.params.id),
            });
            passageItem = JSON.parse(data)[0];
            dataLoaded.value = true;
            document.title = passageItem.title;

            docs.value = JSON.parse(data)[1];
            docs.value.forEach((doc) => {
                const { address } = doc;
                let arr: string[] = address.split("/");
                doc.name = arr[arr.length - 1];
            });

            const indexsToDelete: number[] = [];
            pics.value = docs.value.reduce((acc: Resource[], doc, index) => {
                if (/\.(jpg|png|gif)$/.test(doc.address)) {
                    acc.push(doc);
                    indexsToDelete.push(index);
                }
                return acc;
            }, []);
            // 删除docs里的图片
            indexsToDelete.reverse().forEach((index) => {
                docs.value.splice(index, 1);
            });

            pics.value.forEach((pic) => {
                const { address } = pic;
                let arr: string[] = address.split("/");
                pic.name = arr[arr.length - 1];
            });
        } catch (error) {
            console.error(error);
        }
    };

    onMounted(() => {
        getPassage();
    });

    const goBack = () => {
        router.back();
    };

    // 直接cv有点冗杂
    let textarea = ref<string>("");
    let isDisabled = ref<boolean>(true);

    let items = ref<commentItem[]>([]);
    let pageCount = ref<number>();
    let currentPage = ref<number>(1);

    interface commentItem {
        commentID: number;
        content: string;
        fambulous: number;
        passageID: number;
        time: string;
        userID: number;
        username: string;
    }

    const getComments = async (): Promise<void> => {
        try {
            let { data } = await queryCommentByPassageID({
                pageNo: currentPage.value.toString(),
                pageSize: "4",
                passageID: Number(route.params.id),
            });
            data = JSON.parse(data);
            pageCount.value = parseInt(data[data.length - 1][3]);
            items = data.slice(0, data.length - 1);

            commentLoaded.value = true;
        } catch (error) {
            console.error(error);
        }
    };

    onMounted(() => {
        getComments();
    });

    watch(currentPage, (newVal) => {
        commentLoaded.value = false;
        getComments();
    });
    watch(textarea, (newVal) => {
        if (textarea.value != "") {
            isDisabled.value = false;
        } else {
            isDisabled.value = true;
        }
    });

    const comment = async (): Promise<void> => {
        try {
            const { data } = await createComment({
                content: textarea.value,
                passageID: Number(route.params.id),
                userID: Number(sessionStorage.getItem("userID")),
            });
            textarea.value = "";
            getComments();
        } catch (error) {
            console.error(error);
        }
    };

    // -----------------------

    let docs = ref<Resource[]>([]);
    let pics = ref<Resource[]>([]);

    type Resource = {
        id: number;
        passageID: number;
        address: string;
        name?: string;
    };

    // 下载

    const download = async (address: string): Promise<void> => {
        try {
            const { data } = await downResources({
                filePath: address,
            });
            const arr: string[] = address.split("/");
            let blob = new Blob([data]);
            let downloadElement = document.createElement("a");
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.setAttribute("download", arr[4]);
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
            ElMessage({
                message: "下载成功！",
                type: "success",
            });
        } catch (error) {
            console.error(error);
        }
    };
</script>
<style scoped src="@/assets/style/passageview.css"></style>
