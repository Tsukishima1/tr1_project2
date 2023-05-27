<template>
    <div class="passage-container">
        <div class="popular">
            <h3 style="font-size: 1.5rem; padding-bottom: 0.5rem;">Popular Articles: </h3>
            <ul>
                <li v-for="(item, index) in adminStore.popPassages" :key="index" @click="toPassageView(item.id)">
                    <p class="title">{{ item.title }}</p>
                    <p class="content">{{ item.content }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
    
<script setup lang='ts'>
    import { useAdminStore } from '@/stores/adminStore';
    const adminStore = useAdminStore();
    const router = useRouter();
    onMounted(() => {
        adminStore.queryPassageByCommentCount();
    })
    const toPassageView = (id:number) => {
        router.push(`/home/passage/${id}`);
    }
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
</style>