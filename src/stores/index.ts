import { defineStore } from "pinia";
import { createComment } from "@/http/api/comment";
import {
    downResources,
    passageResources,
    queryCommentByPassageID,
} from "@/http/api/passage";
import { queryAllHallComment } from "@/http/api/hallcomment";

export const useStoreToken = defineStore("storeToken", {
    state: () => ({
        token: sessionStorage.getItem("token") || "",
    }),
    getters: {},
    actions: {
        setToken(newToken: string): void {
            this.token = newToken;
            sessionStorage.setItem("token", newToken);
        },
        getToken() {
            return this.token;
        },
    },
});

export interface Passage {
    content: string;
    title: string;
    time: string;
    id: number;
}
export interface commentItem {
    commentID: number;
    content: string;
    fambulous: number;
    passageID: number;
    time: string;
    userID: number;
    username: string;
}
export type Resource = {
    id: number;
    passageID: number;
    address: string;
    name?: string;
};
export interface Pic {
    address: string;
    id: number;
}

export const usePassageViewStore = defineStore("passageView", () => {
    const passageItem = ref<Passage>({
        content: "",
        title: "",
        time: "",
        id: Number(""),
    });
    let dataLoaded = ref(false);
    const docs = ref<Resource[]>([]);
    const pics = ref<Pic[]>([]);
    let currentPage = ref<number>(1);
    let items = ref<commentItem[]>([]);
    let pageCount = ref<number>();
    let commentLoaded = ref(false);
    const textarea = ref<string>("");

    async function getPassage(id: any): Promise<void> {
        const { data } = await passageResources({
            passageID: Number(id),
        });
        passageItem.value = JSON.parse(data)[0];
        dataLoaded.value = true;
        document.title = passageItem.value.title;
        docs.value = JSON.parse(data)[1];
        docs.value.forEach((doc) => {
            const { address } = doc;
            let arr: string[] = address.split("/");
            doc.name = arr[arr.length - 1];
        });

        const dataObj = JSON.parse(data)[2];
        for (const key in dataObj) {
            if (Object.hasOwnProperty.call(dataObj, key)) {
                const matchResult = key.match(/^imgID:(\d+)$/);
                if (matchResult) {
                    const id = Number(matchResult[1]);
                    const address = dataObj[key];
                    const isExist = pics.value.some((item) => item.id === id);
                    if (!isExist) {
                        pics.value.push({ id, address });
                    }
                }
            }
        }
    }

    async function getComments(id: any): Promise<void> {
        let { data } = await queryCommentByPassageID({
            pageNo: currentPage.value.toString(),
            pageSize: "4",
            passageID: Number(id),
        });
        data = JSON.parse(data);
        pageCount.value = parseInt(data[data.length - 1][3]);
        items.value = data.slice(0, data.length - 1);
        commentLoaded.value = true;
    }

    async function comment(id: any): Promise<void> {
        const { data } = await createComment({
            content: textarea.value,
            passageID: Number(id),
            userID: Number(sessionStorage.getItem("userID")),
        });
        textarea.value = "";
        getComments(id);
    }

    async function download(address: string): Promise<void> {
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
            message: "successfully downloaded!",
            type: "success",
        });
    }

    return {
        getPassage,
        passageItem,
        dataLoaded,
        docs,
        pics,
        getComments,
        currentPage,
        items,
        commentLoaded,
        pageCount,
        comment,
        textarea,
        download,
    };
});
