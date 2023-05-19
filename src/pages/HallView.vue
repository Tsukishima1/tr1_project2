<template>
    <el-row :gutter="20" style="width: 100%;" justify="center">
        <!-- <el-col :sm="5" :md="5" :lg="5" :xl="5"
            ><div class="grid-content ep-bg-purple leftnav hidden-xs-only">
                111
            </div>
        </el-col> -->
        <el-col :xs="23" :sm="22" :md="20" :lg="16" :xl="16"
            ><div class="grid-content main" style="padding: 20px;">
                <ul class="list">
                    <li
                        class="item"
                        v-for="(item, index) in items"
                        :key="index"
                        @click="openPassageView(item.id)"
                    >
                        <p class="title">{{ item.title }}</p>
                        <p class="time">{{ item.time }}</p>
                        <p class="content">{{ item.content }}</p>
                    </li>
                </ul>
                <el-pagination
                    class="pagination"
                    background
                    layout="prev, pager, next"
                    :total="changePage.total"
                    :page-size="5"
                    v-model:current-page="currentPage"
                />
            </div>
            <HallComment/>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
    import "element-plus/theme-chalk/display.css";
    import { queryAllPassage } from "@/http/api/passage";
    import { useRouter } from 'vue-router';
    const router = useRouter();
    let items = ref<PassageItem[]>([]);
    const changePage = reactive({
        currentPage: 1,
        total: Number(""),
    });
    let currentPage = ref<number>(1);
    // console.log(current.value);

    interface PassageItem {
        id: number;
        title: string;
        content: string;
        time: string;
    }
    const showPassages = async (): Promise<void> => {
        try {
            const { data } = await queryAllPassage({
                pageNo: currentPage.value.toString(),
                pageSize: "5",
            });
            changePage.total = data.passageItemCount;
            items.value = data.passageItem;
        } catch (error) {
            console.error(error);
        }
    };

    onMounted(() => {
        showPassages();
    });

    watch(currentPage, (newVal) => {
        showPassages();
    });

    const openPassageView = (id:number)=> {
        router.push(`/passage/${id}`);
    }
</script>

<style lang="css" scoped src="@/assets/style/hallpassage.css"></style>
