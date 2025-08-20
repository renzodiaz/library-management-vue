import { defineStore } from "pinia";
import { dataFormatter } from "@/utils/jsona";
import { plainAxiosInstance, secureAxiosInstance } from "@/api/axios";
import { localStore, localDelete } from '@/utils/local_storage'


export const useUsersStore = defineStore("auth", {
    state: () => ({
        list: null,
        currentUser: {},
    }),

    actions: {
        async fetchUsers() {
            const response = await secureAxiosInstance.get("/users");

            const data = dataFormatter.deserialize(response.data);

            this.list = data.users;
        },
    },

    persist: true
});