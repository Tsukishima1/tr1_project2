<template>
    <div class="passage-container">
        <div class="create">
            <h3 style="font-size: 1.5rem; padding-bottom: 0.5rem;">
                Create New Passage!
            </h3>
            Title:<el-input placeholder="Please input the title" v-model="ipttitle" style="margin-bottom: 1rem;"></el-input>
            Content:<el-input
                class="textarea"
                v-model="iptcontent"
                rows="5"
                type="textarea"
                placeholder="Please input your content"
                style="margin-bottom: 1rem;"
            />
            <el-button @click="create" type="success" style="margin-bottom: 1rem;" :disabled="isDisabled">CREATE!</el-button>
        </div>
        <div class="popular">
            <h3 style="font-size: 1.5rem; padding-bottom: 0.5rem;">
                Popular Articles:
            </h3>
            <ul>
                <li
                    v-for="(item, index) in adminStore.popPassages"
                    :key="index"
                    @click="toPassageView(item.id)"
                >
                    <p class="title">{{ item.title }}</p>
                    <p class="content">{{ item.content }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useAdminStore } from "@/stores/adminStore";
    const adminStore = useAdminStore();
    const router = useRouter();
    let ipttitle = ref<string>("");
    let iptcontent = ref<string>("");
    const isDisabled = ref<boolean>(true);
    onMounted(() => {
        adminStore.queryPassageByCommentCount();
    });
    const toPassageView = (id: number) => {
        router.push(`/home/passage/${id}`);
    };
    const create = ()=> {
        adminStore.createPassage(iptcontent.value,ipttitle.value);
        iptcontent.value="", ipttitle.value="";
    }
    watch(iptcontent, (newVal) => {
        if (iptcontent.value !== "" && ipttitle.value !== "") {
            isDisabled.value = false;
        } else {
            isDisabled.value = true;
        }
    });
    watch(ipttitle, (newVal) => {
        if (iptcontent.value !== "" && ipttitle.value !== "") {
            isDisabled.value = false;
        } else {
            isDisabled.value = true;
        }
    });
</script>

<style lang="less">
    .popular {
        ul {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            width: 100%;
            li {
                cursor: pointer;
                overflow: hidden;
                background-color: rgb(230, 236, 224);
                padding: 0.8rem;
                border-radius: 0.5rem;
                transition: 0.25s linear;
                flex-grow: 1;
                box-shadow: 0 0 0.2rem 0 rgb(182, 206, 174);
                .title {
                    font-size: 1.5rem;
                    font-weight: bold;
                }
                .content {
                    font-size: 0.6rem;
                    max-height: 3.3rem;
                    overflow: hidden;
                    color: grey;
                }
                &:hover {
                    background-color: rgb(213, 227, 213);
                }
            }
        }
    }
    .create {
        display: flex;
        flex-direction: column;
    }
</style>
