import { defineStore, getActivePinia } from "pinia";
import { dataFormatter } from "@/utils/jsona";
import { plainAxiosInstance, secureAxiosInstance } from "@/api/axios";
import { localStore, localDelete } from '@/utils/local_storage'


export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: null,
    }),

    actions: {
        async login(credentials) {
            const response = await plainAxiosInstance.post("/access_tokens", credentials);
            const data = dataFormatter.deserialize(response.data);

            this.token = data.token;
            this.user = data.user;

            localStore('token', data.token);
            localStore('user_id', data.user.id);
        },

        async logout() {
            await secureAxiosInstance.delete("/access_tokens");
            window.localStorage.clear();
        },
    },

    persist: true
});