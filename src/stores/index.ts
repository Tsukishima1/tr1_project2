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