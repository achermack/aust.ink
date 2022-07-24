import { defineStore } from "pinia";
export const useToastStore = defineStore({
    id: 'toast',
    state: () => {
        return {
            messages: [],
            show: false,
        }
    }, 
    actions: {
        showToast(payload) {
            // this.message = payload.msg;
            this.messages.push({msg: payload.msg, type: payload.type, show: true});
            // this.type = payload.type;
            // this.show = true;
        },

        removeMessage(message) {
            this.messages.splice(this.messages.indexOf(x => x.msg === message), 1);
        },

        hideMessage(message) {
            const msg = this.messages.find(x => x.msg === message)
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