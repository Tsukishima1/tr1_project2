<template>
    <div class="grid-content comment">
        <h3 class="header">Hall Comment 📑</h3>
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
            <el-button class="sendbtn" @click="comment" :disabled="isDisabled"
                >comment</el-button
            >
        </div>
        <el-divider />
        <ul class="list">
            <li class="item" v-for="(item, index) in items" :key="index">
                <div>
                    <p class="content">{{ item.content }}</p>
                    <p class="time">{{ item.time }}</p>
                </div>
                <el-button
                    class="imgbtn"
                    size="small"
                    circle
                    @click="deleteHallComment(item.id)"
                    v-if="isAdmin()"
                    ><el-icon><CloseBold /></el-icon
                ></el-button>
            </li>
        </ul>
        <el-pagination
            class="pagination"
            layout="prev, pager, next"
            :total="changePage.total"
            :page-size="5"
            v-model:current-page="currentPage"
        />
    </div>
</template>

<script setup lang="ts">
    import {
        queryAllHallComment,
        createHallComment,
    } from "@/http/api/hallcomment";
    import { CloseBold } from "@element-plus/icons-vue";
    let textarea = ref<string>("");
    import { adminDeleteHallComment } from "../http/api/admin";
    let isDisabled = ref<boolean>(true);

    const items = ref<hallCommentItem[]>([]);
    const changePage = reactive({
        currentPage: 1,
        total: Number(""),
    });
    let currentPage = ref<number>(1);

    interface hallCommentItem {
        content: string;
        id: number;
        time: string;
    }

    const showHallComments = async (): Promise<void> => {
        try {
            const { data } = await queryAllHallComment({
                pageNo: currentPage.value.toString(),
                pageSize: "5",
            });
            items.value = JSON.parse(data)[0];
            changePage.total = Number(JSON.parse(data)[2][4]) * 5;
        } catch (error) {
            console.error(error);
        }
    };
    const deleteHallComment = async (ID: number): Promise<void> => {
        try {
            const { data } = await adminDeleteHallComment({ ID });
            showHallComments();
            ElMessage({
                type: "success",
                message: data,
            });
        } catch (error) {
            console.error(error);
        }
    };

    onMounted(() => {
        showHallComments();
    });

    watch(currentPage, (newVal) => {
        showHallComments();
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
            const { data } = await createHallComment({
                content: textarea.value,
            });
            console.log(data);
            textarea.value = "";
            showHallComments();
        } catch (error) {
            console.error(error);
        }
    };
    const isAdmin = (): boolean => {
        if (sessionStorage.getItem("username") === "admin") {
            return true;
        } else return false;
    };
</script>

<style src="@/assets/style/hallcomment.css"></style>
