import { defineStore } from "pinia";
import { queryNotice } from "@/http/api/notice";
import { adminUpdateNotice } from '@/http/api/admin';

type Notice = {
    content: string
    id: number
}

export const useAdminStore = defineStore("adminStore",()=>{
    const notices = ref<Notice[]>([]);

    async function getNotice(): Promise<void> {
        const { data } = await queryNotice();
        notices.value=JSON.parse(data);
    }
    async function updateNotice(content:string): Promise<void> {
        const { data } = await adminUpdateNotice({
            content,
        });
        await getNotice();
    }

    return {
        notices, getNotice, updateNotice
    }
})