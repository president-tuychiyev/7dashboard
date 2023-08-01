import { defineStore } from 'pinia'

export const useSpinStore = defineStore('spin', {
    state: () => ({
        spin: false
    }),
    actions: {
        setSpinVal(value) {
            this.spin = value
        }
    }
})
