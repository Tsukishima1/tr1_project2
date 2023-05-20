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
                    <li v-else>Loading...</li>
                </ul>
                <el-pagination
                    class="pagination"
                    layout="prev, pager, next"
                    :page-count="pageCount"
                    :page-size="4"
                    v-model:current-page="currentPage"
                    hide-on-single-page
                />
            </div>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
    import { passageResources } from "@/http/api/passage";
    import { createComment } from "../http/api/comment";
    import { queryCommentByPassageID } from "../http/api/passage";

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
            console.log("将请求获取第"+currentPage.value+"页的评论内容");
            let { data } = await queryCommentByPassageID({
                pageNo: currentPage.value.toString(),
                pageSize: "4",
                passageID: Number(route.params.id),
            });
            data = JSON.parse(data);
            pageCount.value = Number(data[data.length - 1][3]);
            items = data.slice(0, data.length - 1);
            console.log("请求回的内容为：",items);
            
            commentLoaded.value = true;
        } catch (error) {
            console.error(error);
        }
    };

    onMounted(() => {
        getComments();
    });

    watch(currentPage, (newVal) => {
        commentLoaded.value=false;
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
            console.log("successful!");
        } catch (error) {
            console.error(error);
        }
    };
</script>
<style scoped src="@/assets/style/passageview.css"></style>
