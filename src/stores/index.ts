import { defineStore } from "pinia";

export const useStoreToken = defineStore('storeToken', {
    state: ()=> ({
        token: sessionStorage.getItem('token')||'',
    }),
    getters: {

    },
    actions: {
        setToken(newToken:string):void {
            this.token = newToken;
            sessionStorage.setItem('token', newToken);
        },
        getToken() {
            return this.token;
        }
    }
})