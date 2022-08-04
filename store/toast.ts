import { defineStore } from "pinia";

export interface ToastPayload {
    message: string;
    type: string;
    timeout: number;
}

export const useToastStore = defineStore({
    id: 'toast',
    state: () => {
        return {
            messages: [] as ToastPayload[],
            show: false,
        }
    }, 
    actions: {
        showToast(payload: ToastPayload) {
            this.messages.push({message: payload.message, type: payload.type, timeout: payload.timeout, show: true});
        },

        removeMessage(message: ToastPayload) {
            this.messages.splice(this.messages.indexOf(x => x.message === message), 1);
        },

        hideMessage(message: ToastPayload) {
            const msg = this.messages.find(x => x.message === message)
            if (msg) {
                msg.show = false;
            }
        }

    },
    getters: {
        getMessages: (state) => {
            return state.messages
        }
    }
})