import { defineStore } from "pinia";

export const useCounterStore = defineStore('count', {
    state: ()=> ({
        count: 0
    }),
    getters: {
        // countmore: (state) => state.count+5
        countmore(state) {
            return state.count+5;
        }
    },
    actions: {
        increment() {
            this.count++;
        },
        reset() {
            this.$reset();
        },
        decrement() {
            this.count--;
        }
    }
})

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