import { defineStore } from "pinia";
import { queryNotice } from "@/http/api/notice";
import {
    adminUpdateNotice,
    adminQueryAllUser,
    adminQueryUserInfoByName,
} from "@/http/api/admin";

type Notice = {
    content: string;
    id: number;
};
type User = {
    userId: number;
    username: string;
    password: string;
};

export const useAdminStore = defineStore("adminStore", () => {
    const notices = ref<Notice[]>([]);
    const tableData = ref<User[]>([]);
    const userInfoPageCount = ref<number>();
    const queryUserData = ref<User>();

    async function getNotice(): Promise<void> {
        const { data } = await queryNotice();
        notices.value = JSON.parse(data);
    }
    async function updateNotice(content: string): Promise<void> {
        const { data } = await adminUpdateNotice({
            content,
        });
        await getNotice();
    }
    async function queryAllUser(
        pageNo: string,
        pageSize: string
    ): Promise<void> {
        const { data } = await adminQueryAllUser({ pageNo, pageSize });
        tableData.value = JSON.parse(data)[0];
        userInfoPageCount.value = Number(JSON.parse(data)[1][3]);
    }
    async function queryUserInfoByName(name: string): Promise<void> {
        const { data } = await adminQueryUserInfoByName({ name });
        queryUserData.value = data;
        if (!queryUserData.value) {
            ElMessage({
                type: 'error',
                message: 'User not found! Please try again'
            })
            return;
        }
        ElMessage({
            type: "success",
            message: "successfully queried user!",
        });
    }

    return {
        notices,
        getNotice,
        updateNotice,
        queryAllUser,
        tableData,
        userInfoPageCount,
        queryUserInfoByName,
        queryUserData,
    };
});
